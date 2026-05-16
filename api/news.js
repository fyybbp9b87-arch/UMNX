export default async function handler(req,res){

try{

const category=req.query.category || "general";

const r=await fetch(
`https://newsapi.org/v2/top-headlines?country=us&category=${category}&pageSize=5&apiKey=${process.env.NEWS_API_KEY}`
);

const data=await r.json();

return res.status(200).json(data);

}catch(err){

return res.status(500).json({
error:err.message
});

}

}
