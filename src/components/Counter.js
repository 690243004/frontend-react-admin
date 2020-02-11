import React, { Component } from 'react';
import ReactDOM from 'react-dom'


class Counter extends Component {
    constructor(props) {
        super(props);
        this.incrementAsync = this.incrementAsync.bind(this)
        this.incrementIfOdd = this.incrementIfOdd.bind(this)
    }

    incrementIfOdd() {

    }

    incrementAsync() {

    }

    render() {
        const {value,onIncrement,onDecrement} = this.props
        return (
            <p>Clicked:(value) times</p>
        )
    }
}