import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component<{}, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      toDo: [],
      isLoading: false,
    }
  }

  componentDidMount() {
    this.setState({isLoading: true});

      fetch('http://localhost:8080/toDo')
        // .then(response => response.json())
        // .then((messages) => {console.log("messages");})
        // .then(data => this.setState( {toDo: data, isLoading: false }));
          .then(res => res.json())
          .then(json => {
            this.setState({
                isLoaded: true,
                toDo: json,
            })
          });
  }

  render() {
    var {toDo, isLoading} = this.state;

    if (!isLoading){
      return <p>Loading...</p>;
    }

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <h2>ToDo List</h2>
        <div>
          {toDo.map(toDo => (
            <p key={toDo.id}>
              {toDo.statement} {toDo.name} <button>Archive</button>
            </p>
          ))}
          <button>Add new Todo</button>
        </div>
      </div>
    );
  }
}

export default App;
