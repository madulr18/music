import React, { Component } from 'react'

import PianoKey from './PianoKey'

import './../css/piano.css'

export class Piano extends Component {
    render() {

        //piano layout
        const piano = [
            <PianoKey parent={this.props.parent} onSubmit={this.props.onSubmit} note='C/B#' className='white'/>,
            <PianoKey parent={this.props.parent} onSubmit={this.props.onSubmit} note='C#/Db' className='black'/>,
            <PianoKey parent={this.props.parent} onSubmit={this.props.onSubmit} note='D' className='white'/>,
            <PianoKey parent={this.props.parent} onSubmit={this.props.onSubmit} note='D#/Eb' className='black'/>,
            <PianoKey parent={this.props.parent} onSubmit={this.props.onSubmit} note='E/Fb' className='white'/>,
            <PianoKey parent={this.props.parent} onSubmit={this.props.onSubmit} note='F/E#' className='white'/>,
            <PianoKey parent={this.props.parent} onSubmit={this.props.onSubmit} note='F#/Gb' className='black'/>,
            <PianoKey parent={this.props.parent} onSubmit={this.props.onSubmit} note='G' className='white'/>,
            <PianoKey parent={this.props.parent} onSubmit={this.props.onSubmit} note='G#/Ab' className='black'/>,
            <PianoKey parent={this.props.parent} onSubmit={this.props.onSubmit} note='A' className='white'/>,
            <PianoKey parent={this.props.parent} onSubmit={this.props.onSubmit} note='A#/Bb' className='black'/>,
            <PianoKey parent={this.props.parent} onSubmit={this.props.onSubmit} note='B/Cb' className='white'/>
        ]
        return (
            <div className='piano'>
                {piano}
            </div>
        )
    }
}

export default Piano
