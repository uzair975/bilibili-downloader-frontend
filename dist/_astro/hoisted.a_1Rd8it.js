import"./hoisted.Bkgu4VUj.js";const L=document.getElementById("downloader-form"),l=document.getElementById("video-url-input"),M=document.getElementById("paste-btn"),c=document.getElementById("clear-btn"),r=document.getElementById("submit-btn"),u=r?.querySelector(".btn-text"),m=r?.querySelector(".btn-icon"),p=r?.querySelector(".spinner"),y=document.getElementById("form-error"),I=document.getElementById("error-message");l?.addEventListener("input",()=>{c&&(c.style.display=l.value?"flex":"none")});c?.addEventListener("click",()=>{l&&(l.value="",c.style.display="none",l.focus())});M?.addEventListener("click",async()=>{try{const e=await navigator.clipboard.readText();e&&l&&(l.value=e.trim(),c&&(c.style.display="flex"),l.focus())}catch(e){console.warn("Clipboard read failed",e)}});L?.addEventListener("submit",async e=>{e.preventDefault();const s=l?.value.trim();if(s){y&&(y.style.display="none"),r&&(r.disabled=!0),m&&(m.style.display="none"),p&&(p.style.display="inline-flex"),u&&(u.textContent="Resolving Streams...");try{const i=window.location.hostname==="localhost"||window.location.hostname==="127.0.0.1"?"http://127.0.0.1:8000/api/v1/resolve":"/api/v1/resolve",n=await fetch(i,{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify({url:s})}),o=await n.json();if(!n.ok||!o||o.success===!1){const a=o?.error||o?.detail||"Failed to extract video streams.";C(a);return}window.dispatchEvent(new CustomEvent("bili:resolved",{detail:o})),setTimeout(()=>{const a=document.getElementById("results-section");a&&a.scrollIntoView({behavior:"smooth",block:"start"})},100)}catch(i){console.error(i),C("Unable to connect to the extraction engine. Please ensure the backend is running.")}finally{r&&(r.disabled=!1),m&&(m.style.display="inline-flex"),p&&(p.style.display="none"),u&&(u.textContent="Download Now")}}});function C(e){y&&I&&(I.textContent=e,y.style.display="flex")}window.addEventListener("bili:resolved",e=>{const s=e.detail;s&&_(s)});function _(e){const s=document.getElementById("results-section");if(!s)return;const i=window.location.hostname==="localhost"||window.location.hostname==="127.0.0.1"?"http://127.0.0.1:8000":"";function n(t){return t?window.location.hostname!=="localhost"&&window.location.hostname!=="127.0.0.1"?t.replace(/^http:\/\/(127\.0\.0\.1|localhost):8000/,window.location.origin):t:""}const o=document.getElementById("res-thumbnail");o&&e.thumbnail&&(o.referrerPolicy="no-referrer",o.src=e.thumbnail,o.onerror=()=>{o.src.includes("/api/v1/download")||(o.src=n(`${i}/api/v1/download?url=${encodeURIComponent(e.thumbnail)}&type=image`))});const a=document.getElementById("res-duration");a&&(a.textContent=e.duration_formatted||"00:00");const b=document.getElementById("res-bvid");b&&(b.textContent=e.bvid||"");const w=document.getElementById("res-views-count");w&&(w.textContent=(e.views||0).toLocaleString());const B=document.getElementById("res-title");B&&(B.textContent=e.title||"Bilibili Video");const d=document.getElementById("res-avatar");d&&e.author_avatar&&(d.referrerPolicy="no-referrer",d.src=e.author_avatar,d.onerror=()=>{d.src.includes("/api/v1/download")||(d.src=`${i}/api/v1/download?url=${encodeURIComponent(e.author_avatar)}&type=image`)});const E=document.getElementById("res-author");E&&(E.textContent=e.author_name||"Creator");const f=document.getElementById("merged-streams-body");f&&(!e.merged||e.merged.length===0?f.innerHTML='<tr><td colspan="3" class="empty-cell">No merged streams available. Try the Video Only + Audio tabs instead.</td></tr>':f.innerHTML=e.merged.map(t=>`
          <tr>
            <td>
              <div class="quality-cell">
                <span class="quality-badge merged-badge">${t.quality}P</span>
                <strong>${t.label}</strong>
              </div>
            </td>
            <td>${t.size_formatted||"Auto"}</td>
            <td>
              <a href="${n(t.download_url)}" target="_blank" rel="noopener" class="btn-primary btn-sm">
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
                Download MP4
              </a>
            </td>
          </tr>
        `).join(""));const g=document.getElementById("video-streams-body");g&&(!e.videos||e.videos.length===0?g.innerHTML='<tr><td colspan="5" class="empty-cell">No video streams found.</td></tr>':g.innerHTML=e.videos.map(t=>`
          <tr>
            <td>
              <div class="quality-cell">
                <span class="quality-badge">${t.quality}P</span>
                <strong>${t.label}</strong>
              </div>
            </td>
            <td><span class="codec-tag">${t.codec}</span></td>
            <td>${t.fps} fps</td>
            <td>${t.size_formatted||"Auto"}</td>
            <td>
              <a href="${n(t.download_url)}" target="_blank" rel="noopener" class="btn-primary btn-sm">
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
                Download MP4
              </a>
            </td>
          </tr>
        `).join(""));const v=document.getElementById("audio-streams-body");v&&(!e.audios||e.audios.length===0?v.innerHTML='<tr><td colspan="5" class="empty-cell">No audio streams found.</td></tr>':v.innerHTML=e.audios.map(t=>`
          <tr>
            <td>
              <div class="quality-cell">
                <span class="quality-badge audio-badge">${t.bitrate}</span>
                <strong>${t.label}</strong>
              </div>
            </td>
            <td>${t.bitrate}</td>
            <td><span class="codec-tag">M4A / MP3</span></td>
            <td>${t.size_formatted||"Auto"}</td>
            <td>
              <a href="${n(t.download_url)}" target="_blank" rel="noopener" class="btn-primary btn-sm">
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
                Download Audio
              </a>
            </td>
          </tr>
        `).join(""));function x(t){return t?String(t).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;"):""}const k=document.getElementById("subs-container");if(k){let t="";e.danmaku_url&&(t+=`
          <div class="sub-item">
            <div class="sub-info">
              <span class="badge-tag">Interactive Comments</span>
              <h4>Danmaku Flying Comments (XML)</h4>
              <p class="sub-desc">Synchronized bullet comments compatible with Danmaku-capable media players.</p>
            </div>
            <a href="${n(e.danmaku_url)}" target="_blank" rel="noopener" class="btn-secondary">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
              Download XML
            </a>
          </div>
        `),e.subtitles&&e.subtitles.length>0&&e.subtitles.forEach(h=>{t+=`
            <div class="sub-item">
              <div class="sub-info">
                <span class="badge-tag">${x(h.lang)}</span>
                <h4>${x(h.label)} Subtitles</h4>
                <p class="sub-desc">Converted directly to standard SRT format for VLC and media players.</p>
              </div>
              <a href="${n(h.url)}" target="_blank" rel="noopener" class="btn-secondary">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
                Download SRT
              </a>
            </div>
          `}),t||(t='<p class="empty-cell">No subtitles or danmaku available for this video.</p>'),k.innerHTML=t}s.style.display="block"}const $=document.querySelectorAll(".tab-btn");$.forEach(e=>{e.addEventListener("click",()=>{$.forEach(n=>n.classList.remove("active")),document.querySelectorAll(".tab-panel").forEach(n=>n.classList.remove("active")),e.classList.add("active");const s=e.getAttribute("data-tab"),i=document.getElementById(s);i&&i.classList.add("active")})});document.getElementById("switch-to-dash-btn")?.addEventListener("click",()=>{const e=document.querySelector('.tab-btn[data-tab="tab-videos"]');e&&e.click()});
