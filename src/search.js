import React from 'react';
import ReactDOM from 'react-dom';



const tools = {
    Component: React.Component,
    render: ReactDOM.render,
}

const { Component } = tools;


class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searChing: '',

        }
        this.searChing = this.searChing.bind(this);
    }

    searChing(e) {
        this.setState({
            searChing: e.target.value
        })
    }
    render() {
        const data = this.props.data;
        console.log(data)
        console.log(this.state.searChing)
        return (
            <div className='search'>
                <input onChange={this.searChing} type="text" placeholder="find name" />
                {

                }
            </div>
        )

    }
}

export { Search }