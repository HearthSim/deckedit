import React, { Component } from 'react';
import './App.css';
import DeckEditor from "./DeckEditor";

class App extends Component {
  render() {
    return (
      <div className="App">
          <DeckEditor />
      </div>
    );
  }
}

export default App;
