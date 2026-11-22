const menu=document.querySelector('.menu-button');
const nav=document.querySelector('#mobile-nav');
menu?.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Close menu':'Open menu');nav.hidden=!open;});
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&menu&&nav){menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Open menu');nav.hidden=true;}});
document.querySelector('#doc-search')?.addEventListener('input',event=>{const search=event.target.value.trim().toLocaleLowerCase('en');let found=0;document.querySelectorAll('.docs-nav a').forEach(link=>{const visible=link.textContent.toLocaleLowerCase('en').includes(search);link.hidden=!visible;if(visible)found++;});document.querySelector('.search-empty').hidden=found>0;});
document.querySelectorAll('pre').forEach(pre=>{const button=document.createElement('button');button.className='copy-button';button.type='button';button.textContent='Copy';button.setAttribute('aria-label','Copy code block');button.addEventListener('click',async()=>{try{await navigator.clipboard.writeText(pre.querySelector('code')?.textContent??'');button.textContent='Copied';setTimeout(()=>button.textContent='Copy',1800)}catch{button.textContent='Select the text'}});pre.append(button);});

// Pointer-driven card tilt. One animation frame per hovered card; touch stays still.
const motionPreference=matchMedia('(prefers-reduced-motion: reduce)');
const precisePointer=matchMedia('(hover: hover) and (pointer: fine)');
const animatedCards=[...document.querySelectorAll('.nx-client-window, .nx-mod, .download-main, .doc-links a')];
const resetCards=[];
for(const card of animatedCards){
  card.classList.add('motion-card');
  let bounds=null,frame=0,point=null;
  const reset=()=>{cancelAnimationFrame(frame);frame=0;point=null;bounds=null;card.classList.remove('motion-active');for(const name of ['--tilt-x','--tilt-y','--spot-x','--spot-y'])card.style.removeProperty(name);};
  resetCards.push(reset);
  card.addEventListener('pointerenter',event=>{if(event.pointerType==='touch'||motionPreference.matches||!precisePointer.matches)return;bounds=card.getBoundingClientRect();});
  card.addEventListener('pointermove',event=>{
    if(!bounds||motionPreference.matches||!precisePointer.matches)return;
    point={x:Math.max(0,Math.min(1,(event.clientX-bounds.left)/bounds.width)),y:Math.max(0,Math.min(1,(event.clientY-bounds.top)/bounds.height))};
    if(frame)return;
    frame=requestAnimationFrame(()=>{frame=0;if(!point)return;card.classList.add('motion-active');card.style.setProperty('--tilt-x',`${((.5-point.y)*9).toFixed(2)}deg`);card.style.setProperty('--tilt-y',`${((point.x-.5)*11).toFixed(2)}deg`);card.style.setProperty('--spot-x',`${(point.x*100).toFixed(1)}%`);card.style.setProperty('--spot-y',`${(point.y*100).toFixed(1)}%`);});
  });
  card.addEventListener('pointerleave',reset);card.addEventListener('pointercancel',reset);card.addEventListener('blur',reset);
}
for(const preference of [motionPreference,precisePointer])preference.addEventListener('change',()=>resetCards.forEach(reset=>reset()));
window.addEventListener('blur',()=>resetCards.forEach(reset=>reset()));
