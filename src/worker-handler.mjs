const SECURITY_HEADERS={
  'x-content-type-options':'nosniff',
  'x-frame-options':'DENY',
  'referrer-policy':'strict-origin-when-cross-origin',
  'permissions-policy':'camera=(), microphone=(), geolocation=(), payment=()',
  'content-security-policy':"default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; font-src 'self'; connect-src 'self'; object-src 'none'; base-uri 'self'; form-action 'none'; frame-ancestors 'none'"
};
export default {
  async fetch(request) {
    if(!['GET','HEAD'].includes(request.method))return new Response('Method not allowed',{status:405,headers:{...SECURITY_HEADERS,allow:'GET, HEAD'}});
    const url=new URL(request.url);
    let path;try{path=decodeURIComponent(url.pathname)}catch{return new Response('Bad request',{status:400,headers:SECURITY_HEADERS})}
    if(path.includes('\0')||path.split('/').some(part=>part==='..'||part==='.'))return new Response('Bad request',{status:400,headers:SECURITY_HEADERS});
    if(path==='/health')return Response.json({status:'ok',service:'nytrix-website'},{headers:{...SECURITY_HEADERS,'cache-control':'no-store'}});
    if(path==='/index.html')return new Response(null,{status:308,headers:{...SECURITY_HEADERS,location:'/'}});
    let file=FILES[path];
    if(!file){if(!path.endsWith('/')&&FILES[path+'/index.html'])return new Response(null,{status:308,headers:{...SECURITY_HEADERS,location:path+'/'}});file=FILES[(path.endsWith('/')?path:path+'/')+'index.html'];}
    const status=file?200:404;file??=FILES['/404.html'];
    const headers={...SECURITY_HEADERS,'content-type':file.type,'cache-control':file.type.startsWith('text/html')?'public, max-age=300':'public, max-age=3600',etag:file.etag};
    if(status===200&&request.headers.get('if-none-match')===file.etag)return new Response(null,{status:304,headers});
    return new Response(request.method==='HEAD'?null:file.body,{status,headers});
  }
};
