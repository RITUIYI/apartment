import React, { Component } from 'react';
import './list.scss'
import Search from './searchbar/search'
class Houselist extends Component {
    render() {
        return (
            <div>
                <Search />
            </div>
        );
    }
}

export default Houselist;