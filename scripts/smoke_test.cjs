// Lightweight test without browser dependencies; runs page renderers against a stub DOM.
const fs=require('fs'),vm=require('vm'),path=require('path');
const root=path.resolve(__dirname,'..');
const data=fs.readFileSync(path.join(root,'assets/site-data.js'),'utf8');
const code=fs.readFileSync(path.join(root,'assets/site.js'),'utf8');
const ids=['home','platform','how-it-works','technology','audiences','security','research','roadmap','about','contacts'];
let bad=0;
for(const id of ids){
  const app={innerHTML:''};
  const window={DS_PAGE:id,DS_BASE:id==='home'?'./':'../'};
  const document={getElementById:(k)=> k==='app'?app:null, querySelectorAll:()=>[]};
  const ctx=vm.createContext({window,document, console,Intl});
  try{vm.runInContext(data,ctx,{filename:'site-data.js'});vm.runInContext(code,ctx,{filename:'site.js'});
    const html=app.innerHTML;
    const h1=(html.match(/<h1[^>]*>/g)||[]).length;
    const secs=(html.match(/<section/g)||[]).length;
    const nav=(html.match(/class="nav-links"/g)||[]).length;
    const missing=h1!==1||secs<4||nav!==1||html.length<5000;
    if(missing)bad++;
    console.log(`${missing?'FAIL':'OK  '} ${id.padEnd(13)} HTML ${String(html.length).padStart(6)}  h1:${h1}  sections:${secs}`);
    fs.mkdirSync(path.join(root,'_qa'),{recursive:true});
    fs.writeFileSync(path.join(root,'_qa',`${id}.rendered.html`),html);
  }catch(e){bad++;console.error('ERROR',id,e.stack);}
}
if(bad){console.log(`FAILURES: ${bad}`);process.exit(1)}
console.log('All page renders passed.');
