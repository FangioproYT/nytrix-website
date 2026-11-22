import {rm} from 'node:fs/promises';
// Keep the generated Worker source out of the public static assets.
await rm(new URL('../dist/worker.mjs',import.meta.url),{force:true});
console.log('Prepared static Cloudflare Pages output.');
