import React from 'react';
import './App.css';

import Display from './components/Display';
import Piano from './components/Piano';

class App extends React.Component {
  //state of entire app
  state = {
    display: ''
  }

  //fetches display state from server
  callAPI() {
    fetch("http://localhost:9000/sightreaderAPI")
    .then(res => res.json())
    .then(res => this.setState({display: res}))
  }

  //invoked when page is loaded
  componentDidMount() {
    this.callAPI()
  }

  //upon key press, send note to server
  onSubmit = async function(event) {
    event.preventDefault();
    const response = await fetch("http://localhost:9000/sightreaderAPI", {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({note: this.props.note})
    })
    await response.json().then(res => this.setState({display: res}))
    window.location.reload(false)
}
  
  //render home page
  render() {
    return (
      <div>
        <Display parent={this}/>
        <Piano parent={this} onSubmit={this.onSubmit}/>
      </div>
    )
  }
}

export default App;
