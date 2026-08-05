// Populate games grid from games.json
async function loadGames(){
  try{
    const res = await fetch('games.json');
    const games = await res.json();
    const grid = document.getElementById('gamesGrid');
    games.forEach(g=>{
      const card = document.createElement('div');
      card.className = 'game-card';
      card.innerHTML = `
        <div class="game-thumb" style="background:linear-gradient(90deg, rgba(124,77,255,0.12), rgba(55,162,255,0.08));display:flex;align-items:center;justify-content:center;color:rgba(255,255,255,0.9);">${g.title}</div>
        <div class="game-title">${g.title}</div>
        <div class="game-genre">${g.genre}</div>
      `;
      grid.appendChild(card);
    });
  }catch(e){console.error(e)}
}

// Subtle animated background: slow floating shapes (DOM-based) for calm motion
function startParticles(){
  const container = document.getElementById('subtle-bg');
  if(!container) return;
  // create a small number of soft circles
  const count = 8;
  for(let i=0;i<count;i++){
    const el = document.createElement('div');
    el.style.position='absolute';
    el.style.borderRadius='50%';
    el.style.pointerEvents='none';
    el.style.width=(120 + Math.random()*260)+'px';
    el.style.height=el.style.width;
    el.style.left=(Math.random()*100)+'%';
    el.style.top=(Math.random()*100)+'%';
    el.style.background=`radial-gradient(circle at 30% 30%, rgba(16,24,32,0.06), rgba(16,24,32,0.02))`;
    el.style.transform=`translate(-50%,-50%)`;
    el.style.opacity='0.6';
    el.style.transition='transform 18s linear, opacity 8s ease-in-out';
    container.appendChild(el);
    // animate position slowly
    (function loop(node){
      const nx = (Math.random()*110)-5;
      const ny = (Math.random()*110)-5;
      node.style.left = nx + '%';
      node.style.top = ny + '%';
      node.style.opacity = (0.35 + Math.random()*0.5).toString();
      setTimeout(()=>loop(node), 8000 + Math.random()*9000);
    })(el);
  }
}

document.addEventListener('DOMContentLoaded',()=>{loadGames();startParticles();});
