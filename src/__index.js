import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Link, HashRouter } from "react-router-dom";
import { createStore } from 'redux';
import { Search } from './search'

// action -> links
const next = () => {
    return {
        type: 'NEXT'
    }
}

const prev = () => {
    return {
        type: 'PREV'
    }
}

const click = (x) => {
    console.log('on click show me ID:', x)
    return {
        type: 'CLICK',
        payLoad: x
    }
}


// reducer ->  base on the action it will modify the store 
let onReload = window.location.hash.slice(window.location.hash.indexOf('/') + 1) * 1;
console.log(onReload)
const link = (state = 0, action) => {
    switch (action.type) {
        case "NEXT":
            return state + 1;
        case "PREV":
            return state - 1;
        case "CLICK":
            return state = action.payLoad
        default:
            return state = onReload;
    }
}

const store = createStore(link);


//dispatch -> execution the action  and update the store
store.subscribe(() => console.log('line 38', store.getState()));

// console.log(axios)

const tools = {
    Component: React.Component,
    render: ReactDOM.render,
    rootEl: document.querySelector('#root'),
    employees: 'http://localhost:4000/api/employees/'
}

const { Component, render, rootEl, employees } = tools;

class ShowData extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
        this.deleteMe = this.deleteMe.bind(this)
    }
    async deleteMe({ ...x }) {
        console.log(x.id);
        await axios.delete(`/api/events/${id}`);

    }

    render() {
        console.log('line 70', this.props.data)
        return (
            this.props.data.map(user => {
                return (
                    <div className="header">
                        <div>{user.firstName}</div>
                        <div>{user.lastName}</div>
                        <div>{user.email}</div>
                        <div>{user.title}
                            <button onClick={() => this.deleteMe({ ...user })}>x</button>
                        </div>

                    </div>
                )
            })

        )
    }
}


class App extends Component {
    constructor() {
        super();
        this.state = {
            estado: false,
            count: null,
            data: [],
            currentPage: store.getState(),
            usersPerPage: 50
        }
    }

    componentDidMount() {
        let { currentPage } = this.state;
        console.log('line 68', currentPage)
        axios.get(`${employees}${currentPage}`)
            .then(response => this.setState({ count: response.data.count, data: response.data.rows, estado: true }))
            .catch(err => console.log(err));
    }

    clickCurrentPage(event) {
        this.setState({
            // currentPage: event.target.id * 1
            currentPage: store.dispatch(click(event.target.id * 1))
        });
        axios.get(`${employees}${event.target.id * 1}`)
            .then(response => this.setState({ data: response.data.rows }))
            .catch(err => console.log(err));

    }

    goBack() {
        const currentPage = store.getState();
        console.log(currentPage)
        if (currentPage !== 0) {
            store.dispatch(prev())
            axios.get(`${employees}${currentPage}`)
                .then(response => this.setState({ data: response.data.rows }))
                .catch(err => console.log(err));
        }
        console.log('let me go back')
    }

    goForward() {
        const { count, usersPerPage } = this.state;
        const currentPage = store.getState();
        let numsOfLinks = Math.floor(count / usersPerPage);

        console.log('dadsdas', currentPage, numsOfLinks)
        if (currentPage < numsOfLinks) {
            store.dispatch(next())
            axios.get(`${employees}${currentPage}`)
                .then(response => this.setState({ data: response.data.rows }))
                .catch(err => console.log(err));
        }
        console.log('let me go forward')
    }

    render() {
        const { estado, count, data, usersPerPage } = this.state;
        const currentPage = store.getState();
        if (!estado) {
            return null
        }
        // console.log('count', count);
        // console.log('data', data);
        console.log('currentPage', currentPage);
        // console.log('usersPerPage', usersPerPage);
        let numsOfLinks = Math.floor(count / usersPerPage);
        const arrOfLinks = [];
        for (let i = 0; i <= numsOfLinks; i++) {
            arrOfLinks.push(<Link to={`${i}`} className={currentPage === i ? 'selected' : ''} onClick={this.clickCurrentPage.bind(this)} key={i} id={i}>{i + 1}</Link>)
        }
        // console.log(arrOfLinks)
        return (
            <div>
                <div className='nav-holder'>
                    <Search data={data} />

                    <HashRouter>
                        <nav>
                            <Link to={`${currentPage}`} onClick={this.goBack.bind(this)}><i class="fa fa-chevron-left"></i></Link>
                            {arrOfLinks.map(alink => alink)}
                            <Link to={`${currentPage}`} onClick={this.goForward.bind(this)}><i class="fa fa-chevron-right"></i></Link>
                        </nav>
                    </HashRouter>
                </div>
                <div className='data-holder'>

                    <div className="header">
                        <div>First Name</div>
                        <div>Last Name</div>
                        <div>Email</div>
                        <div>Title</div>
                    </div>
                    <ShowData data={data} />
                </div>
            </div>

        )
    }

}

render(<App />, rootEl);
