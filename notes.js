const fs = require('fs')
const chalk = require('chalk')


const getNotes = () => "Your notes..."


const addNote = (title, body) => {
    const notes = loadNotes()

    const duplicateNotes = notes.filter((note) => {
        return note.title === title
    })

    if (duplicateNotes.length == 0) {
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
    removeNote: removeNote
}