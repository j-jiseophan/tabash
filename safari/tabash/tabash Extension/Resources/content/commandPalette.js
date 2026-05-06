var d=Object.defineProperty;var h=(n,t,e)=>t in n?d(n,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):n[t]=e;var s=(n,t,e)=>h(n,typeof t!="symbol"?t+"":t,e);const l=globalThis,i=l.browser??l.chrome??null,r="links";class p{constructor(){s(this,"overlay",null);s(this,"input",null);s(this,"list",null);s(this,"links",[]);s(this,"selectedIndex",0);s(this,"filteredLinks",[]);this.init()}async init(){await this.loadLinks(),this.setupKeyboardShortcut(),this.setupMessageListener()}setupMessageListener(){i==null||i.runtime.onMessage.addListener(t=>{t.action==="toggle-palette"&&this.toggle()})}async loadLinks(){var t;try{if(!((t=i==null?void 0:i.storage)!=null&&t.local))throw new Error("WebExtension storage is unavailable");const e=await i.storage.local.get(r);this.links=e[r]||[]}catch{const e=localStorage.getItem(r);this.links=e?JSON.parse(e):[]}}setupKeyboardShortcut(){document.addEventListener("keydown",t=>{(t.metaKey||t.ctrlKey)&&t.shiftKey&&t.key.toLowerCase()==="l"&&(t.preventDefault(),t.stopPropagation(),this.toggle())})}toggle(){this.overlay?this.close():this.open()}async open(){var t;await this.loadLinks(),this.createOverlay(),this.filteredLinks=[...this.links],this.selectedIndex=0,this.renderList(),(t=this.input)==null||t.focus()}close(){this.overlay&&(this.overlay.remove(),this.overlay=null,this.input=null,this.list=null)}createOverlay(){var t,e;this.overlay=document.createElement("div"),this.overlay.id="tabash-command-palette-overlay",this.overlay.innerHTML=`
      <style>
        @keyframes tabash-fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes tabash-scale-in {
          from { opacity: 0; transform: scale(0.98) translateY(-8px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        #tabash-command-palette-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          padding-top: 12vh;
          z-index: 2147483647;
          font-family: -apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", sans-serif;
          animation: tabash-fade-in 0.12s ease-out;
        }
        #tabash-command-palette {
          width: 640px;
          max-width: 90vw;
          max-height: 480px;
          background: linear-gradient(135deg, rgba(30, 30, 32, 0.98) 0%, rgba(24, 24, 26, 0.98) 100%);
          border-radius: 12px;
          box-shadow:
            0 0 0 1px rgba(255, 255, 255, 0.08),
            0 8px 40px rgba(0, 0, 0, 0.6),
            0 0 80px rgba(255, 90, 95, 0.08);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          animation: tabash-scale-in 0.15s cubic-bezier(0.2, 0, 0, 1);
        }
        .tabash-search-container {
          display: flex;
          align-items: center;
          padding: 14px 16px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          gap: 12px;
        }
        .tabash-search-icon {
          width: 18px;
          height: 18px;
          opacity: 0.4;
        }
        #tabash-palette-input {
          flex: 1;
          padding: 0;
          font-size: 15px;
          font-weight: 400;
          background: transparent;
          border: none;
          color: #ffffff;
          outline: none;
          font-family: inherit;
          box-sizing: border-box;
        }
        #tabash-palette-input::placeholder {
          color: rgba(255, 255, 255, 0.35);
        }
        #tabash-palette-list {
          overflow-y: auto;
          flex: 1;
          padding: 8px;
        }
        #tabash-palette-list::-webkit-scrollbar {
          width: 6px;
        }
        #tabash-palette-list::-webkit-scrollbar-track {
          background: transparent;
        }
        #tabash-palette-list::-webkit-scrollbar-thumb {
          background-color: rgba(255, 255, 255, 0.1);
          border-radius: 3px;
        }
        .tabash-palette-item {
          padding: 10px 12px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 12px;
          color: rgba(255, 255, 255, 0.9);
          border-radius: 8px;
          margin: 2px 0;
          transition: all 0.1s ease;
        }
        .tabash-palette-item.selected {
          background: linear-gradient(135deg, rgba(255, 90, 95, 0.2) 0%, rgba(255, 90, 95, 0.1) 100%);
          box-shadow: 0 0 0 1px rgba(255, 90, 95, 0.3);
        }
        .tabash-item-icon {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          flex-shrink: 0;
        }
        .tabash-item-content {
          flex: 1;
          min-width: 0;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .tabash-item-name {
          font-size: 14px;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.95);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .tabash-item-url {
          font-size: 12px;
          color: rgba(255, 255, 255, 0.4);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .tabash-item-shortcut {
          display: flex;
          gap: 4px;
          flex-shrink: 0;
        }
        .tabash-kbd {
          padding: 3px 6px;
          font-size: 11px;
          font-family: inherit;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 4px;
          color: rgba(255, 255, 255, 0.5);
        }
        .tabash-palette-empty {
          padding: 40px 20px;
          text-align: center;
          color: rgba(255, 255, 255, 0.35);
          font-size: 14px;
        }
        .tabash-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 16px;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          font-size: 12px;
          color: rgba(255, 255, 255, 0.35);
        }
        .tabash-footer-actions {
          display: flex;
          gap: 16px;
        }
        .tabash-footer-action {
          display: flex;
          align-items: center;
          gap: 6px;
        }
      </style>
      <div id="tabash-command-palette">
        <div class="tabash-search-container">
          <svg class="tabash-search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.35-4.35"></path>
          </svg>
          <input
            id="tabash-palette-input"
            type="text"
            placeholder="Search links..."
            autocomplete="off"
          />
        </div>
        <div id="tabash-palette-list"></div>
        <div class="tabash-footer">
          <span>tabash</span>
          <div class="tabash-footer-actions">
            <div class="tabash-footer-action">
              <span class="tabash-kbd">↵</span>
              <span>Open</span>
            </div>
            <div class="tabash-footer-action">
              <span class="tabash-kbd">esc</span>
              <span>Close</span>
            </div>
          </div>
        </div>
      </div>
    `,this.overlay.addEventListener("click",a=>{a.target===this.overlay&&this.close()}),document.body.appendChild(this.overlay),this.input=this.overlay.querySelector("#tabash-palette-input"),this.list=this.overlay.querySelector("#tabash-palette-list"),(t=this.input)==null||t.addEventListener("input",()=>this.onInputChange()),(e=this.input)==null||e.addEventListener("keydown",a=>this.onKeyDown(a))}onInputChange(){var e;const t=((e=this.input)==null?void 0:e.value.toLowerCase())||"";this.filteredLinks=this.links.filter(a=>a.name.toLowerCase().includes(t)),this.selectedIndex=0,this.renderList()}onKeyDown(t){if(t.key==="Escape"){t.preventDefault(),this.close();return}if(t.key==="ArrowDown"){t.preventDefault(),this.selectedIndex=Math.min(this.selectedIndex+1,this.filteredLinks.length-1),this.renderList();return}if(t.key==="ArrowUp"){t.preventDefault(),this.selectedIndex=Math.max(this.selectedIndex-1,0),this.renderList();return}if(t.key==="Enter"&&!t.isComposing&&this.filteredLinks.length>0){t.preventDefault(),this.goToLink(this.filteredLinks[this.selectedIndex]);return}}renderList(){if(!this.list)return;if(this.filteredLinks.length===0){this.list.innerHTML='<div class="tabash-palette-empty">No links found</div>';return}this.list.innerHTML=this.filteredLinks.map((e,a)=>`
        <div class="tabash-palette-item ${a===this.selectedIndex?"selected":""}" data-index="${a}">
          <div class="tabash-item-content">
            <span class="tabash-item-name">${this.escapeHtml(e.name)}</span>
            <span class="tabash-item-url">${this.escapeHtml(e.url)}</span>
          </div>
        </div>
      `).join(""),this.list.querySelectorAll(".tabash-palette-item").forEach(e=>{e.addEventListener("click",a=>{a.stopPropagation();const o=parseInt(e.getAttribute("data-index")||"0",10);this.goToLink(this.filteredLinks[o])}),e.addEventListener("mouseenter",()=>{const a=parseInt(e.getAttribute("data-index")||"0",10);this.selectedIndex=a,this.updateSelection()})});const t=this.list.children[this.selectedIndex];t==null||t.scrollIntoView({block:"nearest"})}updateSelection(){this.list&&this.list.querySelectorAll(".tabash-palette-item").forEach((t,e)=>{e===this.selectedIndex?t.classList.add("selected"):t.classList.remove("selected")})}escapeHtml(t){const e=document.createElement("div");return e.textContent=t,e.innerHTML}goToLink(t){this.close();const e=t.url.startsWith("http")?t.url:`https://${t.url}`;window.location.href=e}}new p;
