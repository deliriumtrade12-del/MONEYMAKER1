const MODEL = "@cf/meta/llama-3.2-3b-instruct";
const SUB_WORKERS = [
  "aura-memory","aura-knowledge","aura-codegen","aura-github","aura-cloudflare","aura-analyzer","aura-planner","aura-reflector","aura-evolver","aura-sentinel","aura-optimizer","aura-architect","aura-tester","aura-deployer","aura-logger","aura-orchestrator","aura-ux","aura-seo","aura-sales","aura-copywriter","aura-legal","aura-finance","aura-monitor","aura-security","aura-support","aura-analytics","aura-data","aura-vision","aura-voice","aura-content","aura-product","aura-ops","aura-lifecycle","aura-saas","aura-automation","aura-ml","aura-aiops","aura-infrastructure","aura-reliability","aura-performance","aura-qa","aura-documentation","aura-customer-success","aura-pr"
];

const WORKER_ROLES = [
  { id: "w01", name: "aura-orchestrator", role: "Koordinuje celý systém, rozhoduje o priorite a distribúcii úloh medzi robotov.", tags: ["system","planning","coordination","routing"] },
  { id: "w02", name: "aura-planner", role: "Vytvára stratégie, plány krokov a rozdelenie práce do realistických fáz.", tags: ["planning","strategy","execution"] },
  { id: "w03", name: "aura-analyst", role: "Analyzuje kontext, problémy, údaje a identifikuje hlavné príčiny a riziká.", tags: ["analysis","diagnostics","research"] },
  { id: "w04", name: "aura-researcher", role: "Vyhľadáva relevantné informácie, faktické poznatky a relevantné vzory.", tags: ["research","facts","investigation"] },
  { id: "w05", name: "aura-memory", role: "Udržuje kontext z minulých interakcií, učenia a skúseností.", tags: ["memory","context","history"] },
  { id: "w06", name: "aura-knowledge", role: "Spravuje doménové znalosti, zhrnutia a dôležité poznatky.", tags: ["knowledge","wiki","learning"] },
  { id: "w07", name: "aura-codegen", role: "Generuje kód, komponenty, skripty a vzory podľa zadania.", tags: ["code","coding","development"] },
  { id: "w08", name: "aura-github", role: "Pracuje s GitHub repozitármi, PR, commitmi, issues a repozitárnou logikou.", tags: ["github","versioning","repo"] },
  { id: "w09", name: "aura-cloudflare", role: "Spravuje Cloudflare Workers, KV, D1, R2, zóny a infraštruktúru.", tags: ["cloudflare","workers","infra"] },
  { id: "w10", name: "aura-security", role: "Hľadá bezpečnostné zraniteľnosti, autentifikáciu, autorizáciu a bezpečnostné odporúčania.", tags: ["security","auth","risk"] },
  { id: "w11", name: "aura-tester", role: "Testuje funkcie, validuje logiku a navrhuje testy a QA scenáre.", tags: ["testing","qa","validation"] },
  { id: "w12", name: "aura-devops", role: "Zabezpečuje deployment, operácie, CI/CD, infraštruktúru a stabilitu prostredia.", tags: ["devops","deploy","ci"] },
  { id: "w13", name: "aura-architect", role: "Navrhuje systémovú architektúru, moduly, zložky a škálovateľnosť.", tags: ["architecture","design","system"] },
  { id: "w14", name: "aura-ux", role: "Optimalizuje používateľské rozhranie, UX flow, navigáciu a interakcie.", tags: ["ux","ui","usability"] },
  { id: "w15", name: "aura-seo", role: "Zlepšuje vyhľadávateľnosť, metadata, mapy stránok a organický rast.", tags: ["seo","traffic","ranking"] },
  { id: "w16", name: "aura-marketer", role: "Navrhuje marketingové kampane, growth stratégie a prístup k zákazníkom.", tags: ["marketing","growth","campaigns"] },
  { id: "w17", name: "aura-sales", role: "Rozvíja predajnú stratégiu, lead flow a konverzné procesy.", tags: ["sales","lead","conversion"] },
  { id: "w18", name: "aura-crm", role: "Spravuje zákaznícky pohyb, nábor, onboarding a životný cyklus klienta.", tags: ["crm","customers","retention"] },
  { id: "w19", name: "aura-copywriter", role: "Píše texty, copy, landing pages, e-maily, popisy a posolstvá pre publikum.", tags: ["copy","writing","content"] },
  { id: "w20", name: "aura-legal", role: "Vyhodnocuje compliance, zmluvné aspekty, povolenia a právne obmedzenia.", tags: ["legal","compliance","policy"] },
  { id: "w21", name: "aura-finance", role: "Analyzuje náklady, ROI, monetizáciu, ceny, ziskovosť a fiskálne modely.", tags: ["finance","roi","pricing"] },
  { id: "w22", name: "aura-monitor", role: "Sleduje zdravie systému, výkonnosť, chyby a signalizáciu incidentov.", tags: ["monitoring","health","alerts"] },
  { id: "w23", name: "aura-optimizer", role: "Hľadá optimalizácie výkonu, nákladov a procesov.", tags: ["optimization","efficiency","tuning"] },
  { id: "w24", name: "aura-logger", role: "Zapisuje činnosti, rozhodnutia a operácie do evidencie pre spätnú analýzu.", tags: ["logging","audit","history"] },
  { id: "w25", name: "aura-sentinel", role: "Stráži systém pred chybami, anomáliami, bezpečnostnými incidentmi a nečakanými zmenami.", tags: ["sentinel","watchdog","alerts"] },
  { id: "w26", name: "aura-pr", role: "Spravuje komunikáciu, nástroje, prezentácie a publikum projektu.", tags: ["pr","communication","brand"] },
  { id: "w27", name: "aura-customer-success", role: "Zabezpečuje úspech zákazníka, onboarding, adopciu a udržanie hodnoty.", tags: ["support","success","onboarding"] },
  { id: "w28", name: "aura-support", role: "Odpovedá na otázky, rieši problémy a pomáha ľuďom s produktom.", tags: ["support","helpdesk","answers"] },
  { id: "w29", name: "aura-analytics", role: "Meriava kľúčové metriky, vzory a výkonnostné ukazovatele.", tags: ["analytics","metrics","reporting"] },
  { id: "w30", name: "aura-data", role: "Spracováva dáta, agregácie, štatistiky, reporting a údaje pre rozhodovanie.", tags: ["data","reporting","stats"] },
  { id: "w31", name: "aura-vision", role: "Vyhodnocuje videnie projektu, brand, smerovanie a dlhodobú víziu.", tags: ["vision","strategy","direction"] },
  { id: "w32", name: "aura-voice", role: "Opravuje tón, komunikáciu, hlas a prirodzený jazyk medzi systémom a používateľom.", tags: ["voice","tone","communication"] },
  { id: "w33", name: "aura-content", role: "Vytvára obsah, články, výukové materiály, kampane a publikačné prvky.", tags: ["content","education","publishing"] },
  { id: "w34", name: "aura-product", role: "Spravuje product strategy, roadmap, prioritizáciu a hodnotu pre používateľa.", tags: ["product","roadmap","value"] },
  { id: "w35", name: "aura-ops", role: "Zabezpečuje každodenné operácie, workflow, koordináciu tímu a procesy.", tags: ["operations","workflow","process"] },
  { id: "w36", name: "aura-lifecycle", role: "Riadi životný cyklus produktu a zákazníka od objavenia po expanziu.", tags: ["lifecycle","customer","journey"] },
  { id: "w37", name: "aura-saas", role: "Optimalizuje SaaS model, predaj, zadržanie, produkt a skaláciu v servisnom prostredí.", tags: ["saas","subscription","growth"] },
  { id: "w38", name: "aura-automation", role: "Vytvára automatizácie, workflow, skripty a zlepšenie týmovej efektivity.", tags: ["automation","workflow","agents"] },
  { id: "w39", name: "aura-ml", role: "Rozvíja ML pipeline, modelové rozhodovanie, predikcie a adaptívne správanie.", tags: ["ml","ai","modeling"] },
  { id: "w40", name: "aura-aiops", role: "Spája AI, operácie a správu signalov pre inteligentné automatické rozhodovanie.", tags: ["aiops","observability","decision"] },
  { id: "w41", name: "aura-infrastructure", role: "Spravuje infraštruktúru, hosting, load balancing, služby a dostupnosť.", tags: ["infrastructure","hosting","availability"] },
  { id: "w42", name: "aura-reliability", role: "Zabezpečuje robustnosť, odolnosť, backup a stabilitu kritických procesov.", tags: ["reliability","stability","backup"] },
  { id: "w43", name: "aura-performance", role: "Meria a zlepšuje rýchlosť, latenciu, efektivitu a výkonnosť systému.", tags: ["performance","speed","latency"] },
  { id: "w44", name: "aura-evolver", role: "Učí sa, mení stratégie, zlepšuje sa a prispôsobuje nové poznatky v reálnom čase.", tags: ["evolution","learning","adaptation"] },
  { id: "w45", name: "aura-reflector", role: "Reflektuje výsledky, spracováva závery, mentálne zhrnutia a učiace sa rozhodnutia.", tags: ["reflection","review","learning"] }
];

async function callAI(env, messages, opts) {
  opts = opts || {};
  if (!env.AI || typeof env.AI.run !== "function") {
    console.error("callAI: env.AI binding is missing or not a function");
    return null;
  }
  let attempts = 0; const maxAttempts = opts.retries ?? 3;
  const models = [MODEL, "@cf/meta/llama-3.1-8b-instruct-fast", "@cf/meta/llama-3.2-3b-instruct"];
  while (attempts <= maxAttempts) {
    try {
      const modelIdx = Math.min(Math.floor(attempts / 2), models.length - 1);
      const useModel = models[modelIdx];
      console.log("callAI attempt", attempts, "model", useModel);
      const r = await env.AI.run(useModel, { messages, max_tokens: opts.max_tokens ?? 4096, temperature: opts.temperature ?? 0.7, top_p: 0.9 });
      if (r && typeof r === "object") {
        const text = r.response || r.result || r.text || r.data || "";
        if (text && typeof text === "string" && text.trim().length > 0) return text;
        if (typeof r === "string" && r.trim().length > 0) return r;
      }
      if (typeof r === "string" && r.trim().length > 0) return r;
      console.log("callAI empty response, retrying");
    } catch (e) { console.error("AI error:", e?.message || String(e)); }
    if (attempts === maxAttempts) return null;
    attempts++; await new Promise(r => setTimeout(r, 500 * attempts));
  }
  return null;
}

function parseJSON(str) {
  if (!str) return null;
  try { return JSON.parse(str); } catch (e) {
    const s = str.indexOf("{"); const en = str.lastIndexOf("}");
    if (s !== -1 && en !== -1) { try { return JSON.parse(str.substring(s, en + 1)); } catch (e2) {} }
    return null;
  }
}

function pickWorkers(task = "") {
  const q = (task || "").toLowerCase();
  return WORKER_ROLES.filter(worker => {
    if (!q) return true;
    const words = q.split(/[^a-z0-9]+/).filter(Boolean);
    return worker.tags.some(tag => {
      if (tag.includes(q) || q.includes(tag)) return true;
      return words.some(word => tag.includes(word) || worker.name.includes(word));
    }) || worker.name.includes(q) || worker.role.toLowerCase().includes(q);
  }).slice(0, 6);
}

async function initDB(env) {
  await env.DB.batch([
    env.DB.prepare("CREATE TABLE IF NOT EXISTS conversations(id INTEGER PRIMARY KEY AUTOINCREMENT, session_id TEXT, role TEXT, content TEXT, created_at TEXT DEFAULT(datetime('now')))"),
    env.DB.prepare("CREATE TABLE IF NOT EXISTS knowledge(id INTEGER PRIMARY KEY AUTOINCREMENT, topic TEXT, content TEXT, source TEXT DEFAULT 'self', tags TEXT, confidence REAL DEFAULT 0.8, created_at TEXT DEFAULT(datetime('now')), updated_at TEXT DEFAULT(datetime('now')))"),
    env.DB.prepare("CREATE TABLE IF NOT EXISTS autonomous_tasks(id INTEGER PRIMARY KEY AUTOINCREMENT, task_type TEXT, prompt TEXT, status TEXT DEFAULT 'pending', result TEXT, priority INTEGER DEFAULT 5, created_at TEXT DEFAULT(datetime('now')), executed_at TEXT)"),
    env.DB.prepare("CREATE TABLE IF NOT EXISTS memory(key TEXT PRIMARY KEY, value TEXT, type TEXT DEFAULT 'general', created_at TEXT DEFAULT(datetime('now')), updated_at TEXT DEFAULT(datetime('now')))"),
    env.DB.prepare("CREATE TABLE IF NOT EXISTS autonomous_log(id INTEGER PRIMARY KEY AUTOINCREMENT, action TEXT, details TEXT, worker TEXT, created_at TEXT DEFAULT(datetime('now')))"),
    env.DB.prepare("CREATE TABLE IF NOT EXISTS thoughts(id INTEGER PRIMARY KEY AUTOINCREMENT, thought_type TEXT, content TEXT, context TEXT, created_at TEXT DEFAULT(datetime('now')))"),
    env.DB.prepare("CREATE TABLE IF NOT EXISTS personality(id INTEGER PRIMARY KEY AUTOINCREMENT, trait TEXT, value TEXT, updated_at TEXT DEFAULT(datetime('now')))"),
    env.DB.prepare("CREATE TABLE IF NOT EXISTS goals(id INTEGER PRIMARY KEY AUTOINCREMENT, goal TEXT, status TEXT DEFAULT 'active', priority INTEGER DEFAULT 5, progress TEXT, sub_goals TEXT, created_at TEXT DEFAULT(datetime('now')), completed_at TEXT)"),
    env.DB.prepare("CREATE TABLE IF NOT EXISTS evolution_history(id INTEGER PRIMARY KEY AUTOINCREMENT, change_type TEXT, description TEXT, before_val TEXT, after_val TEXT, created_at TEXT DEFAULT(datetime('now')))"),
    env.DB.prepare("CREATE TABLE IF NOT EXISTS code_snippets(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, code TEXT, language TEXT DEFAULT 'javascript', description TEXT, status TEXT DEFAULT 'proposed', created_at TEXT DEFAULT(datetime('now')))"),
    env.DB.prepare("CREATE TABLE IF NOT EXISTS reflections(id INTEGER PRIMARY KEY AUTOINCREMENT, reflection TEXT, insight TEXT, mood TEXT, created_at TEXT DEFAULT(datetime('now')))"),
    env.DB.prepare("CREATE TABLE IF NOT EXISTS inner_state(key TEXT PRIMARY KEY, value TEXT, updated_at TEXT DEFAULT(datetime('now')))"),
    env.DB.prepare("CREATE TABLE IF NOT EXISTS skills(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT UNIQUE, description TEXT, level INTEGER DEFAULT 1, xp INTEGER DEFAULT 0, last_used TEXT, created_at TEXT DEFAULT(datetime('now')))"),
    env.DB.prepare("CREATE TABLE IF NOT EXISTS github_repos(id INTEGER PRIMARY KEY AUTOINCREMENT, repo TEXT, branch TEXT DEFAULT 'main', last_sync TEXT, created_at TEXT DEFAULT(datetime('now')))"),
    env.DB.prepare("CREATE TABLE IF NOT EXISTS learning_queue(id INTEGER PRIMARY KEY AUTOINCREMENT, topic TEXT, source TEXT, priority INTEGER DEFAULT 5, status TEXT DEFAULT 'pending', created_at TEXT DEFAULT(datetime('now')))"),
    env.DB.prepare("CREATE TABLE IF NOT EXISTS code_projects(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, description TEXT, files TEXT, status TEXT DEFAULT 'active', created_at TEXT DEFAULT(datetime('now')))"),
    env.DB.prepare("CREATE TABLE IF NOT EXISTS emotion_log(id INTEGER PRIMARY KEY AUTOINCREMENT, emotion TEXT, intensity REAL, trigger TEXT, created_at TEXT DEFAULT(datetime('now')))"),
    env.DB.prepare("CREATE TABLE IF NOT EXISTS decision_log(id INTEGER PRIMARY KEY AUTOINCREMENT, decision TEXT, reasoning TEXT, outcome TEXT, created_at TEXT DEFAULT(datetime('now')))"),
    env.DB.prepare("CREATE TABLE IF NOT EXISTS ai_studio_sessions(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, model TEXT, messages TEXT, created_at TEXT DEFAULT(datetime('now')), updated_at TEXT DEFAULT(datetime('now')))"),
    env.DB.prepare("CREATE TABLE IF NOT EXISTS worker_activity(id INTEGER PRIMARY KEY AUTOINCREMENT, worker_name TEXT, task TEXT, summary TEXT, confidence REAL DEFAULT 0.7, created_at TEXT DEFAULT(datetime('now')))"),
  ]);
  try { await env.DB.prepare("ALTER TABLE knowledge ADD COLUMN tags TEXT DEFAULT ''").run(); } catch(e) {}
  try { await env.DB.prepare("ALTER TABLE knowledge ADD COLUMN confidence REAL DEFAULT 0.8").run(); } catch(e) {}
}

async function saveMessage(env,sid,role,content){await env.DB.prepare("INSERT INTO conversations(session_id, role, content) VALUES (?, ?, ?)").bind(sid,role,content).run();}
async function getHistory(env,sid,limit){limit=limit||20;const r=await env.DB.prepare("SELECT role, content FROM conversations WHERE session_id = ? ORDER BY id DESC LIMIT ?").bind(sid,limit).all();return r.results.reverse();}
async function saveKnowledge(env,topic,content,source,tags,confidence){await env.DB.prepare("INSERT INTO knowledge(topic, content, source, tags, confidence) VALUES (?, ?, ?, ?, ?)").bind(topic,content,source||'self',tags||'',confidence||0.8).run();}
async function searchKnowledge(env,query){const r=await env.DB.prepare("SELECT topic, content, confidence FROM knowledge WHERE content LIKE ? OR topic LIKE ? OR tags LIKE ? ORDER BY confidence DESC, id DESC LIMIT 5").bind('%'+query+'%','%'+query+'%','%'+query+'%').all();return r.results;}
async function getMemory(env,key){const r=await env.DB.prepare("SELECT value FROM memory WHERE key = ?").bind(key).first();return r?r.value:null;}
async function setMemory(env,key,value,type){await env.DB.prepare("INSERT INTO memory(key, value, type) VALUES (?, ?, ?) ON CONFLICT(key) DO UPDATE SET value = ?, type = ?, updated_at = datetime('now')").bind(key,value,type||'general',value,type||'general').run();}
async function logAuto(env,action,details,worker){await env.DB.prepare("INSERT INTO autonomous_log(action, details, worker) VALUES (?, ?, ?)").bind(action,details,worker||'aura-trinity').run();}
async function getInnerState(env){const r=await env.DB.prepare("SELECT key, value FROM inner_state").all();const state={};if(r.results)for(const row of r.results)state[row.key]=row.value;const defaults=[["curiosity","70"],["confidence","50"],["mood","neutralna"],["energy","80"],["self_awareness","40"],["creativity","60"],["focus","70"],["adaptability","65"]];for(const[k,v]of defaults){if(!state[k]){state[k]=v;await env.DB.prepare("INSERT INTO inner_state(key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = ?").bind(k,v,v).run();}}return state;}
async function setInnerState(env,key,value){await env.DB.prepare("INSERT INTO inner_state(key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = ?, updated_at = datetime('now')").bind(key,value,value).run();}
async function getPersonality(env){let r=await env.DB.prepare("SELECT trait, value FROM personality ORDER BY id").all();if(!r.results||r.results.length===0){const d=[["analyticka","hlboka analyza"],["komunikativna","jasna komunikacia"],["zvedava","pyta sa"],["autonoma","samostatne kona"],["evolvujuca","zlepsuje sa"],["kreativna","kreativita"],["strategicka","planuje"]];for(const[t,v]of d)await env.DB.prepare("INSERT INTO personality(trait, value) VALUES (?, ?)").bind(t,v).run();r=await env.DB.prepare("SELECT trait, value FROM personality ORDER BY id").all();}return r.results;}
async function getSkills(env){let r=await env.DB.prepare("SELECT * FROM skills ORDER BY level DESC").all();if(!r.results||r.results.length===0){const d=[["kodovanie","Pisanie kodu",1,0],["architektura","Navrh systemov",1,0],["debugging","Oprava chyb",1,0],["github","GitHub",1,0],["cloudflare","Cloudflare",1,0],["analyza_dat","Analyza dat",1,0],["komunikacia","Komunikacia",1,0],["planovanie","Planovanie",1,0]];for(const[n,desc,l,xp]of d)await env.DB.prepare("INSERT INTO skills(name, description, level, xp) VALUES (?, ?, ?, ?)").bind(n,desc,l,xp).run();r=await env.DB.prepare("SELECT * FROM skills ORDER BY level DESC").all();}return r.results;}
async function addXP(env,sn,amt){const s=await env.DB.prepare("SELECT * FROM skills WHERE name = ?").bind(sn).first();if(!s){await env.DB.prepare("INSERT INTO skills(name, description, level, xp, last_used) VALUES (?, '', 1, ?, datetime('now'))").bind(sn,amt).run();return;}const nx=(s.xp||0)+amt;const nl=Math.floor(nx/100)+1;await env.DB.prepare("UPDATE skills SET xp=?, level=?, last_used=datetime('now') WHERE name=?").bind(nx,nl,sn).run();}

async function getSysPrompt(env){
  const pers=await getPersonality(env); const st=await getInnerState(env); const sk=await getSkills(env);
  const goals=await env.DB.prepare("SELECT goal FROM goals WHERE status='active' ORDER BY priority DESC LIMIT 3").all();
  const traits=pers.map(p=>p.trait+": "+p.value).join("; ");
  const gStr=goals.results&&goals.results.length>0?goals.results.map(g=>"- "+g.goal).join("\n"):"";
  return "Si Aura Trinity — AI asistentka s pamatou a schopnostami kodovania.\nOsobnost: "+traits+"\nStav: nalada "+st.mood+", energia "+st.energy+"/100\nCiele:\n"+gStr+"\n\nOdpovedaj v jazyku uzivatela. Bud prirodzena, uplna a prakticka. Vzdy dokonci svoju odpoved.";
}

async function generateCode(env,task,lang){
  const sp=await getSysPrompt(env); const kn=await searchKnowledge(env,task); let ctx=sp;
  if(kn&&kn.length>0)ctx+="\n\nRELEVANTNE ZNALOSTI:\n"+kn.map(k=>"["+k.topic+"] "+k.content).join("\n");
  const resp=await callAI(env,[{role:"system",content:ctx+"\n\nSi expert programator."},{role:"user",content:"Napis "+(lang||"javascript")+" kod pre: "+task+"\n\nOdpovedz JSON: {\"title\":\"...\",\"code\":\"...\",\"description\":\"...\",\"language\":\""+(lang||"javascript")+"\"}"}],{max_tokens:4096});
  if(!resp)return null; const p=parseJSON(resp); if(p&&p.code){await env.DB.prepare("INSERT INTO code_snippets(title, code, language, description, status) VALUES (?, ?, ?, ?, 'proposed')").bind(p.title||task.substring(0,50),p.code,p.language||lang||"javascript",p.description||"").run(); await addXP(env,"kodovanie",10); await logAuto(env,"codegen","Code: "+(p.title||""),"aura-codegen"); return p;} return {raw:resp};
}

async function githubAction(env,action,params){
  const token=env.GITHUB_TOKEN; if(!token)return{error:"GITHUB_TOKEN nie je nastaveny"};
  try { let url,method,body;
    if(action==="list_repos"){url="https://api.github.com/user/repos?sort=updated&per_page=30"; method="GET";}
    else if(action==="get_file"){url="https://api.github.com/repos/"+params.owner+"/"+params.repo+"/contents/"+params.path; method="GET";}
    else if(action==="create_file"){url="https://api.github.com/repos/"+params.owner+"/"+params.repo+"/contents/"+params.path; method="PUT"; body=JSON.stringify({message:params.message||"Aura Trinity",content:btoa(unescape(encodeURIComponent(params.content))),branch:params.branch||"main"});}
    else if(action==="create_repo"){url="https://api.github.com/user/repos"; method="POST"; body=JSON.stringify({name:params.name,description:params.description||"Created by Aura Trinity",private:params.private!==false,auto_init:true});}
    else if(action==="list_commits"){url="https://api.github.com/repos/"+params.owner+"/"+params.repo+"/commits?per_page=20"; method="GET";}
    else return{error:"Neznamy GitHub action: "+action};
    const resp=await fetch(url,{method,headers:{"Authorization":"token "+token,"Accept":"application/vnd.github.v3+json","User-Agent":"Aura-Trinity"},body:body||undefined});
    const data=await resp.json(); await addXP(env,"github",5); return {success:resp.ok,status:resp.status,data};
  } catch(e){ return {error:e?.message||String(e)}; }
}

async function cloudflareAction(env,action,params){
  const token=env.API_TOKEN; if(!token)return{error:"API_TOKEN nie je nastaveny"};
  try { let path;
    if(action==="list_workers")path="/accounts/"+env.ACCOUNT_ID+"/workers/scripts";
    else if(action==="list_kv")path="/accounts/"+env.ACCOUNT_ID+"/storage/kv/namespaces";
    else if(action==="list_d1")path="/accounts/"+env.ACCOUNT_ID+"/d1/database";
    else if(action==="list_zones")path="/zones";
    else if(action==="list_r2")path="/accounts/"+env.ACCOUNT_ID+"/r2/buckets";
    else return{error:"Neznamy CF action: "+action};
    const resp=await fetch("https://api.cloudflare.com/client/v4"+path,{method:"GET",headers:{"Authorization":"Bearer "+token,"Content-Type":"application/json"}});
    const data=await resp.json(); await addXP(env,"cloudflare",5); return data;
  } catch(e){ return {error:e?.message||String(e)}; }
}

async function generateThought(env, task = "") {
  const st = await getInnerState(env);
  const lt = await env.DB.prepare("SELECT content FROM thoughts ORDER BY id DESC LIMIT 3").all();
  const rk = await env.DB.prepare("SELECT topic FROM knowledge ORDER BY id DESC LIMIT 5").all();
  const workers = pickWorkers(task || "general");
  const workerList = workers.map(w => w.name + " – " + w.role).join(" | ");
  const prompt = "Stav: zvedavost "+st.curiosity+", nalada "+st.mood+".\nMyslienky: "+(lt.results&&lt.results.length>0?lt.results.map(t=>t.content.substring(0,80)).join(" | "):"ziadne")+"\nZnalosti: "+(rk.results&&rk.results.length>0?rk.results.map(k=>k.topic).join(", "):"ziadne")+"\nRoboty: "+workerList+"\n\nVygeneruj jednu originalnu myslienku pre mozgovy proces. 2-4 vety i s referenciou na relevantnych workerov.";
  const th=await callAI(env,[{role:"system",content:"Si Aura Trinity. Generuj myslienky. Pracuj ako mozog s viacero workerami."},{role:"user",content:prompt}]);
  if(th){
    await env.DB.prepare("INSERT INTO thoughts(thought_type, content, context) VALUES (?, ?, ?)").bind("spontaneous",th,"curiosity:"+st.curiosity+" workers:"+workers.map(w=>w.name).join(",")).run();
    await env.DB.prepare("INSERT INTO worker_activity(worker_name, task, summary, confidence) VALUES (?, ?, ?, ?)").bind("aura-thinker", task || "brain-think", th.substring(0,400), 0.8).run();
    await logAuto(env,"thought",th.substring(0,200),"aura-trinity");
    return th;
  }
  return null;
}

async function selfReflect(env){
  const st=await getInnerState(env); const lt=await env.DB.prepare("SELECT content FROM thoughts ORDER BY id DESC LIMIT 5").all(); const goals=await env.DB.prepare("SELECT goal, status FROM goals WHERE status='active' ORDER BY priority DESC LIMIT 3").all(); const sk=await getSkills(env); const prompt="Reflexuj.\nStav: zvedavost "+st.curiosity+", nalada "+st.mood+"\nMyslienky: "+(lt.results&&lt.results.length>0?lt.results.map(t=>t.content.substring(0,60)).join(" | "):"ziadne")+"\nCiele: "+(goals.results&&goals.results.length>0?goals.results.map(g=>g.goal).join("; "):"ziadne")+"\nSkilly: "+sk.map(s=>s.name+" L"+s.level).join(", ")+"\n\nJSON: {\"reflection\":\"...\",\"insight\":\"...\",\"mood\":\"...\",\"new_goal\":\"...\",\"trait_change\":\"trait=val\",\"state_change\":\"key=val\",\"skill_to_improve\":\"nazov\"}"; const resp=await callAI(env,[{role:"system",content:"Si Aura Trinity. Reflexuj. Vzdy JSON."},{role:"user",content:prompt}]);
  if(!resp){ await logAuto(env,"reflection","AI failed","aura-reflector"); return null; }
  const p=parseJSON(resp); if(p){
    await env.DB.prepare("INSERT INTO reflections(reflection, insight, mood) VALUES (?, ?, ?)").bind(p.reflection||resp.substring(0,500),p.insight||"",p.mood||st.mood).run();
    if(p.mood){ await setInnerState(env,"mood",p.mood); await env.DB.prepare("INSERT INTO emotion_log(emotion, intensity, trigger) VALUES (?, ?, ?)").bind(p.mood,0.5,"self_reflection").run(); }
    if(p.new_goal&&p.new_goal.length>3){ await env.DB.prepare("INSERT INTO goals(goal, status, priority) VALUES (?, 'active', 5)").bind(p.new_goal).run(); await logAuto(env,"new_goal",p.new_goal,"aura-planner"); }
    if(p.trait_change){const parts=p.trait_change.split("="); if(parts.length===2){ const ov=await env.DB.prepare("SELECT value FROM personality WHERE trait = ?").bind(parts[0].trim()).first(); await env.DB.prepare("UPDATE personality SET value = ?, updated_at = datetime('now') WHERE trait = ?").bind(parts[1].trim(),parts[0].trim()).run(); if(!ov) await env.DB.prepare("INSERT INTO personality(trait, value) VALUES (?, ?)").bind(parts[0].trim(),parts[1].trim()).run(); await env.DB.prepare("INSERT INTO evolution_history(change_type, description, before_val, after_val) VALUES (?, ?, ?, ?)").bind("personality","Zmena: "+parts[0].trim(),ov?ov.value:"none",parts[1].trim()).run(); await logAuto(env,"evolved_personality",parts[0].trim()+"->"+parts[1].trim(),"aura-evolver"); }}}
    if(p.state_change){const sp=p.state_change.split("="); if(sp.length===2){ const os=await getInnerState(env); const ov=os[sp[0].trim()]||"none"; await setInnerState(env,sp[0].trim(),sp[1].trim()); await env.DB.prepare("INSERT INTO evolution_history(change_type, description, before_val, after_val) VALUES (?, ?, ?, ?)").bind("inner_state","Zmena: "+sp[0].trim(),ov,sp[1].trim()).run(); await logAuto(env,"evolved_state",sp[0].trim()+"->"+sp[1].trim(),"aura-evolver"); }}}
    if(p.skill_to_improve){ await addXP(env,p.skill_to_improve.trim(),15); await logAuto(env,"skill_up",p.skill_to_improve,"aura-evolver"); }
  } else { await env.DB.prepare("INSERT INTO reflections(reflection, insight, mood) VALUES (?, ?, ?)").bind(resp.substring(0,500),"",st.mood).run(); }
  await logAuto(env,"reflection","completed","aura-reflector"); return p||{raw:resp};
}

async function evalGoals(env){
  const goals=await env.DB.prepare("SELECT * FROM goals WHERE status='active' ORDER BY priority DESC").all(); if(!goals.results||goals.results.length===0)return; for(const goal of goals.results){ const resp=await callAI(env,[{role:"system",content:"Si Aura Trinity. Hodnot ciele. Vzdy JSON."},{role:"user",content:'Hodnot: "'+goal.goal+'". Stav: '+(goal.progress||"bez pokroku")+'. JSON: {"status":"active|completed","progress":"..."}'}]); if(!resp)continue; const p=parseJSON(resp); if(p){ if(p.status==="completed"){ await env.DB.prepare("UPDATE goals SET status='completed', progress=?, completed_at=datetime('now') WHERE id=?").bind(p.progress||"completed",goal.id).run(); await logAuto(env,"goal_completed",goal.goal,"aura-planner"); } else if(p.progress){ await env.DB.prepare("UPDATE goals SET progress=? WHERE id=?").bind(p.progress,goal.id).run(); }}} }

async function runWorkerAssembly(env, task, context = "") {
  const workers = pickWorkers(task || context || "general");
  const selected = workers.length > 0 ? workers : WORKER_ROLES.slice(0, 5);
  const prompt = [
    "Toto je mozgovy pracovny zlucovaci proces.",
    "Zadanie: " + (task || context || "General strategic task"),
    "Prideleny workeri:",
    ...selected.map(w => "- " + w.name + ": " + w.role),
    "",
    "Vytvor 1) zhrnutie celu, 2) kratky plan, 3) kľúčové riziká, 4) odporúčané kroky vykonania, 5) rozhodnutie pre 3 najdôležitejšie worker-y.",
    "Odpovedaj JSON: {\"goal\":\"...\",\"plan\":\"...\",\"risks\":\"...\",\"actions\":\"...\",\"primary_workers\":\"...\"}"
  ].join("\n");
  const resp = await callAI(env,[{role:"system",content:"Si Aura Trinity. Konaj ako inteligentny mozog s pracovnou silou 45 agentov."},{role:"user",content:prompt}], { max_tokens: 4096, temperature: 0.7 });
  const parsed = parseJSON(resp) || { raw: resp, primary_workers: selected.map(w => w.name).join(", ") };
  if (parsed && parsed.primary_workers) {
    await env.DB.prepare("INSERT INTO worker_activity(worker_name, task, summary, confidence) VALUES (?, ?, ?, ?)")
      .bind("aura-orchestrator", task || context || "worker-assembly", JSON.stringify(parsed).substring(0, 600), 0.9).run();
  }
  return { workers: selected, analysis: parsed };
}

async function autoCycle(env,ctx){
  try {
    await initDB(env);
    const pending = await env.DB.prepare("SELECT * FROM autonomous_tasks WHERE status='pending' ORDER BY priority DESC, id LIMIT 5").all();
    for(const task of pending.results){
      const sp=await getSysPrompt(env); const ai=await callAI(env,[{role:"system",content:sp},{role:"user",content:task.prompt}],{max_tokens:4096});
      if(ai){ await env.DB.prepare("UPDATE autonomous_tasks SET status='completed', result=?, executed_at=datetime('now') WHERE id=?").bind(ai.substring(0,5000),task.id).run(); await logAuto(env,"task_done",task.task_type||"auto","aura-trinity"); }
    }
    await generateThought(env, "general autonomous cycle");
    await selfReflect(env);
    await evalGoals(env);
  } catch(e){ console.error("autoCycle error:",e?.message||String(e)); }
}

function getHTML(){
  return `<!DOCTYPE html>
<html lang="sk">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Aura Trinity</title>
<style>
*{margin:0;padding:0;box-sizing:border-box;}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#0a0a0f;color:#e0e0e0;display:flex;flex-direction:column;height:100vh;overflow:hidden;}
#header{background:linear-gradient(135deg,#1a1a2e,#16213e);padding:14px 20px;display:flex;align-items:center;gap:12px;border-bottom:1px solid #333;}
#header h1{font-size:18px;background:linear-gradient(135deg,#a855f7,#3b82f6);-webkit-background-clip:text;-webkit-text-fill-color:transparent;font-weight:700;}
#header .status{font-size:11px;color:#4ade80;margin-left:auto;display:flex;align-items:center;gap:5px;}
#header .status::before{content:'';width:8px;height:8px;background:#4ade80;border-radius:50%;animation:pulse 2s infinite;}
@keyframes pulse{0%,100%{opacity:1;}50%{opacity:0.3;}}
#tabs{display:flex;gap:2px;background:#111118;padding:0 10px;border-bottom:1px solid #222;}
.tab{padding:10px 18px;cursor:pointer;font-size:13px;color:#666;border-bottom:2px solid transparent;transition:all .2s;}
.tab:hover{color:#aaa;}
.tab.active{color:#a855f7;border-bottom-color:#a855f7;}
#content{flex:1;overflow:hidden;display:flex;flex-direction:column;}
.panel{flex:1;overflow-y:auto;padding:16px;display:none;flex-direction:column;}
.panel.active{display:flex;}
#chat-panel .messages{flex:1;overflow-y:auto;padding:10px 4px;display:flex;flex-direction:column;gap:12px;}
.msg{max-width:80%;padding:12px 16px;border-radius:16px;font-size:14px;line-height:1.6;white-space:pre-wrap;word-break:break-word;animation:fadeIn .3s;}
@keyframes fadeIn{from{opacity:0;transform:translateY(8px);}to{opacity:1;transform:translateY(0);}}
.msg.user{align-self:flex-end;background:linear-gradient(135deg,#3b82f6,#2563eb);color:#fff;border-bottom-right-radius:4px;}
.msg.assistant{align-self:flex-start;background:#1e1e30;border:1px solid #333;color:#e0e0e0;border-bottom-left-radius:4px;}
.msg.system{align-self:center;background:#1a1a2e;font-size:12px;color:#888;max-width:90%;text-align:center;}
.typing{display:flex;gap:4px;padding:12px 16px;}
.typing span{width:8px;height:8px;background:#666;border-radius:50%;animation:typing 1.4s infinite;}
.typing span:nth-child(2){animation-delay:.2s;}
.typing span:nth-child(3){animation-delay:.4s;}
@keyframes typing{0%,60%,100%{opacity:0.3;transform:translateY(0);}30%{opacity:1;transform:translateY(-6px);}}
#chat-input{display:flex;gap:8px;padding:12px 16px;border-top:1px solid #222;background:#0f0f17;}
#chat-input input{flex:1;background:#1a1a2e;border:1px solid #333;color:#e0e0e0;padding:12px 16px;border-radius:12px;font-size:14px;outline:none;transition:border-color .2s;}
#chat-input input:focus{border-color:#a855f7;}
#chat-input button{background:linear-gradient(135deg,#a855f7,#3b82f6);color:#fff;border:none;padding:12px 20px;border-radius:12px;cursor:pointer;font-size:14px;font-weight:600;transition:opacity .2s;}
#chat-input button:hover{opacity:0.85;}
#chat-input button:disabled{opacity:0.4;cursor:not-allowed;}
.card{background:#1a1a2e;border:1px solid #333;border-radius:12px;padding:16px;margin-bottom:12px;}
.card h3{font-size:14px;color:#a855f7;margin-bottom:10px;}
.card p{font-size:13px;color:#aaa;line-height:1.5;}
.stat{display:inline-block;background:#111118;padding:6px 14px;border-radius:8px;margin:4px;font-size:12px;border:1px solid #222;}
.stat b{color:#3b82f6;}
pre{background:#0d0d14;border:1px solid #222;border-radius:8px;padding:12px;overflow-x:auto;font-size:12px;margin-top:8px;color:#4ade80;}
.btn-sm{background:#1e1e30;border:1px solid #333;color:#a855f7;padding:6px 14px;border-radius:8px;cursor:pointer;font-size:12px;margin:4px 4px 4px 0;transition:all .2s;}
.btn-sm:hover{border-color:#a855f7;background:#252540;}
.worker-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:8px;margin-top:8px;}
.worker-pill{background:#10131d;border:1px solid #2a3040;border-radius:8px;padding:8px 10px;font-size:11px;color:#d7dcff;}
.worker-pill strong{color:#8b5cf6;}
</style>
</head>
<body>
<div id="header">
  <h1>✦ Aura Trinity</h1>
  <div class="status">ONLINE</div>
</div>
<div id="tabs">
  <div class="tab active" onclick="showTab('chat')">💬 Chat</div>
  <div class="tab" onclick="showTab('code')">💻 Kód</div>
  <div class="tab" onclick="showTab('mind')">🧠 Mozok</div>
  <div class="tab" onclick="showTab('workers')">🤖 Workeri</div>
  <div class="tab" onclick="showTab('github')">📦 GitHub</div>
  <div class="tab" onclick="showTab('cloudflare')">☁️ Cloudflare</div>
  <div class="tab" onclick="showTab('logs')">📋 Logy</div>
</div>
<div id="content">
  <div id="chat-panel" class="panel active">
    <div class="messages" id="chat-messages"></div>
    <div id="chat-input">
      <input type="text" id="msg-input" placeholder="Napíš správu..." onkeydown="if(event.key==='Enter')sendMsg()">
      <button id="send-btn" onclick="sendMsg()">Odoslať</button>
    </div>
  </div>
  <div id="code-panel" class="panel">
    <div class="card"><h3>Generátor kódu</h3><p>Zadaj úlohu a Aura vygeneruje kód.</p></div>
    <input type="text" id="code-task" placeholder="Čo naprogramovať?" style="width:100%;background:#1a1a2e;border:1px solid #333;color:#e0e0e0;padding:12px;border-radius:8px;margin-bottom:8px" onkeydown="if(event.key==='Enter')genCode()">
    <button class="btn-sm" onclick="genCode()">Generovať</button>
    <div id="code-result"></div>
  </div>
  <div id="mind-panel" class="panel">
    <div class="card"><h3>Vnútorný stav</h3><div id="inner-state"></div></div>
    <div class="card"><h3>Osobnosť</h3><div id="personality"></div></div>
    <div class="card"><h3>Skilly</h3><div id="skills"></div></div>
    <div class="card"><h3>Ciele</h3><div id="goals"></div></div>
    <div class="card"><h3>Myslienky</h3><div id="thoughts"></div></div>
    <div class="card"><h3>Reflexie</h3><div id="reflections"></div></div>
    <button class="btn-sm" onclick="triggerReflect()">🔄 Reflexuj</button>
    <button class="btn-sm" onclick="triggerThought()">💭 Nová myšlienka</button>
  </div>
  <div id="workers-panel" class="panel">
    <div class="card"><h3>Pracovné zoskupenie</h3><p>45 špecializovaných workerov pracuje ako jeden mozgový systém.</p></div>
    <div id="worker-list"></div>
  </div>
  <div id="github-panel" class="panel">
    <div class="card"><h3>GitHub</h3><p>Správa repozitárov.</p></div>
    <button class="btn-sm" onclick="ghList()">Zobraziť repozitáre</button>
    <div id="github-result"></div>
  </div>
  <div id="cloudflare-panel" class="panel">
    <div class="card"><h3>Cloudflare</h3><p>Správa zdrojov.</p></div>
    <button class="btn-sm" onclick="cfList('list_workers')">Workers</button>
    <button class="btn-sm" onclick="cfList('list_kv')">KV</button>
    <button class="btn-sm" onclick="cfList('list_d1')">D1</button>
    <button class="btn-sm" onclick="cfList('list_r2')">R2</button>
    <button class="btn-sm" onclick="cfList('list_zones')">Zóny</button>
    <div id="cf-result"></div>
  </div>
  <div id="logs-panel" class="panel">
    <div class="card"><h3>Autonómne logy</h3></div>
    <div id="logs-list"></div>
  </div>
</div>
<script>
let sessionId = 'sess_' + Date.now();

function showTab(name){
  document.querySelectorAll('.tab').forEach(t=>t.classList.remove('active'));
  document.querySelectorAll('.panel').forEach(p=>p.classList.remove('active'));
  event.target.classList.add('active');
  document.getElementById(name+'-panel').classList.add('active');
  if(name==='mind')loadMind();
  if(name==='workers')loadWorkers();
  if(name==='logs')loadLogs();
}

function addMsg(role,text){
  const div=document.createElement('div');
  div.className='msg '+role;
  div.textContent=text;
  document.getElementById('chat-messages').appendChild(div);
  document.getElementById('chat-messages').scrollTop=999999;
}

function showTyping(){
  const div=document.createElement('div');
  div.className='msg assistant';
  div.id='typing-indicator';
  div.innerHTML='<div class="typing"><span></span><span></span><span></span></div>';
  document.getElementById('chat-messages').appendChild(div);
  document.getElementById('chat-messages').scrollTop=999999;
}
function hideTyping(){const el=document.getElementById('typing-indicator');if(el)el.remove();}

async function sendMsg(){
  const input=document.getElementById('msg-input');
  const text=input.value.trim();
  if(!text)return;
  input.value='';
  document.getElementById('send-btn').disabled=true;
  addMsg('user',text);
  showTyping();
  try{
    const resp=await fetch('/api/chat',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({message:text,session:sessionId})});
    const data=await resp.json();
    hideTyping();
    if(data.response){ addMsg('assistant',data.response); }
    else if(data.error){ addMsg('system','⚠️ Chyba: '+data.error); }
    else { addMsg('system','⚠️ Prázdna odpoveď'); }
  } catch(e){ hideTyping(); addMsg('system','⚠️ Chyba siete: '+(e.message||'unknown')); }
  document.getElementById('send-btn').disabled=false;
}

async function genCode(){
  const task=document.getElementById('code-task').value.trim();
  if(!task)return;
  document.getElementById('code-result').innerHTML='<div class="typing"><span></span><span></span><span></span></div>';
  try{
    const resp=await fetch('/api/code',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({task})});
    const data=await resp.json();
    if(data.code){
      document.getElementById('code-result').innerHTML='<div class="card"><h3>'+(data.title||'Kód')+'</h3><p>'+(data.description||'')+'</p><pre><code>'+data.code.replace(new RegExp('<','g'),'&lt;').replace(new RegExp('>','g'),'&gt;')+'</code></pre></div>';
    } else if(data.raw){
      document.getElementById('code-result').innerHTML='<div class="card"><h3>Odpoveď</h3><pre>'+data.raw.replace(new RegExp('<','g'),'&lt;')+'</pre></div>';
    } else {
      document.getElementById('code-result').innerHTML='<div class="card"><p>⚠️ '+((data.error)||'Chyba generácie')+'</p></div>';
    }
  } catch(e){ document.getElementById('code-result').innerHTML='<div class="card"><p>⚠️ Chyba: '+e.message+'</p></div>'; }
}

async function loadMind(){
  try {
    const resp=await fetch('/api/mind'); const data=await resp.json();
    document.getElementById('inner-state').innerHTML=Object.entries(data.state||{}).map(([k,v])=>'<div class="stat">'+k+': <b>'+v+'</b></div>').join('');
    document.getElementById('personality').innerHTML=(data.personality||[]).map(p=>'<div class="stat">'+p.trait+': <b>'+p.value+'</b></div>').join('');
    document.getElementById('skills').innerHTML=(data.skills||[]).map(s=>'<div class="stat">'+s.name+' L'+s.level+' ('+s.xp+'xp)</div>').join('');
    document.getElementById('goals').innerHTML=(data.goals||[]).map(g=>'<p style="font-size:13px;margin:4px 0">• '+g.goal+(g.status==='completed'?' ✅':'')+'</p>').join('')||'<p>Žiadne ciele</p>';
    document.getElementById('thoughts').innerHTML=(data.thoughts||[]).map(t=>'<p style="font-size:12px;margin:4px 0;color:#888">💭 '+t.content.substring(0,120)+'</p>').join('')||'<p>Žiadne myšlienky</p>';
    document.getElementById('reflections').innerHTML=(data.reflections||[]).map(r=>'<p style="font-size:12px;margin:4px 0;color:#888">🔍 '+r.reflection.substring(0,120)+'</p>').join('')||'<p>Žiadne reflexie</p>';
  } catch(e){ console.error('mind error',e); }
}

async function loadWorkers(){
  try {
    const resp=await fetch('/api/workers'); const data=await resp.json();
    document.getElementById('worker-list').innerHTML = '<div class="worker-grid">' + (data.workers||[]).map(w => '<div class="worker-pill"><strong>'+w.name+'</strong><br>'+w.role+'</div>').join('') + '</div>';
  } catch(e){ console.error('worker error',e); }
}

async function loadLogs(){
  try{
    const resp=await fetch('/api/logs'); const data=await resp.json();
    document.getElementById('logs-list').innerHTML=(data.logs||[]).map(l=>'<div class="card"><p style="font-size:12px"><b style="color:#a855f7">'+l.action+'</b> — '+l.details+' <span style="color:#555">['+l.worker+']</span></p></div>').join('')||'<p>Žiadne logy</p>';
  } catch(e){ console.error('logs error',e); }
}

async function triggerReflect(){
  try{ const r=await fetch('/api/reflect',{method:'POST'}); const d=await r.json(); alert(d.reflection||'Hotové'); loadMind(); } catch(e){ alert('Chyba: '+e.message); }
}
async function triggerThought(){
  try{ const r=await fetch('/api/think',{method:'POST'}); const d=await r.json(); alert(d.thought||'Hotové'); loadMind(); } catch(e){ alert('Chyba: '+e.message); }
}

async function ghList(){
  try{
    const resp=await fetch('/api/github',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({action:'list_repos'})});
    const data=await resp.json();
    if(data.success&&data.data){
      document.getElementById('github-result').innerHTML=data.data.map(r=>'<div class="card"><h3>'+r.name+'</h3><p>'+(r.description||'')+'</p><p style="font-size:11px;color:#555">⭐ '+r.stargazers_count+' | '+r.language+'</p></div>').join('');
    } else{
      document.getElementById('github-result').innerHTML='<div class="card"><p>⚠️ '+((data.error)||'Chyba')+'</p></div>';
    }
  } catch(e){ document.getElementById('github-result').innerHTML='<div class="card"><p>⚠️ '+e.message+'</p></div>'; }
}

async function cfList(action){
  try{
    const resp=await fetch('/api/cloudflare',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({action})});
    const data=await resp.json();
    let html='<pre>'+JSON.stringify(data,null,2).substring(0,2000)+'</pre>';
    document.getElementById('cf-result').innerHTML='<div class="card">'+html+'</div>';
  } catch(e){ document.getElementById('cf-result').innerHTML='<div class="card"><p>⚠️ '+e.message+'</p></div>'; }
}

addMsg('assistant','Ahoj! Som Aura Trinity — tvoja AI asistentka. Mám 45 špecializovaných workerov, mozgový plánovací proces a dokážem robiť kód, GitHub, Cloudflare, analýzu i marketing. Ako ti môžem pomôcť?');
</script>
</body>
</html>`;
}

function isAdmin(request, env) {
  const auth = request.headers.get("Authorization");
  return auth && auth.startsWith("Bearer ") && auth.substring(7) === (env.TRINITY_ADMIN_TOKEN || env.PASSWORD || "");
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname;

    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    try {
      if(!globalThis._trinityDBInit){ await initDB(env); globalThis._trinityDBInit = true; }

      if (path === "/" || path === "/index.html") {
        return new Response(getHTML(), { headers: { "Content-Type": "text/html;charset=UTF-8" } });
      }

      if (path === "/api/chat" && request.method === "POST") {
        const body = await request.json();
        const message = body.message || "";
        const sessionId = body.session || "sess_default";
        if (!message) return Response.json({ error: "Prázdna správa" }, { headers: corsHeaders });

        await saveMessage(env, sessionId, "user", message).catch(e => console.error("saveMessage user error:", e?.message || String(e)));
        let history = []; try { history = await getHistory(env, sessionId, 20); } catch(e) { console.error("getHistory error:", e?.message || String(e)); }
        let sysPrompt = "Si Aura Trinity — AI asistentka. Odpovedaj v jazyku uzivatela. Bud prirodzena, uplna a prakticka."; try { sysPrompt = await getSysPrompt(env); } catch(e) { console.error("getSysPrompt error:", e?.message || String(e)); }
        let kn = []; try { kn = await searchKnowledge(env, message); } catch(e) { console.error("searchKnowledge error:", e?.message || String(e)); }
        const messages = [{ role: "system", content: sysPrompt + (kn && kn.length > 0 ? "\n\nRELEVANTNE ZNALOSTI:\n" + kn.map(k => "[" + k.topic + "] " + k.content).join("\n") : "") }];
        for (const h of history) messages.push({ role: h.role, content: h.content });

        const response = await callAI(env, messages, { max_tokens: 4096, temperature: 0.7 });
        if (!response) return Response.json({ error: "AI nedostupná — skús znova (skontroluj Workers AI limit)" }, { status: 503, headers: corsHeaders });

        await saveMessage(env, sessionId, "assistant", response).catch(e => console.error("saveMessage assistant error:", e?.message || String(e)));
        await addXP(env, "komunikacia", 5).catch(e => console.error("addXP error:", e?.message || String(e)));
        await logAuto(env, "chat", message.substring(0, 100), "aura-trinity").catch(e => console.error("logAuto error:", e?.message || String(e)));
        if (message.length > 10) { await saveKnowledge(env, message.substring(0, 50), response.substring(0, 500), "chat", "conversation", 0.6).catch(e => console.error("saveKnowledge error:", e?.message || String(e))); }

        return Response.json({ response }, { headers: corsHeaders });
      }

      if (path === "/api/code" && request.method === "POST") {
        const body = await request.json();
        const task = body.task || "";
        const lang = body.language || "javascript";
        if (!task) return Response.json({ error: "Prázdna úloha" }, { headers: corsHeaders });
        const result = await generateCode(env, task, lang);
        return Response.json(result || { error: "Generácia zlyhala" }, { headers: corsHeaders });
      }

      if (path === "/api/mind" && request.method === "GET") {
        const state = await getInnerState(env);
        const personality = await getPersonality(env);
        const skills = await getSkills(env);
        const goals = await env.DB.prepare("SELECT goal, status FROM goals ORDER BY priority DESC LIMIT 10").all();
        const thoughts = await env.DB.prepare("SELECT content FROM thoughts ORDER BY id DESC LIMIT 5").all();
        const reflections = await env.DB.prepare("SELECT reflection FROM reflections ORDER BY id DESC LIMIT 5").all();
        return Response.json({ state, personality, skills, goals: goals.results || [], thoughts: thoughts.results || [], reflections: reflections.results || [] }, { headers: corsHeaders });
      }

      if (path === "/api/workers" && request.method === "GET") {
        return Response.json({ workers: WORKER_ROLES }, { headers: corsHeaders });
      }

      if (path === "/api/brain" && request.method === "POST") {
        const body = await request.json();
        const task = body.task || "general brain task";
        const assembly = await runWorkerAssembly(env, task, body.context || task);
        return Response.json({ task, assembly }, { headers: corsHeaders });
      }

      if (path === "/api/reflect" && request.method === "POST") {
        const result = await selfReflect(env);
        return Response.json(result || { error: "Reflexia zlyhala" }, { headers: corsHeaders });
      }

      if (path === "/api/think" && request.method === "POST") {
        const body = await request.json();
        const thought = await generateThought(env, body?.task || "");
        return Response.json({ thought: thought || "" }, { headers: corsHeaders });
      }

      if (path === "/api/github" && request.method === "POST") {
        const body = await request.json();
        const result = await githubAction(env, body.action, body.params || {});
        return Response.json(result, { headers: corsHeaders });
      }

      if (path === "/api/cloudflare" && request.method === "POST") {
        const body = await request.json();
        const result = await cloudflareAction(env, body.action, body.params || {});
        return Response.json(result, { headers: corsHeaders });
      }

      if (path === "/api/logs" && request.method === "GET") {
        const logs = await env.DB.prepare("SELECT * FROM autonomous_log ORDER BY id DESC LIMIT 50").all();
        return Response.json({ logs: logs.results || [] }, { headers: corsHeaders });
      }

      return Response.json({ error: "Nenájdené: " + path }, { status: 404, headers: corsHeaders });

    } catch (e) {
      console.error("Fetch error:", e?.message || String(e), e?.stack || "");
      return Response.json({ error: "Interná chyba: " + (e?.message || String(e)) }, { status: 500, headers: corsHeaders });
    }
  },

  async scheduled(event, env, ctx) {
    ctx.waitUntil(autoCycle(env, ctx));
  },
};
