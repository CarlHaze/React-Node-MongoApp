(()=>{var e={417:(e,t,a)=>{"use strict";a.d(t,{Z:()=>r});const n=require("axios");var s=a.n(n),o=a(689),i=a.n(o);const r=function(e){const[t,a]=(0,o.useState)(!1),[n,r]=(0,o.useState)(""),[l,c]=(0,o.useState)(),[m,d]=(0,o.useState)("");return i().createElement("div",{className:"card"},i().createElement("div",{className:"our-card-top"},t&&i().createElement("div",{className:"our-custom-input"},i().createElement("div",{className:"our-custom-input-interior"},i().createElement("input",{onChange:e=>c(e.target.files[0]),className:"form-control form-control-sm",type:"file"}))),i().createElement("img",{src:e.photo?`/uploaded-photos/${e.photo}`:"/defaultImage.png",className:"card-img-top",alt:`${e.species} named ${e.name}`})),i().createElement("div",{className:"card-body"},!t&&i().createElement(i().Fragment,null,i().createElement("h4",null,"Name: ",e.name),i().createElement("p",{className:"text-muted small"},"Species: ",e.species),!e.readOnly&&i().createElement(i().Fragment,null,i().createElement("button",{onClick:()=>{a(!0),r(e.name),d(e.species),c("")},className:"btn btn-sm btn-primary"},"Edit")," ",i().createElement("button",{onClick:async()=>{s().delete(`/animal/${e.id}`),e.setAnimals((t=>t.filter((t=>t._id!=e.id))))},className:"btn btn-sm btn-outline-danger"},"Delete"))),t&&i().createElement("form",{onSubmit:async function(t){t.preventDefault(),a(!1),e.setAnimals((t=>t.map((function(t){return t._id==e.id?{...t,name:n,species:m}:t}))));const o=new FormData;l&&o.append("photo",l),o.append("_id",e.id),o.append("name",n),o.append("species",m);const i=await s().post("/update-animal",o,{headers:{"Content-Type":"multipart/form-data"}});i.data&&e.setAnimals((t=>t.map((function(t){return t._id==e.id?{...t,photo:i.data}:t}))))}},i().createElement("div",{className:"mb-1"},i().createElement("input",{autoFocus:!0,onChange:e=>r(e.target.value),type:"text",className:"form-control form-control-sm",value:n})),i().createElement("div",{className:"mb-2"},i().createElement("input",{onChange:e=>d(e.target.value),type:"text",className:"form-control form-control-sm",value:m})),i().createElement("button",{className:"btn btn-sm btn-success"},"Save")," ",i().createElement("button",{onClick:()=>a(!1),className:"btn btn-sm btn-outline-secondary"},"Cancel"))))}},860:e=>{"use strict";e.exports=require("express")},470:e=>{"use strict";e.exports=require("fs-extra")},13:e=>{"use strict";e.exports=require("mongodb")},738:e=>{"use strict";e.exports=require("multer")},689:e=>{"use strict";e.exports=require("react")},684:e=>{"use strict";e.exports=require("react-dom/server")},109:e=>{"use strict";e.exports=require("sanitize-html")},441:e=>{"use strict";e.exports=require("sharp")},17:e=>{"use strict";e.exports=require("path")}},t={};function a(n){var s=t[n];if(void 0!==s)return s.exports;var o=t[n]={exports:{}};return e[n](o,o.exports,a),o.exports}a.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return a.d(t,{a:t}),t},a.d=(e,t)=>{for(var n in t)a.o(t,n)&&!a.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},a.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{const{response:e}=a(860),t=a(860),{MongoClient:n,ObjectId:s}=a(13),o=a(738)(),i=a(109),r=a(470),l=a(441);let c;const m=a(17),d=a(689),p=a(684),u=a(417).Z;r.ensureDirSync(m.join("public","uploaded-photos"));const b=t();function f(e,t,a){"string"!=typeof e.body.name&&(e.body.name=""),"string"!=typeof e.body.species&&(e.body.species=""),"string"!=typeof e.body._id&&(e.body._id=""),e.cleanData={name:i(e.body.name.trim(),{allowedTags:[],allowedAttributes:{}}),species:i(e.body.species.trim(),{allowedTags:[],allowedAttributes:{}})},a()}b.set("view engine","ejs"),b.set("views","./views"),b.use(t.static("public")),b.use(t.json()),b.use(t.urlencoded({extended:!1})),b.get("/",(async(e,t)=>{const a=await c.collection("animals").find().toArray(),n=p.renderToString(d.createElement("div",{className:"container"},!a.length&&d.createElement("p",null,"Admin needs to add some animals please comback later"),d.createElement("h1",{className:"title"},"MERN Application"),d.createElement("div",{className:"animal-grid mb-3"},a.map((e=>d.createElement(u,{key:e.id,name:e.name,species:e.species,photo:e.photo,id:e._id,readOnly:!0})))),d.createElement("p",null,d.createElement("a",{href:"/admin"},"Login to manage animal cards")),d.createElement("div",{className:"browserstorage"})));t.render("home",{generatedHTML:n})})),b.use((function(e,t,a){t.set("WWW-Authenticate","Basic realm='MERN Pet App'"),"Basic YWRtaW46YWRtaW4="==e.headers.authorization?a():(console.log(e.headers.authorization),t.status(401).send("Try Again"))})),b.get("/admin",((e,t)=>{t.render("admin")})),b.get("/api/animals",(async(e,t)=>{const a=await c.collection("animals").find().toArray();t.json(a)})),b.post("/create-animal",o.single("photo"),f,(async(e,t)=>{if(e.file){const t=`${Date.now()}.jpg`;await l(e.file.buffer).resize(900,500).jpeg({quality:60}).toFile(m.join("public","uploaded-photos",t)),e.cleanData.photo=t}console.log(e.body);const a=await c.collection("animals").insertOne(e.cleanData),n=await c.collection("animals").findOne({_id:new s(a.insertedId)});t.send(n)})),b.delete("/animal/:id",(async(e,t)=>{"string"!=typeof e.params.id&&(e.params.id="");const a=await c.collection("animals").findOne({_id:new s(e.params.id)});a.photo&&r.remove(m.join("public","uploaded-photos",a.photo)),c.collection("animals").deleteOne({_id:new s(e.params.id)}),t.send("All done")})),b.post("/update-animal",o.single("photo"),f,(async(e,t)=>{if(e.file){const a=`${Date.now()}.jpg`;await l(e.file.buffer).resize(844,456).jpeg({quality:60}).toFile(m.join("public","uploaded-photos",a)),e.cleanData.photo=a;const n=await c.collection("animals").findOneAndUpdate({_id:new s(e.body._id)},{$set:e.cleanData});n.value.photo&&r.remove(m.join("public","uploaded-photos",n.value.photo)),t.send(a)}else c.collection("animals").findOneAndUpdate({_id:new s(e.body._id)},{$set:e.cleanData}),t.send(!1)})),async function(){const e=new n("mongodb+srv://Carl_Ellis:mongodbtest@cluster0.j16jrhy.mongodb.net/MERN_App_DB?retryWrites=true&w=majority");await e.connect(),c=e.db(),b.listen(3e3)}()})()})();