import React, { Component } from 'react';

class ArchiveList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toDo: [],
            isLoaded: false
        }
    }
    componentDidMount() {
        fetch('http://localhost:8080/archivelist',{mode: 'cors'})
            .then(res => res.json())
            .then(json => {
                setTimeout(() => {
                    this.setState({
                        isLoaded: true,
                        toDo: json
                    })},200)
            });
    }
    render() {
        var { isLoaded, toDo } = this.state;
        if (!isLoaded) {
            return <div>Loading...</div>;
        }
        return (
            <div align="center" classname="App">
                <header>
                    <h2>Archived ToDo List</h2>
                </header>
                        {toDo.map(toDo => (
                            <table border="1">
                                <li key={toDo.id}>
                                    {toDo.statement} {toDo.date}
                                </li>
                            </table>
                        ))}
            </div>
        );
    }
}
export default ArchiveList;
