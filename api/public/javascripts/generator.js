var Validator = require('./validation')

const clefs = ['treble', 'bass']
const keys = ['Cmaj/Am', 'Gmaj/Em','Dmaj/Bm', 'Amaj/F#m', 'Emaj/C#m', 'Bmaj/G#m', 'F#maj/D#m', 'C#maj/A#m',
            'Fmaj/Dm', 'Bbmaj/Gm', 'Ebmaj/Cm', 'Abmaj/Fm', 'Dbmaj/Bbm', 'Gbmaj/Ebm', 'Cbmaj/Abm']
const notes = ['A0', 'B0',
             'C1', 'D1', 'E1', 'F1', 'G1', 'A1', 'B1',
             'C2', 'D2', 'E2', 'F2', 'G2', 'A2', 'B2',
             'C3', 'D3', 'E3', 'F3', 'G3', 'A3', 'B3',
             'C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4',
             'C5', 'D5', 'E5', 'F5', 'G5', 'A5', 'B5',
             'C6', 'D6', 'E6', 'F6', 'G6', 'A6', 'B6',
             'C7', 'D7', 'E7', 'F7', 'G7', 'A7', 'B7',
             'C8']

var generate = function() {
    var newKey = keys[Math.floor(Math.random()*keys.length)]
    var newNote
    var newState = {
        clef: clefs[Math.floor(Math.random()*clefs.length)],
        key: newKey,
    }
    switch(newState.clef) {
        case 'bass':
            newNote = notes[Math.floor(Math.random()*13)+11] //E2 - C4
            break;
        case 'treble':
            newNote = notes[Math.floor(Math.random()*13)+23] //C4 - A5
            break;
    }
    newState.keyType = Validator.getKeyType(newKey)
    newState.numKeySegs = Validator.getNumKeySegs(newKey)
    newState.note = newNote
    newState.note_index = Validator.getNoteIndex(newNote)

    return newState
}

module.exports = generate