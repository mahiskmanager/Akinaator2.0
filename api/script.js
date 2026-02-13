
async function sendMessage(){
  const input=document.getElementById('userInput');
  const messagesDiv=document.getElementById('messages');
  const mascota=document.getElementById('mascota');
  const text=input.value.trim();
  if(!text) return;
  const userMsgDiv=document.createElement('div');
  userMsgDiv.classList.add('message','userMessage');
  userMsgDiv.innerText=text;
  messagesDiv.appendChild(userMsgDiv);
  input.value='';
  messagesDiv.scrollTop=messagesDiv.scrollHeight;

  // Animación mascota
  mascota.style.transform='scale(1.2)';
  setTimeout(()=>{mascota.style.transform='scale(1)';},500);

  try{
    const res=await fetch('/api/chat',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({message:text})
    });
    const data=await res.json();
    let reply='';
    if(data.reply) reply=data.reply;
    else if(data.output_text) reply=data.output_text;
    else if(data.output?.[0]?.content?.[0]?.text) reply=data.output[0].content[0].text;
    else reply=JSON.stringify(data);

    const botMsgDiv=document.createElement('div');
    botMsgDiv.classList.add('message','botMessage');
    botMsgDiv.innerText=reply;
    messagesDiv.appendChild(botMsgDiv);
    messagesDiv.scrollTop=messagesDiv.scrollHeight;

  }catch(err){
    const errDiv=document.createElement('div');
    errDiv.classList.add('message','botMessage');
    errDiv.innerText="Error conectando con el servidor";
    messagesDiv.appendChild(errDiv);
    messagesDiv.scrollTop=messagesDiv.scrollHeight;
  }
}
