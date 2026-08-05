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

// Simple particle background
function startParticles(){
  const canvas = document.getElementById('particle-bg');
  const ctx = canvas.getContext('2d');
  let w=canvas.width=window.innerWidth; let h=canvas.height=window.innerHeight;
  const particles=[];
  for(let i=0;i<120;i++) particles.push({x:Math.random()*w,y:Math.random()*h,r:Math.random()*1.8+0.6,dx:(Math.random()-0.5)*0.4,dy:(Math.random()-0.5)*0.4});
  function frame(){
    ctx.clearRect(0,0,w,h);
    particles.forEach(p=>{
      p.x+=p.dx; p.y+=p.dy;
      if(p.x<0||p.x>w) p.dx*=-1;
      if(p.y<0||p.y>h) p.dy*=-1;
      ctx.beginPath(); ctx.fillStyle='rgba(255,255,255,0.06)'; ctx.arc(p.x,p.y,p.r,0,Math.PI*2); ctx.fill();
    });
    requestAnimationFrame(frame);
  }
  frame();
  window.addEventListener('resize',()=>{w=canvas.width=window.innerWidth;h=canvas.height=window.innerHeight});
}

document.addEventListener('DOMContentLoaded',()=>{loadGames();startParticles();});
