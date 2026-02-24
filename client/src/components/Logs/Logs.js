import axios from 'axios';
import React, { Component } from 'react';
import { LazyLog, ScrollFollow } from 'react-lazylog';
import UnlockAccess from "../roles/UnlockAccess";

export default class Logs extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        Logs: "Welcome to Log Management\n",
      }
    }

    componentDidMount() {
      axios.get('http://localhost:5000/Logs/')
        .then(response => {
            for (var i=0; i< response.data.length; i++)
            {
              this.setState({
                Logs: this.state.Logs + response.data[i].Log + '\n'
              })
          }
        })
        .catch((error) => {
          console.log(error);
        })
    }

    render () {
    return(
      <div className="main__container">
        <UnlockAccess request={'Admin'}>
        <div className="lazylag">
            <h5>Logs:</h5>
            <ScrollFollow
                startFollowing
                render={({ onScroll, follow, startFollowing, stopFollowing }) => (
                <LazyLog extraLines={1}
                        enableSearch
                        caseInsensitive
                        text={this.state.Logs}
                        stream onScroll={onScroll} 
                        follow={follow} />
                )}
            />
        </div>
        </UnlockAccess>
        </div>
    )}
}