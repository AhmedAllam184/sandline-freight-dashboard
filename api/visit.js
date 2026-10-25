// Anonymous page-view logger. No IP, names, full UA, exact location or query strings.
module.exports = function visit(req, res) {
  res.setHeader('Cache-Control','no-store');
  if(req.method!=='POST'){res.setHeader('Allow','POST');return res.status(405).json({error:'Method not allowed'});}
  if(req.headers['dnt']==='1')return res.status(204).end();
  let body=req.body;
  try{if(typeof body==='string'){if(body.length>1000)throw Error();body=JSON.parse(body);}}catch{return res.status(400).json({error:'Invalid event'});}
  const pages=['home','overview','drivers','shipments','fleet','network','analytics'];
  if(!body||!pages.includes(body.page))return res.status(400).json({error:'Invalid page'});
  const ua=String(req.headers['user-agent']||'');
  const bot=/bot|crawler|spider|Headless|curl|python|wget|preview/i.test(ua);
  const device=/iPad|Tablet/i.test(ua)?'tablet':/Mobi|iPhone|Android/i.test(ua)?'mobile':'desktop';
  const browser=/Edg\//.test(ua)?'Edge':/Firefox|FxiOS/.test(ua)?'Firefox':/Chrome|CriOS/.test(ua)?'Chrome':/Safari/.test(ua)?'Safari':'Other';
  const referrer=typeof body.referrer==='string'&&/^[a-zA-Z0-9.-]{1,100}$/.test(body.referrer)?body.referrer:'';
  const rawCountry=String(req.headers['x-vercel-ip-country']||'');
  const country=/^[A-Z]{2}$/.test(rawCountry)?rawCountry:'Unknown';
  const row={source:'sandline-visitor',event:'pageview',time:new Date().toISOString(),page:body.page,country,device,browser,referrer,bot};
  console.info(JSON.stringify(row));
  return res.status(202).json({recorded:true});
};
