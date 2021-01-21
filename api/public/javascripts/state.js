var generate = require('./generator')
var Validator = require('./validation')

function UserState() {
    this.state = generate();

    this.checkNote = function(note){

        console.log('checkNote invoked')
        if(Validator.isValidNote(note, this.state)){
            console.log('note successfully validated')
            console.log("ISFLATKEY: " + Validator.getKeyType(this.state.key))
            console.log("NUMKEYSEGS: " + Validator.getNumKeySegs(this.state.key))
            //Add points or whatever
            this.state = generate();
            return this.state;
        } else {
            return this.state
        }
    }

    //temporary
    this.isValidNote = function(note) {
        return true;
    }

    this.getState = function(){
        return this.state
    }
}

module.exports = UserState;