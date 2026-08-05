// Populate games grid from games.json
async function loadGames(){
  try{
    const res = await fetch('games.json');
    const games = await res.json();
    const grid = document.getElementById('gamesGrid');
    games.forEach(g=>{
      const card = document.createElement('div');
      card.className = 'game-card';

      const thumbWrap = document.createElement('div');
      thumbWrap.className = 'game-thumb-wrap';
      const thumb = document.createElement('img');
      thumb.className = 'game-thumb';
      thumb.src = g.thumbnail;
      thumb.alt = g.title + ' thumbnail';
      thumb.loading = 'lazy';
      thumbWrap.appendChild(thumb);

      const overlay = document.createElement('div');
      overlay.className = 'play-overlay';
      const icon = document.createElement('div'); icon.className = 'play-icon';
      overlay.appendChild(icon);
      thumbWrap.appendChild(overlay);

      card.appendChild(thumbWrap);
      const title = document.createElement('div'); title.className = 'game-title'; title.textContent = g.title;
      const genre = document.createElement('div'); genre.className = 'game-genre'; genre.textContent = g.genre;
      card.appendChild(title); card.appendChild(genre);

      card.addEventListener('click',()=>openGame(g.path));
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

// Game modal controls
function openGame(path){
  const modal = document.getElementById('gameModal');
  const frame = document.getElementById('gameFrame');
  frame.src = path;
  modal.setAttribute('aria-hidden','false');
}
function closeGame(){
  const modal = document.getElementById('gameModal');
  const frame = document.getElementById('gameFrame');
  frame.src = '';
  modal.setAttribute('aria-hidden','true');
}

document.addEventListener('click', (e)=>{
  const modal = document.getElementById('gameModal');
  if(!modal) return;
  const closeBtn = document.getElementById('modalClose');
  if(e.target === closeBtn) closeGame();
  if(e.target === modal) closeGame();
});

// Community feed
async function loadCommunity(){
  try{
    const res = await fetch('community.json');
    const posts = await res.json();
    const feed = document.getElementById('communityFeed');
    posts.forEach(p=>{
      const card = document.createElement('div'); card.className='post-card';
      card.innerHTML = `<h3 class="post-title">${p.title}</h3><div class="post-meta">${p.author} · ${p.date}</div><div class="post-excerpt">${p.excerpt}</div>`;
      feed.appendChild(card);
    });
  }catch(e){console.error('community load',e)}
}

document.addEventListener('DOMContentLoaded',()=>{loadCommunity()});
