import React, { Component } from 'react'
import './../css/display.css'

var DisplayLogic = require('./displayLogic')



export class Display extends Component {

    state = {
        music_staff_img: null,
        whole_note_img: null,
        clef_img: null,
        clef: null,
        key: null,
        note: null,
        keySig: [],
        numKeySegs: null,
        keyType: null,
        note_disp: null
    }


    componentDidUpdate() {

        var parentState = this.props.parent.state



        //images
        var clef_img_var = DisplayLogic.getClef(parentState.display.clef)
        var keySigImg = DisplayLogic.keySigImg(parentState.display.keyType)
        var music_staff_img_var = require('./../images/music_staff.jpg')
        var whole_note_var = require('./../images/whole_note.png')

        var keySig_var = this.populateKeySig(parentState.display.numKeySegs, keySigImg, parentState.display.keyType, parentState.display.clef)

        var whole_note_disp_style = this.setNotePlacement(parentState.display.note_index, parentState.display.clef)

        //prevState = this; newState=parentState.display
        if (this.hasDiffState(this.state, parentState)) {
            this.setState({
                music_staff_img: music_staff_img_var,
                whole_note_img: whole_note_var,
                clef_img: clef_img_var,
                clef: parentState.display.clef,
                key: parentState.display.key,
                note: parentState.display.note,
                keySig: keySig_var,
                numKeySegs: parentState.display.numKeySegs,
                keyType: parentState.display.keyType,
                note_disp: whole_note_disp_style
            })
        }
    }

    //fix for sharps and flats, generate style in displaylogic
    populateKeySig(numKeySegs, key_img, keyType, clef) {
        var keySig_arr = []
        for (var i = 0; i < numKeySegs; i++) {
            //get rid of component
            keySig_arr.push(<img className='keySig' id={i} style={DisplayLogic.findKeyStyle(numKeySegs, keyType, clef, i)} src={key_img} alt='' />)
        }
        return keySig_arr
    }

    setNotePlacement(note, clef) {
        return DisplayLogic.findNoteStyle(note, clef)
    }

    //clean up
    hasDiffState(prevState, newState) {
        console.log(prevState)
        console.log(newState)
        if (newState.display === '') {
            return true;
        }
        if ((prevState.clef === newState.display.clef) &&
            (prevState.key === newState.display.key) &&
            (prevState.note === newState.display.note)) {
            return false;
        } else {
            return true;
        }
    }

    render() {

        //console.log(this.props.parent.state)


        //keySigStyle.setAttribute('top', '-150px')

        return (
            <div className='display'>

                <div style={{position: 'relative', zIndex: '1'}}>
                    <img src={this.state.music_staff_img} className="staff" alt='' />
                </div>
                <div style={{ position: 'relative', top: '-240px', zIndex: '2' }}>
                    
                        <img src={this.state.clef_img} className="clef" id={this.props.parent.state.display.clef} alt='' />
                   

                    {this.state.keySig}
                    <img src={this.state.whole_note_img} style={this.state.note_disp} className="note" alt='' />
                </div>


                <p>
                    {this.props.parent.state.display.clef}
                    {this.props.parent.state.display.key}
                    {this.props.parent.state.display.note}
                    {this.props.parent.state.display.numKeySegs}
                    {this.props.parent.state.display.keyType}
                    {this.props.parent.state.display.note_index}
                </p>
            </div>
        )
    }
}

export default Display
