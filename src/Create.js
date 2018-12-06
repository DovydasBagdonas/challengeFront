import React, { Component } from 'react';
import { createBlogPost } from './actions/toDoListActions';

class Create extends Component {

    handleSubmit(data) {
        createBlogPost(data);
        this.props.router.push('/').bind(this);
    }

    render() {
        return (
            <div>
                <button onSubmit={this.handleSubmit.bind(this)}></button>
            </div>
        );
    }
}
export default Create;