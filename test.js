import { read } from 'node:fs';
import fs from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const readJson = async () => {
  const jsonpath = fileURLToPath(new URL('./package.json', import.meta.url));
  console.log(JSON.parse(await fs.readFile(jsonpath, 'utf-8')));
};

readJson();
const writeFile = async()=>{
    const jsonpath = fileURLToPath(new URL('./demo.js', import.meta.url));
    await fs.writeFile(jsonpath, `console.log('hello')`);
}

writeFile();
