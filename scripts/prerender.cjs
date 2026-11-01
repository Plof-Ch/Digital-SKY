/* Pre-render HTML content for accessibility and SEO, retaining JS interactions. */
const fs=require('fs'),vm=require('vm'),path=require('path');
const root=path.resolve(__dirname,'..');
const pages=['home','platform','how-it-works','technology','audiences','security','research','roadmap','about','contacts'];
const data=fs.readFileSync(path.join(root,'assets/site-data.js'),'utf8');
const code=fs.readFileSync(path.join(root,'assets/site.js'),'utf8');
for(const id of pages){
 const dir=id==='home'?root:path.join(root,id);
 const file=path.join(dir,'index.html');
 const app={innerHTML:''};
 const win={DS_PAGE:id,DS_BASE:id==='home'?'./':'../'};
 const document={getElementById:k=>k==='app'?app:null,querySelectorAll:()=>[]};
 const context=vm.createContext({window:win,document,console,Intl});
 vm.runInContext(data,context,{filename:'site-data.js'});
 vm.runInContext(code,context,{filename:'site.js'});
 let html=fs.readFileSync(file,'utf8');
 const replace=/<div id="app">[\s\S]*<\/div>\s*<\/body>/;
 if(!replace.test(html))throw new Error(`Cannot find app root in ${file}`);
 html=html.replace(replace,`<div id="app">\n${app.innerHTML}\n</div>\n</body>`);
 fs.writeFileSync(file,html);
 console.log(id,'prerendered',app.innerHTML.length);
}
