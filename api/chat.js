export default async function handler(req,res){

if(req.method!=="POST"){

return res.status(405).json({
reply:"POST only"
});

}

try{

const { messages } = req.body;

const response = await fetch(
"https://api.groq.com/openai/v1/chat/completions",
{
method:"POST",
headers:{
"Content-Type":"application/json",
"Authorization":"Bearer "+process.env.GROQ_API_KEY
},
body:JSON.stringify({
model:"llama-3.1-8b-instant",
messages:[
{
role:"system",
content:
"You are UMN CORE, a futuristic AI assistant. You help with coding, HTML, CSS, JavaScript, news discussion, weather, and conversation. Format code using markdown code blocks."
},
...messages
]
})
}
);

const data=await response.json();

return res.status(200).json({
reply:
data.choices?.[0]?.message?.content
|| "No response"
});

}catch(err){

return res.status(500).json({
reply:"Server error: "+err.message
});

}

}
