

const clefs = new Map()
clefs.set('bass', require('./../images/bass.png'))
clefs.set('treble', require('./../images/treble.png'))

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

//range should be sent iver as data - fix later
var clef_index = new Map()
clef_index.set('bass', [11, 23])
clef_index.set('treble', [23, 35])

var isFlatKey = function(keyType) {
    return 'flat' === keyType
}

var isSharpKey = function(keyType) {
    return 'sharp' === keyType
}


var displayLogic = {

    getClef: function(clef) {
        return clefs.get(clef)
    },

    keySigImg: function(keyType){
        if(isFlatKey(keyType)){
            return require('./../images/flat.png')
        } else if (isSharpKey(keyType)) {
            return require('./../images/sharp.png')
        } else {
            return null
        }
    },

    //Styling for keySig
    findKeyStyle: function(numKeySegs, keyType, clef, iter){
        var style = {
            position: 'relative',
            zIndex: 2
        }
        //sharps
        //top - G - 6
        //bottom - A - 0
        //start - F - 5

        //flats
        //top - E - 6
        //bottom - F - 0
        //start - B - 3

        //constants for CSS
        const horizontal_shift_base_fixed = 850
        const horizontal_shift_incr_fixed = 25
        const vertical_shift_base_fixed = 50

        var vert_incr //vertical differenct between notes (px)
        var start //start index of the first key (unitless)
        var clef_diff //vertical index difference between clefs (unitless)
        var clef_shift //horizontal shift due to different clefs (px)
        var next_index_incr //layout of key signature (sharp=4, flat=3)
        var sharp_key_shift //small shift due to difference in images

        //base reference prior to shifts is flats w/ treble cleff

        if(keyType ==='flat') {
            start = 3
            next_index_incr = 3
            sharp_key_shift = 0
            vert_incr = 14 //not sure why these are different
        } else if (keyType === 'sharp') {
            start = 5
            next_index_incr = 4
            sharp_key_shift = -21
            vert_incr = 13 //not sure why these are different
        }
        if(clef === 'bass') {
            clef_diff = 2
            clef_shift = 0
        } else if (clef === 'treble'){
            clef_diff = 0
            clef_shift = 0
        }

        //positioning formula (vertical)
        var pos = ((((start+(iter*next_index_incr))%7)*-vert_incr)-vertical_shift_base_fixed)+(clef_diff*vert_incr)+sharp_key_shift

        style.top = pos

        style.margin = '0px -15px 0px -15px'
        return style
    },

    findNoteStyle: function(note_index, clef){
        var style = {
            position: 'relative',
            zIndex: 2,
        }

        var vert_incr = 14

        var start_index
        var clef_shift

        if(clef === 'bass'){
            start_index = 17
            clef_shift = 130
        } else if (clef === 'treble') {
            start_index = 29
            clef_shift = 0
        }

        //bass_start_index = 17
        //treble_start_index = 29

        var base_diff = note_index - start_index

        var pos = -83-base_diff*vert_incr

        style.left = 50
        style.top = pos

        return style
    }
}



module.exports = displayLogic