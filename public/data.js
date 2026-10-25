/* Ahmed Allam. Entire operational dataset is synthetic, generated deterministically. */
window.SANDLINE=(()=>{
 const hubs={Jeddah:{code:'JED',ll:[39.186,21.490]},Riyadh:{code:'RUH',ll:[46.722,24.688]},Dammam:{code:'DMM',ll:[50.103,26.434]},Tabuk:{code:'TBK',ll:[36.572,28.400]},Madinah:{code:'MED',ll:[39.614,24.469]},'Ha’il':{code:'HAIL',ll:[41.691,27.522]},Buraydah:{code:'BUR',ll:[43.975,26.326]},'Ta’if':{code:'TIF',ll:[40.416,21.270]},Najran:{code:'NJR',ll:[44.128,17.493]}};
 const corridors=[{from:'Jeddah',to:'Riyadh',via:['Jeddah','Ta’if','Riyadh'],km:950,hours:11.67},{from:'Riyadh',to:'Dammam',via:['Riyadh','Dammam'],km:410,hours:4.75},{from:'Dammam',to:'Riyadh',via:['Dammam','Riyadh'],km:410,hours:5.67},{from:'Madinah',to:'Riyadh',via:['Madinah','Buraydah','Riyadh'],km:880,hours:10.5},{from:'Tabuk',to:'Riyadh',via:['Tabuk','Ha’il','Buraydah','Riyadh'],km:1290,hours:15.5},{from:'Jeddah',to:'Madinah',via:['Jeddah','Madinah'],km:420,hours:5.2},{from:'Najran',to:'Riyadh',via:['Najran','Riyadh'],km:950,hours:12.2},{from:'Riyadh',to:'Ha’il',via:['Riyadh','Buraydah','Ha’il'],km:640,hours:8.1},{from:'Dammam',to:'Buraydah',via:['Dammam','Riyadh','Buraydah'],km:740,hours:9.5}];
 const names=['Fahad Alharbi','Yousef Alqahtani','Omar Almutairi','Hassan Alshammari','Khalid Alotaibi','Nasser Aldossari','Saleh Alghamdi','Ali Alzahrani','Majed Alsaad'];
 const customers=['Najd Distribution','Eastgate Trading','Horizon Packaging','Palmway Industries','Red Sea Supply','Desertlink Retail','Summit Materials','Atlas Wholesale','Westline Foods'];
 const cargo=['General cargo','Packaged goods','Industrial supplies','Retail stock','Building materials','Consumer products'];
 const units=[214,87,306,...Array.from({length:117},(_,i)=>400+i)];
 const fleet=Array.from({length:120},(_,i)=>({unit:'FR-'+String(units[i]).padStart(3,'0'),driver:names[i%names.length],driverId:'D-'+String(27+i).padStart(3,'0'),hub:Object.keys(hubs)[i%9],status:i<86?'In transit':i<108?'Available':'Service',capacity:28,fuel:i===0?68:45+(i*13)%48,consumption:28.4+(i%8)*.6,odometer:76000+i*1823,nextService:i<108?(4500-(i*137)%3900)+' km':'In workshop'}));
 const time=min=>{const n=Math.round(min)%(24*60);return String(Math.floor(n/60)).padStart(2,'0')+':'+String(n%60).padStart(2,'0')};
 const active=fleet.slice(0,86).map((v,i)=>{const r=corridors[i%corridors.length],depart=i===0?360:420+(i*17)%280;return {id:'SL-'+(1048+i),unit:v.unit,route:i%corridors.length,from:r.from,to:r.to,date:'2026-10-21',customer:customers[i%9],cargo:cargo[i%6],weight:i===0?24:i===1?18:i===2?26:12+(i*7)%17,pallets:16+(i*5)%17,status:'In transit',late:false,loaded:time(depart-40),depart:time(depart),eta:i===0?'17:40':time(depart+r.hours*60),progress:[.56,.32,.72,.44,.27,.63,.35,.81,.49][i%9],speed:i%9===1?80:i===0?78:70+(i*3)%17,driver:v.driver,driverId:v.driverId,fuel:i===0?68:v.fuel,consumption:v.consumption,duration:r.hours,km:r.km};});
 active.forEach(s=>{const minutes=s.progress*s.km/s.speed*60;s.depart=time(820-minutes);s.loaded=time(780-minutes);s.eta=time(820+(1-s.progress)*s.km/s.speed*60);s.duration=s.km/s.speed;});
 const delivered=[];const daily=[];
 for(let day=1;day<=21;day++){const count=day===21?142:108+(day*13)%43;const late=day===21?8:5+(day%7);daily.push({day,date:'2026-10-'+String(day).padStart(2,'0'),count,late});for(let i=0;i<count;i++){const r=corridors[(i+day)%corridors.length];delivered.push({id:'SL-'+(2000+day*200+i),unit:fleet[(i+day)%108].unit,route:(i+day)%corridors.length,from:r.from,to:r.to,date:'2026-10-'+String(day).padStart(2,'0'),customer:customers[i%9],cargo:cargo[i%6],weight:12+(i*7+day)%17,pallets:16+(i*5)%17,status:'Delivered',late:i<late,eta:time(600+(i*11)%600),km:r.km,duration:r.hours});}}
 const periodDays={today:21,week:15,month:1};
 function deliveries(period){return delivered.filter(s=>Number(s.date.slice(-2))>=periodDays[period]);}
 function records(period,drafts=[]){return [...active,...drafts,...deliveries(period).slice().reverse()];}
 function metrics(period){const d=deliveries(period),late=d.filter(s=>s.late).length;return {active:86,fleet:120,available:22,service:12,delivered:d.length,onTime:d.length-late,late,rate:(d.length-late)/d.length*100,tonnes:d.reduce((a,s)=>a+s.weight,0),km:d.reduce((a,s)=>a+s.km,0)};}

 // All driver profiles and event thresholds are fictional demonstration fixtures.
 const surnames=['Alharbi','Alqahtani','Almutairi','Alshammari','Alotaibi','Aldossari','Alghamdi','Alzahrani','Alsaad','Almansour','Alshehri','Alrashid','Alsubaie','Alamri'];
 const first=['Fahad','Yousef','Omar','Hassan','Khalid','Nasser','Saleh','Ali','Majed'];
 const drivers=fleet.map((v,i)=>({id:v.driverId,name:first[i%9]+' '+surnames[Math.floor(i/9)],unit:v.unit,hub:v.hub,status:i<86?'On duty':i<108?'Resting':'Training',consumption:v.consumption}));
 fleet.forEach((v,i)=>v.driver=drivers[i].name);active.forEach((v,i)=>v.driver=drivers[i].name);
 const trips=delivered.map(s=>({...s,driverId:fleet.find(v=>v.unit===s.unit).driverId}));
 const violations=Array.from({length:126},(_,i)=>({id:'EV-'+String(i+1).padStart(3,'0'),driverId:drivers[(i*17+3)%108].id,date:'2026-10-'+String(1+(i*5)%21).padStart(2,'0'),time:time(480+(i*23)%600),type:['Speeding','Harsh braking','Rest-break flag'][i%3],detail:[(83+i%12)+' km/h · demo limit 80 km/h','Deceleration above demo threshold 3.5 m/s²','Continuous driving above demo threshold 4 hours'][i%3],status:i%4===0?'Open':'Reviewed'}));
 function driverMetrics(period,hub='all'){
  const roster=drivers.filter(d=>hub==='all'||d.hub===hub),ids=new Set(roster.map(d=>d.id)),start=periodDays[period];
  const events=violations.filter(e=>ids.has(e.driverId)&&Number(e.date.slice(-2))>=start);
  const completed=trips.filter(t=>ids.has(t.driverId)&&Number(t.date.slice(-2))>=start);
  return {roster,events,completed,clean:roster.filter(d=>!events.some(e=>e.driverId===d.id)).length,open:events.filter(e=>e.status==='Open').length,rate:completed.length?100*completed.filter(t=>!t.late).length/completed.length:0};
 }
 function advance(progress,speed,km,elapsedMs){return Math.min(1,progress+Math.max(0,speed)*Math.max(0,elapsedMs)/3600000/km)}
 function dispatchWatch(){return {lowFuel:active.filter(s=>s.fuel<50),arriving:active.filter(s=>(1-s.progress)*s.km/s.speed<=2),openReviews:driverMetrics('today').open};}
 return {dispatchWatch,drivers,violations,trips,driverMetrics,advance,hubs,corridors,fleet,active,delivered,daily,customers,cargo,metrics,records,deliveries,time};
})();
