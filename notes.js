const fs = require("fs");
const chalk = require("chalk");

const getNotes = () => {
  return "Get notes...";
};

const getNoteByTitle = (title) => {
  const notes = loadNotes();
  const result = notes.find((note) => note.title === title);
  return result;
};

const listNotes = () => {
  const notes = loadNotes();
  console.log(chalk.black.bgGreenBright("Your notes: \n"));
  notes.forEach((note) => {
    console.log(chalk.magentaBright(note.title));
  });
};

const addNote = function (title, body) {
  const notes = loadNotes();
  const duplicateNotes = notes.find((note) => note.title === title);
  if (!duplicateNotes) {
    notes.push({
      title: title,
      body: body,
    });
    saveNotes(notes);
    console.log(chalk.black.bgGreenBright("NOTE ADDED."));
  } else {
    console.log(chalk.black.bgRedBright("NOTE TITLE TAKEN."));
  }
  console.log(notes);
};

const removeNote = function (title) {
  const notes = loadNotes();
  const notesToKeep = notes.filter((note) => note.title !== title);
  if (notes.length > notesToKeep.length) {
    saveNotes(filteredNotes);
    console.log(chalk.black.bgGreenBright("NOTE REMOVED."));
  } else {
    console.log(chalk.black.bgRedBright("NOTE NOT FOUND.NO NOTE WAS REMOVED."));
  }
};

const saveNotes = function (notesArr) {
  const data = JSON.stringify(notesArr);
  fs.writeFileSync("notes.json", data);
};

const loadNotes = function () {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJson = dataBuffer.toString();
    return JSON.parse(dataJson);
  } catch (e) {
    console.log(chalk.black.bgRedBright("File does not exist"), e);
    return [];
  }
};

module.exports = {
  listNotes: listNotes,
  getNotes: getNotes,
  addNotes: addNote,
  removeNote: removeNote,
  getNoteByTitle: getNoteByTitle,
};
