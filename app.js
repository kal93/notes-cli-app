const notes = require("./notes");
const yargs = require("yargs");
const chalk = require("chalk");

const command = process.argv[2];

// if (command === "add") {
//   console.log("Adding note...");
// } else if (command === "remove") {
//   console.log("Removing note...");
// }

//Create
yargs.command({
  command: "add",
  describe: "Add a new note",
  builder: {
    title: {
      describe: "Title of the note",
      demandOption: true,
      type: "string",
    },
    body: {
      describe: "Body",
      demandOption: true,
      type: "string",
    },
  },
  handler: function (argv) {
    console.log(
      `Adding new note with title: ${chalk.bold.magentaBright(argv.title)}`
    );
    console.log(`Body: ${chalk.bold.magentaBright(argv.body)}`);
    notes.addNotes(argv.title, argv.body);
  },
});

// Remove
yargs.command({
  command: "remove",
  describe: "Remove a note",
  builder: {
    title: {
      describe: "Title of the note to be deleted",
      type: "string",
      demandOption: true,
    },
  },
  handler: function (argv) {
    console.log("Removing a note...");
    notes.removeNote(argv.title);
  },
});

// Read
yargs.command({
  command: "read",
  describe: "Read a note",
  builder: {
    title: {
      type: "string",
      demandOption: true,
      describe: "Title of the note to look for",
    },
  },
  handler: function (argv) {
    const note = notes.getNoteByTitle(argv.title);
    if (note) {
      console.log(note.title);
      console.log(note.body);
    } else {
      console.log(chalk.black.bgRedBright("NOTE DOES NOT EXIST."));
    }
  },
});

// List
yargs.command({
  command: "list",
  describe: "List all notes",
  handler: function () {
    console.log("Listing all notes...");
    notes.listNotes();
  },
});

// add, remove, read, list notes

yargs.parse();
// console.log(yargs.argv);
