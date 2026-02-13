const response = await fetch('https://cloud.blackbox.ai/api/tasks', {
  method: 'POST',
  headers: {
    'Authorization': 'sk-oH41AwIJ4Dknnzq7SJn5fQ',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    prompt: 'Add Stripe Payment Integration',
    repoUrl: 'https://github.com/mahiskmanager/Akinaator2.0.git', // SET YOUR REPO
    selectedAgent: 'gemini', 
    selectedModel: 'gemini-2.5-pro' 
  })
});
const data = await response.json();
