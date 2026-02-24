import "../../../node_modules/react-vis/dist/style.css";
import {XYPlot, LineSeries, XAxis, YAxis, VerticalGridLines, HorizontalGridLines} from 'react-vis';
import axios from 'axios';
import React, { Component } from 'react';


export default class Chart extends Component {

    constructor(props) {
        super(props);
        this.state = {
            len: 0,
            Class: []
        }
    }

        componentDidMount() {
        axios.get('http://localhost:5000/CIAMark/')
          .then(response => {
              this.setState({
                len: response.data.length,
                Class: response.data.map(user => user.Mult)
              })
          })
          .catch((error) => {
            console.log(error);
          })
        }

    render() {
        const y1 = this.state.Class.map(function(user){return user})
        const data = [{x: null, y: null}]
        for(var i=0; i<this.state.len; i++){
            data[i] = {x: i+1, y: y1[i]}
        }
    return (
        <div style={{marginTop:"15px"}}>
            <XYPlot height={300} width={300}>
                <VerticalGridLines/>
                <HorizontalGridLines/>
                <XAxis/>
                <LineSeries data={data} color="red"/>
                <LineSeries data={data} color="purple"/>
                <LineSeries data={data} color="yellow"/>
                <YAxis/>
            </XYPlot>
        </div>
    )
    }
}