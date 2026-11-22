import {createServer} from 'node:http';
import worker from '../dist/worker.mjs';
const server=createServer(async(req,res)=>{try{const response=await worker.fetch(new Request(`http://127.0.0.1:4178${req.url}`,{method:req.method}));res.writeHead(response.status,Object.fromEntries(response.headers));res.end(Buffer.from(await response.arrayBuffer()));}catch{res.writeHead(500);res.end('Preview failed')}});
server.listen(4178,'127.0.0.1',()=>console.log('Local: http://127.0.0.1:4178'));
