import yargs, { positional } from 'yargs'
import { hideBin } from 'yargs/helpers'

yargs(hideBin(process.argv))
  .command("new <note>", "fetch the content of the app kushal", yargs=>{
    return yargs.positional('note',{
      type:'string',
      description:'the content of the note to create',
    })
  }, (argv)=>console.log(argv))
   .option('t', {
    alias:'t',
    type:'string',
    description:'tags to add the note'
   })
   .command('all', "get all notes", ()=>{}, (arg)=>{

   })
   .command("find <filter>", "get the matching notes", (yargs)=>{
    return yargs.positional('filter',{
      describe:"The search term to filter notes will be applied to note.content",
      type:'string',
    })
   }, (argv)=>{

   })
   .command('remove <id>', "remove a note by id", yargs=>{
    return yargs.positional('id',{
      describe:"the id that you want to remove",
      type:'number'
    })
   }, argv=>{

   })
   .command('web [port]', "launch a website to see notes", (yargs)=>{
    return positional('port', {
      describe:'port to bind on',
      type:'number',
      default:5000
    })
   }, argv=>{

   })
   .command('clean', 'remove all notes', (yargs)=>{
    return yargs.positional('clean', {
      describe:"Clean all notes",
      type:'string'
    })
   }, argv=>{

   })
  .demandCommand(1)
  .parse()// you can execute now: