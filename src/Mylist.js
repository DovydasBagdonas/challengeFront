import React, { Component } from 'react';
import Popup from "reactjs-popup";

class Mylist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toDo: [],
            isLoaded: false
        }
    }
    componentDidMount() {
        fetch('http://localhost:8080/hello2')
            .then(res => res.json())
            .then(json => {
                this.setState({
                    isLoaded: true,
                    toDo: json
                })
            });
    }
    render() {
        function handleClick(e) {
            var statement = document.getElementById("myStatement").value;
            fetch('http://localhost:8080/toDo', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    statement: statement
                })
            })
        }
        var { isLoaded, toDo } = this.state;
        if (!isLoaded) {
            return <div>Loading...</div>;
        }
        return (
            <div align="left" classname="App">
                <header>
                    <h2>Todo</h2>
                </header>
                <section>

                    <nav>
                        <ul>
                            <li>Todo List</li>
                            <li>Archived</li>
                        </ul>
                    </nav>
                    <article>
                        <table border="1">
                            {toDo.map(toDo => (
                                <li key={toDo.id}>
                                    {toDo.testas} {toDo.date} &nbsp; <button>archive</button>
                                </li>
                            ))}
                        </table>

                        <Popup trigger={<button>Add New</button>} position="right center">
                            {close => (
                                <div>
                                    <p>Name your todo</p>
                                    <input id="myStatement"></input>
                                    <button className="close" onClick={close}>Cancel</button>
                                    <button id="postData" onClick={handleClick} className="float-right">Ok</button>
                                </div>
                            )}
                        </Popup>

                    </article>
                </section>
            </div>
        );
    }
}
export default Mylist;
