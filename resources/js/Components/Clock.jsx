import React, { Component } from "react";
import moment from "moment-timezone";

class Clock extends Component {
    constructor() {
        super();
        this.state = {
            currentTime: this.getCurrentTimeInMakassar(),
        };
    }

    componentDidMount() {
        this.timerID = setInterval(() => this.tick(), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    getCurrentTimeInMakassar() {
        return moment().tz("Asia/Makassar").format("HH:mm:ss");
    }

    tick() {
        this.setState({
            currentTime: this.getCurrentTimeInMakassar(),
        });
    }

    render() {
        return (
            <>
                <p className="font-shoulder text-sky-500 py-1 bg-black px-1 rounded-lg">
                    {this.state.currentTime}
                </p>
            </>
        );
    }
}

export default Clock;
