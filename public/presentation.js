/* Ahmed Allam. Editable presentation export of deterministic synthetic fixtures. */
(function(root){'use strict';
const periods={today:'21 October 2026',week:'15–21 October 2026',month:'1–21 October 2026'};
function build(Pptx,D,period,selected=0){
 if(!periods[period])throw Error('Invalid reporting period');
 const pptx=new Pptx();pptx.layout='LAYOUT_WIDE';pptx.author='Ahmed Allam';pptx.company='Sandline Freight (fictional)';pptx.subject='Synthetic fleet operations snapshot';pptx.title='Sandline Freight — '+periods[period];pptx.lang='en-US';
 pptx.theme={headFontFace:'Aptos Display',bodyFontFace:'Aptos',lang:'en-US'};
 const m=D.metrics(period),d=D.driverMetrics(period),trip=D.active[selected]||D.active[0];
 const colors={bg:'0C1520',fg:'F4F1E9',muted:'B4C1CB',gold:'DFBD76',green:'81CBBB',red:'E6A0A0'};
 function text(s,t,x,y,w,h,size=20,color=colors.fg,bold=false){s.addText(String(t),{x,y,w,h,fontSize:size,color,bold,margin:0,breakLine:false,fontFace:'Aptos',valign:'mid'});}
 function slide(title,sub){const s=pptx.addSlide();s.background={color:colors.bg};text(s,title,.6,.45,12.1,.6,30,colors.fg,true);text(s,sub,.6,1.12,12.1,.4,15,colors.muted);text(s,'SANDLINE FREIGHT  ·  Synthetic records  ·  '+periods[period],.6,7.02,11,.2,10,colors.muted);s.addNotes('Author: Ahmed Allam. Source: bundled Sandline synthetic fixtures. Reporting date is fixed at 21 October 2026. No live GPS, real personnel or confidential business data. Period totals cover all hubs; UI hub/search filters are not applied to this presentation.');return s;}
 let s=slide('Fleet operations','Reporting period: '+periods[period]+'  |  All hubs');
 [[m.active,'Trucks on the road'],[m.delivered.toLocaleString('en-US'),'Completed deliveries'],[m.rate.toFixed(1)+'%','On-time delivery'],[m.tonnes.toLocaleString('en-US')+' t','Delivered freight']].forEach(([v,label],i)=>{const x=.6+i*3.12;text(s,v,x,2.15,2.9,.8,39,colors.gold,true);text(s,label,x,3.05,2.9,.6,17);});
 text(s,'86 in transit  ·  22 ready  ·  12 in service',.6,4.45,11.9,.5,24);
 text(s,'Fleet availability is a current snapshot. Delivery results follow the selected reporting period.',.6,5.25,11.9,.8,19,colors.muted);
 s=slide('Delivery activity','Completed shipments and late deliveries · 15–21 October 2026');
 const days=D.daily.slice(-7);s.addChart(pptx.ChartType.bar,[{name:'Delivered',labels:days.map(x=>x.date.slice(5)),values:days.map(x=>x.count)},{name:'Late',labels:days.map(x=>x.date.slice(5)),values:days.map(x=>x.late)}],{x:.6,y:1.9,w:11.9,h:4.65,catAxisLabelColor:colors.fg,valAxisLabelColor:colors.muted,showLegend:true,legendColor:colors.fg,legendPos:'b',showTitle:false,showValue:false,showCatName:false,chartColors:[colors.gold,colors.red],showBorder:false,showCatName:false,showCatName:false,catAxisLabelFontSize:13,valAxisLabelFontSize:12,valGridLine:{color:'33424F',width:.5},catAxisLineColor:'33424F',valAxisLineColor:'33424F',showCatName:false});
 s=slide('Driver performance','Selected period · '+periods[period]+'  |  120 fictional profiles');
 [[d.clean,'Without recorded events'],[d.events.length,'Safety events'],[d.open,'Open for review']].forEach(([v,label],i)=>{const x=.6+i*4.15;text(s,v,x,1.9,3.8,.75,38,colors.gold,true);text(s,label,x,2.75,3.8,.55,18);});
 const types=['Speeding','Harsh braking','Rest-break flag'];s.addTable([['Event type','Count'],...types.map(t=>[t,String(d.events.filter(e=>e.type===t).length)])],{x:.6,y:3.7,w:11.9,h:2.2,colW:[9.5,2.4],border:{type:'solid',pt:.6,color:'33424F'},color:colors.fg,fill:colors.bg,fontSize:20,margin:10,rowH:.55,bold:false});
 text(s,'Illustrative coaching flags. Review the event and context before taking action.',.6,6.3,11.9,.35,15,colors.muted);
 s=slide('Selected shipment: '+trip.id,trip.unit+'  |  '+trip.from+' → '+trip.to);
 text(s,trip.from,.6,1.95,5.6,.7,34,colors.gold,true);text(s,'→',6.1,1.95,1,.7,34);text(s,trip.to,7.1,1.95,5.6,.7,34,colors.gold,true);
 s.addTable([['Vehicle','Driver','Payload','Fuel','Planned arrival'],[trip.unit,trip.driver,trip.weight+' tonnes',trip.fuel+'%',trip.eta+' AST']],{x:.6,y:3.2,w:11.9,h:1.6,colW:[1.7,3.3,2.2,1.7,3],border:{type:'solid',pt:.6,color:'33424F'},color:colors.fg,fill:colors.bg,fontSize:18,margin:10,rowH:.8});
 text(s,'Planned distance: '+trip.km.toLocaleString('en-US')+' km  ·  Simulated speed: '+trip.speed+' km/h',.6,5.25,11.9,.5,23);
 text(s,'Illustrative route and synthetic telemetry. The report uses the selected shipment’s fixture snapshot.',.6,6.1,11.9,.6,16,colors.muted);
 return pptx;
}
if(typeof module!=='undefined'&&module.exports)module.exports={build,periods};
if(!root.document)return;
root.SANDLINE_PRESENTATION={build};
const button=document.createElement('button');button.id='presentation-export';button.className='secondary-button';button.type='button';button.innerHTML='<i data-lucide="presentation" aria-hidden="true"></i><span class="presentation-label">Presentation</span>';document.querySelector('.top-actions').append(button);
const dialog=document.createElement('dialog');dialog.id='presentation-dialog';dialog.innerHTML='<div class="dialog-heading"><h2 id="presentation-title">Create a presentation</h2><button class="icon-button" id="presentation-close" aria-label="Close presentation">×</button></div><p id="presentation-summary" class="dialog-intro"></p><ol class="presentation-outline"><li>Fleet operations</li><li>Delivery activity</li><li>Driver performance</li><li>Selected shipment</li></ol><p id="presentation-scope" class="microcopy">Four editable PowerPoint slides in English. Period totals cover all hubs. Generated in your browser.</p><p id="presentation-status" role="status"></p><div class="dialog-actions"><button class="primary-button" id="presentation-download">Download PowerPoint</button></div>';document.body.append(dialog);
let reportPeriod='today',selected=0;
function labels(){const ar=document.documentElement.lang==='ar';button.setAttribute('aria-label',ar?'تنزيل عرض PowerPoint':'Download PowerPoint presentation');button.querySelector('span').textContent=ar?'عرض تقديمي':'Presentation';document.querySelector('#presentation-title').textContent=ar?'إنشاء عرض تقديمي':'Create a presentation';document.querySelector('#presentation-download').textContent=ar?'تنزيل PowerPoint':'Download PowerPoint';document.querySelector('#presentation-scope').textContent=ar?'أربع شرائح قابلة للتعديل بالإنجليزية. الإجماليات تشمل كل المراكز. يتم إنشاء الملف داخل المتصفح.':'Four editable PowerPoint slides in English. Period totals cover all hubs. Generated in your browser.';}
new MutationObserver(labels).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});labels();root.lucide?.createIcons();
button.addEventListener('click',()=>{reportPeriod=document.querySelector('[data-period][aria-pressed="true"]')?.dataset.period||'today';selected=root.SANDLINE_APP.getSelected();document.querySelector('#presentation-summary').textContent=periods[reportPeriod]+' · '+root.SANDLINE.metrics(reportPeriod).delivered.toLocaleString('en-US')+' deliveries · '+root.SANDLINE.active[selected].id;document.querySelector('#presentation-status').textContent='';dialog.showModal();});document.querySelector('#presentation-close').addEventListener('click',()=>dialog.close());
let library;
function loadLibrary(){return library||(library=new Promise((resolve,reject)=>{const script=document.createElement('script');script.src='/assets/pptxgen.bundle.js';script.onload=resolve;script.onerror=()=>{library=null;reject(Error('Presentation library could not load. Please try again.'));};document.head.append(script);}));}
document.querySelector('#presentation-download').addEventListener('click',async()=>{const b=document.querySelector('#presentation-download'),status=document.querySelector('#presentation-status');b.disabled=true;status.textContent='Creating presentation…';try{await loadLibrary();await build(root.PptxGenJS,root.SANDLINE,reportPeriod,selected).writeFile({fileName:'Sandline-Freight-'+reportPeriod+'.pptx'});status.textContent='Presentation downloaded.';}catch(e){status.textContent=e.message||'Could not create the presentation. Please try again.';}finally{b.disabled=false;}});
})(typeof window!=='undefined'?window:globalThis);
