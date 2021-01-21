//map of flatkeys with corresponding number of flats
const flats = new Map()
flats.set('Fmaj/Dm', 1)
flats.set('Bbmaj/Gm', 2)
flats.set('Ebmaj/Cm', 3)
flats.set('Abmaj/Fm', 4)
flats.set('Dbmaj/Bbm', 5)
flats.set('Gbmaj/Ebm', 6)
flats.set('Cbmaj/Abm', 7)

//map of sharp keys with correspinding number of sharps
const sharps = new Map()
sharps.set('Gmaj/Em', 1)
sharps.set('Dmaj/Bm', 2)
sharps.set('Amaj/F#m', 3)
sharps.set('Emaj/C#m', 4)
sharps.set('Bmaj/G#m', 5)
sharps.set('F#maj/D#m', 6)
sharps.set('C#maj/A#m', 7)

//map of notes and indices to convert notes to a numeric value
//can be replaced with ord(c) - ord(char)
const noteIndices = new Map()
noteIndices.set('A', 5)
noteIndices.set('B', 6)
noteIndices.set('C', 0)
noteIndices.set('D', 1)
noteIndices.set('E', 2)
noteIndices.set('F', 3)
noteIndices.set('G', 4)

var Validator = {
    //checks if the proposed note is correct
    isValidNote: function (proposedNote, state) {

        //parses the data
        var key = state.key
        var correctNote = state.note

        //Calls proper conversions based on key
        if (isFlatKey(key)) {
            console.log(`flat key conversion on ${correctNote}`)
            correctNote = convertNoteFlatKey(key, correctNote)
            console.log('possible note converted to flat')
        } else if (isSharpKey(key)) {
            console.log(`sharp key conversion on ${correctNote}`)
            correctNote = convertNoteSharpKey(key, correctNote)
            console.log('possible note converted to sharp')
        } else {
            //no key means Cmaj/Am - no conversions needed, just strip ending
            correctNote = correctNote.substring(0, 1)
        }
        console.log(`proposed note: ${proposedNote}`)
        console.log(`correct note:${correctNote}`)

        //FIX - need to F is found in F#
        arrProposedNote = proposedNote.split('/')
        return (arrProposedNote.indexOf(correctNote) != -1)
    },

    getKeyType: function(key){
        if(isFlatKey(key)) {
            return "flat"
        } else if (isSharpKey(key)) {
            return "sharp"
        } else {
            return null
        }
    },

    //can be cleaner
    getNumKeySegs: function(key){
        if(isFlatKey(key)) {
            return flats.get(key)
        } else if (isSharpKey(key)) {
            return sharps.get(key)
        } else {
            return null
        }
    },

    getNoteIndex: function(note) {
        return convertNoteIndex(note)
    }
}

//converts a note to a numeric value - e.x. E5 = 27
convertNoteIndex = function (note) {
    console.log(`attempt to convert ${note} into index`)
    var noteBase = note.substring(0, 1)
    var noteRegister = note.substring(1, 2)
    var baseIndex = noteIndices.get(noteBase)
    console.log(noteBase)
    console.log(noteRegister)
    console.log(baseIndex)
    return (((Number(noteRegister) * 7) + baseIndex) - 5)
}

//checks if key is flat
isFlatKey = function (key) {
    return flats.has(key)
}

//checks if key is sharp
isSharpKey = function (key) {
    return sharps.has(key)
}

//converts the answer note to add a flat if the note is a flat in the corresponding key
convertNoteFlatKey = function (key, note) {
    var numFlats = flats.get(key)

    var noteIndexFlats = (convertNoteIndex(note) + 2) % 7
    var flatIndex = 0 //starts at 0

    console.log('flat conversion begins')
    console.log(noteIndexFlats)
    console.log(numFlats)

    for (var i = 0; i < numFlats; i++) {
        flatIndex = (flatIndex + 3) % 7
        if (noteIndexFlats === flatIndex) {
            note = note.substring(0, 1) + 'b'
            return note;
        }
    }
    return note.substring(0, 1)

}

//converts the answer note to add a sharp if the note is a sharp in the correspinding key
convertNoteSharpKey = function (key, note) {
    var numSharps = sharps.get(key)

    var noteIndexSharps = (convertNoteIndex(note)) % 7
    var sharpIndex = 1 //starts at 1

    console.log('sharp conversion begins')
    console.log(noteIndexSharps)
    console.log(numSharps)

    for (var i = 0; i < numSharps; i++) {
        sharpIndex = (sharpIndex + 4) % 7
        if (noteIndexSharps === sharpIndex) {
            note = note.substring(0, 1) + '#'
            return note;
        }
    }
    return note.substring(0, 1)
}

module.exports = Validator;