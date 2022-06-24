const menu_icon=document.querySelector("#menu"),close_icon=document.querySelector("#close"),mobile_nav=document.querySelector("#drop-down");menu_icon.addEventListener("click",(()=>{mobile_nav.style.transform="translateX(0%)",menu_icon.style.display="none"})),close_icon.addEventListener("click",(()=>{menu_icon.style.display="block",mobile_nav.style.transform="translateX(100%)"}));const percentList=document.querySelectorAll(".percent");for(let e=0;e<percentList.length;e++){let t=percentList[e].textContent,n=t.indexOf("%"),o=parseInt(t.slice(0,n));percentList[e].style.width=`${o}%`}L.mapquest.key="8bjlbcHoGVSkdZiGpfRlGbHFIItuSEnO";const map=L.mapquest.map("map",{center:[39.6296192,-104.9755648],layers:L.mapquest.tileLayer("light"),zoom:12});tinymce.init({selector:"textarea",plugins:"a11ychecker advcode casechange export formatpainter image editimage linkchecker autolink lists checklist media mediaembed pageembed permanentpen powerpaste table advtable tableofcontents tinycomments tinymcespellchecker",toolbar:"a11ycheck addcomment showcomments casechange checklist code export formatpainter image editimage pageembed permanentpen table tableofcontents",toolbar_mode:"floating",tinycomments_mode:"embedded",tinycomments_author:"Author name"});const filter=document.querySelector("#filter-container"),grid=document.querySelector("#grid-container");function initialize(e){let t;t=e,updateDisplay(t)}function updateDisplay(e){if(0===e.length){const e=document.createElement("p");e.textContent="No projects to display!",grid.appendChild(e)}else{for(;grid.firstChild;)grid.removeChild(grid.firstChild);for(const t of e)fetchBlob(t);let t=finalTypes=[];for(project of e)t=t.concat(project.type.split(" ").join("").split(","));finalTypes=t.filter(((e,t,n)=>{if(n.indexOf(e)===t)return!0})),finalTypes.length>=2&&finalTypes.unshift("all");for(const e of finalTypes)showFilter(e)}}function showFilter(e){const t=document.createElement("button");t.setAttribute("id",`${e}`),t.setAttribute("class","btn"),"all"==e&&t.classList.add("active"),t.textContent=`${e.charAt(0).toUpperCase()+e.slice(1)}`,t.addEventListener("click",(()=>{porfolioFilter(e)})),filter.appendChild(t)}function porfolioFilter(e){const t=filter.querySelectorAll(".btn"),n=grid.querySelectorAll(".column");for(let n=0;n<t.length;n++)t[n].classList.remove("active"),t[n].id==e&&t[n].classList.add("active");if("all"==e)for(let t=0;t<n.length;t++)n[t].classList.contains(e)||n[t].classList.add("show");else for(let t=0;t<n.length;t++)n[t].classList.remove("show"),n[t].classList.contains(e)&&n[t].classList.add("show")}function fetchBlob(e){fetch("assets/portfolio/thp.jpg").then((e=>{if(!e.ok)throw new Error(`HTTP error: ${e.status}`);return e.blob()})).then((t=>{showProject(t,e)})).catch((e=>{console.error(`Fetch Problem: ${e.message}`)}))}function showProject(e,t){const n=URL.createObjectURL(e),o=document.createElement("div"),i=document.createElement("div"),l=document.createElement("div"),r=document.createElement("img"),c=document.createElement("h3"),s=document.createElement("button"),a=document.createElement("span"),d=document.createElementNS("http://www.w3.org/2000/svg","svg"),m=document.createElementNS("http://www.w3.org/2000/svg","path");o.setAttribute("class",`column show ${t.type}`),i.setAttribute("class","content"),l.setAttribute("class","overlay"),r.setAttribute("src",`${n}`),r.setAttribute("alt",`${t.name}`),c.textContent=`${t.name}`,s.setAttribute("class","btn"),a.textContent="Live Preview",d.setAttribute("viewBox","0 0 448 512"),m.setAttribute("d","M256 64C256 46.33 270.3 32 288 32H415.1C415.1 32 415.1 32 415.1 32C420.3 32 424.5 32.86 428.2 34.43C431.1 35.98 435.5 38.27 438.6 41.3C438.6 41.35 438.6 41.4 438.7 41.44C444.9 47.66 447.1 55.78 448 63.9C448 63.94 448 63.97 448 64V192C448 209.7 433.7 224 416 224C398.3 224 384 209.7 384 192V141.3L214.6 310.6C202.1 323.1 181.9 323.1 169.4 310.6C156.9 298.1 156.9 277.9 169.4 265.4L338.7 96H288C270.3 96 256 81.67 256 64V64zM0 128C0 92.65 28.65 64 64 64H160C177.7 64 192 78.33 192 96C192 113.7 177.7 128 160 128H64V416H352V320C352 302.3 366.3 288 384 288C401.7 288 416 302.3 416 320V416C416 451.3 387.3 480 352 480H64C28.65 480 0 451.3 0 416V128z"),s.addEventListener("click",(()=>{window.open(`${t.link}`)})),d.appendChild(m),s.appendChild(a),s.appendChild(d),l.appendChild(c),l.appendChild(s),i.appendChild(r),i.appendChild(l),o.appendChild(i);let p=grid.firstChild;null!=grid.firstChild?grid.insertBefore(o,p):grid.appendChild(o)}fetch("database/portfolios.json").then((e=>{if(!e.ok)throw new Error(`HTTP error: ${e.status}`);return e.json()})).then((e=>{initialize(e)})).catch((e=>{console.error(`Fetch problem: ${e.message}`)}));
//# sourceMappingURL=index.e7deef51.js.map
