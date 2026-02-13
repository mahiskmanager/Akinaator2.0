export default async function handler(req,res){
  if(req.method!=='POST') return res.status(405).json({error:'Method not allowed'});
  if(!process.env.OPENAI_API_KEY) return res.status(500).json({error:'API key not configured'});

  try{
    const {message}=req.body;
    if(!message) return res.status(400).json({error:'Message is required'});

    const response=await fetch('https://api.openai.com/v1/responses',{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
        'Authorization':`Bearer ${process.env.OPENAI_API_KEY}`
      },
      body:JSON.stringify({model:'gemini-2.5-pro',input:message})
    });

    const data=await response.json();
    if(!response.ok) return res.status(response.status).json({error:data});

    // Función recursiva para extraer todo el texto
    function extractText(obj){
      if(!obj) return '';
      if(typeof obj==='string') return obj;
      if(Array.isArray(obj)) return obj.map(extractText).join(' ');
      if(typeof obj==='object') return Object.values(obj).map(extractText).join(' ');
      return '';
    }

    const replyText=extractText(data)||'Sin respuesta';
    return res.status(200).json({reply:replyText});

  }catch(error){
    return res.status(500).json({error:error.message});
  }
}
