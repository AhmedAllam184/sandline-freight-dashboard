/* Ahmed Allam: accessible, directly selectable phone navigation. */
(()=>{'use strict';
const wrap=document.createElement('div');wrap.className='mobile-page-switch';
wrap.innerHTML='<label for="mobile-page-select" class="sr-only">Choose dashboard page</label><select id="mobile-page-select"><option value="overview">Overview</option><option value="shipments">Shipments</option><option value="fleet">Fleet</option><option value="network">Route network</option><option value="analytics">Performance</option><option value="drivers">Driver KPIs</option></select>';
document.querySelector('.sidebar nav').after(wrap);
const select=wrap.querySelector('select');select.value=location.hash.slice(1)||'overview';
select.addEventListener('change',()=>window.SANDLINE_APP.navigate(select.value));
document.addEventListener('sandline:navigate',e=>{select.value=e.detail;});
})();
