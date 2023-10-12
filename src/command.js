import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { newNote, removeAllNotes, getAllNotes, findNotes, removeNotes} from "./notes.js";
import {listNotes} from './utils.js'


yargs(hideBin(process.argv))
  .command(
    "new <note>",
    "fetch the content of the app kushal",
    (yargs) => {
      return yargs.positional("note", {
        type: "string",
        description: "the content of the note to create",
      });
    },
    async (argv) => {
      const tags = argv.tags ? argv.tags.split(','): []
      const notes = await newNote(argv.note, tags)
      console.log('new note:', notes);
    }
  )
  .option("tags", {
    alias: "t",
    type: "string",
    description: "tags to add the note",
  })
  .command(
    "all",
    "get all notes",
    () => {},
    async (argv) => {
      const notes =await getAllNotes();
      listNotes(notes);
    },
  )
  .command(
    "find <filter>",
    "get the matching notes",
    (yargs) => {
      return yargs.positional("filter", {
        describe:
          "The search term to filter notes will be applied to note.content",
        type: "string",
      });
    },
    async (argv) => {
      const data = await findNotes(argv.filter)
      listNotes(data)
    },
  )
  .command(
    "remove <id>",
    "remove a note by id",
    (yargs) => {
      return yargs.positional("id", {
        describe: "the id that you want to remove",
        type: "number",
      });
    },
    async (argv) => {
      const data = await removeNotes(argv.id)
      console.log(data);
    },
  )
  .command(
    "web [port]",
    "launch a website to see notes",
    (yargs) => {
      return positional("port", {
        describe: "port to bind on",
        type: "number",
        default: 5000,
      });
    },
    (argv) => {},
  )
  .command(
    "clean",
    "remove all notes",
    (yargs) => {
      return yargs.positional("clean", {
        describe: "Clean all notes",
        type: "string",
      });
    },
    async (argv) => {
      await removeAllNotes();
      console.log("database has been reset")
    },
  )
  .demandCommand(1)
  .parse(); // you can execute now:
