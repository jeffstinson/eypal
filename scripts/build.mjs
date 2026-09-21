import { cp, mkdir, rm, copyFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = process.cwd();
const dist = resolve(root, 'dist');

await rm(dist, { recursive: true, force: true });
await mkdir(dist, { recursive: true });

for (const file of ['index.html', 'sport.html', 'robots.txt']) {
  await copyFile(resolve(root, file), resolve(dist, file));
}

await cp(resolve(root, 'assets'), resolve(dist, 'assets'), { recursive: true });

console.log('EPYAL static site built into dist/');
