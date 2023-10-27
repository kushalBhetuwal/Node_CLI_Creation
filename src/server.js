import fs from "node:fs/promises";
import http from "node:http";
import open from "open";
import {getAllNotes} from './notes.js';
const notes = await getAllNotes();

const interpolate = (html,data)=>{
    return html.replace(/\{\{\s*(\w+)\s*\}\}/g, (match,placeholder)=>{
        return data[placeholder] || '';
    })
}



const formatNotes =(notes)=>{
   return notes.map(note=>{
        return `
        <div class ='note'>
        <p>${note.content}</p>
        <div class="tags">
        ${note.tags.map(tag=>`<span class='tag'>${tag}</span>`)}
        </div>
        </div>
        `
    }).join('')
}

const par  = formatNotes(notes);
console.log(typeof par)

const server = http.createServer(async (req,res)=>{
    const path = new URL('./template.html', import.meta.url);
    const template = await fs.readFile(path,'utf-8');
    const html = interpolate(template, {notes:formatNotes(notes)});
    res.writeHead(200, {'Content-Type':'text/html'});
    res.end(html);
})

server.listen(3000,()=>{
    console.log(`server listening at http://localhost:3000`)
})