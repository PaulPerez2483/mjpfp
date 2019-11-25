import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Link, HashRouter } from "react-router-dom";
// console.log(axios)

const tools = {
    Component: React.Component,
    render: ReactDOM.render,
    rootEl: document.querySelector('#root'),
    employees: 'http://localhost:4000/api/employees/'
}

const { Component, render, rootEl, employees } = tools;

class App extends Component {
    constructor() {
        super();
        this.state = {
            estado: false,
            count: null,
            data: [],
            currentPage: 0,
            usersPerPage: 50
        }
    }

    componentDidMount() {
        let { currentPage } = this.state;
        axios.get(`${employees}${currentPage}`)
            .then(response => this.setState({ currentPage: currentPage, count: response.data.count, data: response.data.rows, estado: true }))
            .catch(err => console.log(err));
    }

    clickCurrentPage(event) {
        this.setState({
            currentPage: event.target.id * 1
        });
        axios.get(`${employees}${event.target.id * 1}`)
            .then(response => this.setState({ data: response.data.rows }))
            .catch(err => console.log(err));

    }

    goBack() {
        const { currentPage } = this.state;
        console.log(currentPage)
        if (currentPage !== 0) {
            this.setState({ currentPage: currentPage - 1 });
            axios.get(`${employees}${currentPage}`)
                .then(response => this.setState({ data: response.data.rows }))
                .catch(err => console.log(err));
        }
        console.log('let me go back')
    }

    goForward() {
        const { currentPage, count, usersPerPage } = this.state;
        let numsOfLinks = Math.floor(count / usersPerPage);
        if (currentPage !== numsOfLinks) {
            this.setState({ currentPage: currentPage + 1 });
            axios.get(`${employees}${currentPage}`)
                .then(response => this.setState({ data: response.data.rows }))
                .catch(err => console.log(err));
        }
        console.log('let me go forward')
    }

    render() {
        const { estado, count, data, currentPage, usersPerPage } = this.state;
        if (!estado) {
            return null
        }
        // console.log('count', count);
        console.log('data', data);
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
                    {data.map(user => {
                        return (
                            <div className="header">
                                <div>{user.firstName}</div>
                                <div>{user.lastName}</div>
                                <div>{user.email}</div>
                                <div>{user.title}</div>
                            </div>
                        )
                    })}

                </div>
            </div>

        )
    }

}

render(<App />, rootEl);
