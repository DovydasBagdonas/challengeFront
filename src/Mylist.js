import React, { Component } from 'react';
import Popup from "reactjs-popup";
import ArchiveList from "./ArchiveList";

class Mylist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toDo: [],
            showComponent: false,
            isLoaded: false
        }
        this.putAndRefreshList = this.putAndRefreshList.bind(this);
        this._onButtonClick = this._onButtonClick.bind(this);
    }
    componentDidMount() {
        fetch('http://localhost:8080/hello2')
            .then(res => res.json())
            .then(json => {
                setTimeout(() => {
                this.setState({
                    isLoaded: true,
                    toDo: json
                })},200)
            });
    }

    putAndRefreshList(){
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
        this.componentDidMount();
    }
    archiveToDo(id, statement){
        fetch('http://localhost:8080/archive', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: id,
                statement: statement
            })
        })
        this.componentDidMount();
    }

    _onButtonClick() {
        this.setState(prevState => ({
            showComponent: !prevState.showComponent,
        }));
    }
    render() {
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
                            <li><button>ToDo List</button></li>
                            <br/>
                            <li><button onClick={this._onButtonClick}>Archived</button>
                                {this.state.showComponent ?
                                    <ArchiveList /> :
                                    null
                                }
                                </li>
                        </ul>
                    </nav>
                    <article>
                        {toDo.map(toDo => (
                            <table border="1">
                                <li key={toDo.id}>
                                    {toDo.statement} {toDo.date} &nbsp; <button onClick={this.archiveToDo.bind(this, toDo.id, toDo.statement)}>archive</button>
                                </li>
                            </table>
                        ))}
                        <Popup trigger={<button>Add New</button>} position="right center">
                            {close => (
                                <div>
                                    <p>Name your todo</p>
                                    <input id="myStatement"></input>
                                    <button className="close" onClick={close}>Cancel</button>
                                    <button id="postData" onClick={this.putAndRefreshList} className="float-right">Ok</button>
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
