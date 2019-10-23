const fs = require('fs')
const chalk = require('chalk')


const getNotes = () => "Your notes..."


const addNote = (title, body) => {
    const notes = loadNotes()

    const duplicatedNote = notes.find((note) => note.title === title)

    if (!duplicatedNote) {
        notes.push({
            title: title,
            body: body
        })


        saveNotes(notes)
        console.log(chalk.green('Note added successfully'))
    } else {
        console.log(chalk.red('Note title already exists'))

    }
}

const removeNote = (title) => {
    const currentNotes = loadNotes()
    const newNotes = currentNotes.filter((note) => {
        return note.title !== title
    })

    if (currentNotes === newNotes) {
        console.log(chalk.red('There is no such note to be removed'))
    } else {
        saveNotes(newNotes)
        console.log(chalk.green('Note removed successfully'))
    }

}

const listNotes = () => {
    const notesToList = loadNotes()
    console.log(chalk.blue('Your Notes'))
    console.log(chalk.green('==============================================='))

    notesToList.forEach( (note) => {
        console.log(note.title)

    })
    console.log(chalk.green('==============================================='))
}

const readNote = (title) => {
    const notes = loadNotes()
    const noteToRead = notes.find((note) => note.title === title)
    if(noteToRead) {
        console.log(chalk.blue(noteToRead.title))
        console.log(chalk.green(noteToRead.body))
}
    else {
        console.log(chalk.red('Note not found'))
    }
}

const loadNotes = () => {
    try {
        return JSON.parse(fs.readFileSync('notes.json'))
    } catch (error) {
        return []
    }

}



const saveNotes = (notes) => {
    fs.writeFileSync('notes.json', JSON.stringify(notes))
}



module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}