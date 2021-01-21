import React, { Component } from 'react'
import './../css/piano.css'

export class PianoKey extends Component {
    state = {
        active: false
    }

    render() {
        return (
            <div className={this.props.className} onClick={this.props.onSubmit.bind(this)}>
                
            </div>
        )
    }
}

export default PianoKey
