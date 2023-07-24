import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Ratio } from "../../constants/styles";

const formatNumber = number => `0${number}`.slice(-2);

const getRemaining = time => {
    const minutes = Math.floor(time / 60);
    const seconds = time - minutes * 60;
    return { minutes: formatNumber(minutes), seconds: formatNumber(seconds) };
};

export default class Timer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            remainingSeconds: 5,
            selectedMinutes: "40",
            selectedSeconds: "0",
            isRunning: true
        };
    }

    componentDidUpdate = (prevProp, prevState) => {
        if (this.state.remainingSeconds === 0 && prevState.remainingSeconds !== 0 ) {
            this.stop();
        }
    };

    componentDidMount() {
        if (!this.interval) {
            clearInterval(this.interval);
        }
        this.start();
    }

    start = () => {
        this.setState(state => ({
            remainingSeconds:
            parseInt(state.selectedMinutes, 10) * 60 + parseInt(state.selectedSeconds, 10),

            isRunning: true
        }));

        this.interval = setInterval(() => {
            this.setState(state => ({
                remainingSeconds: state.remainingSeconds - 1
            }));
        }, 1000);
    };

    stop = () => {
        clearInterval(this.interval);
        this.interval = null;
        this.setState({
            remainingSeconds: 5,
            isRunning: false
        });
        this.props.timeEnd();
    };
    
    render() {
        const { minutes, seconds } = getRemaining(this.state.remainingSeconds);

        return (
            <View>
                {this.state.isRunning ? (
                    <Text style={styles.timerText}>{`${minutes}:${seconds}`}</Text>
                ) : null}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    timerText: {
        color: "white",
        fontSize: Ratio.deviceHeight < 700 ? 30 : 36,
        textAlign: "center"
    }
});
