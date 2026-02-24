import React from "react";
import ReactExport from "react-data-export";
import axios from 'axios';
import './Custom.css';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

export default class ReportDownload extends React.Component {
    constructor(props) {
      super(props);
  
      this.state = {
        AssetID: [],
        AssetName: [],
        Confidentiality: [],
        Integrity: [],
        Availability: [],
        Classification: [],
        Risk: [],
        Vulnerability: [],
        Control: [],
        Description:[],
        Exposure: [],
        Impact: [],
        Probability: [],
        Summary: [],
        RiskOwner: []
      }
    }

    componentDidMount(){

        axios.get('http://localhost:5000/RiskMitigation/')
          .then(response1 => {
            if (response1.data.length > 0) {
              this.setState({
                AssetID: response1.data.filter(asst => asst.APType == 'Asset').map(user1 => user1.APID),
                Control: response1.data.filter(asst => asst.APType == 'Asset').map(user2 => user2.Controls),
                Exposure: response1.data.filter(asst => asst.APType == 'Asset').map(user3 => user3.Exposr),
                Impact: response1.data.filter(asst => asst.APType == 'Asset').map(user4 => user4.Impact),
                Probability: response1.data.filter(asst => asst.APType == 'Asset').map(user5 => user5.Probab),
                Summary: response1.data.filter(asst => asst.APType == 'Asset').map(user6 => user6.Summary)
              })
            }
          })
          .catch((error) => {
            console.log(error);
          })

    }
    

    render() {
        return (
            <div className="form-group">
                <div>
              <table>
                <tr className="form-control">
                  <th style={{width: 200}}>Asset ID</th>
                  <th style={{width: 200}}>Control</th>
                  <th style={{width: 200}}>Exposure</th>
                  <th style={{width: 200}}>Impact</th>
                  <th style={{width: 200}}>Probability</th>
                  <th style={{width: 200}}>Summary</th>
                </tr>
                <tr className="form-control">
                  <td style={{width: 200}}>{this.state.AssetID.map(function(user1) { return user1; })}</td>
                  <td style={{width: 200}}>{this.state.Control.map(function(user2) { return user2; })}</td>
                  <td style={{width: 200}}>{this.state.Exposure.map(function(user3) { return user3; })}</td>
                  <td style={{width: 200}}>{this.state.Impact.map(function(user4) { return user4; })}</td>
                  <td style={{width: 200}}>{this.state.Probability.map(function(user5) { return user5; })}</td>
                  <td style={{width: 200}}>{this.state.Summary.map(function(user6) { return user6; })}</td>
                </tr>
              </table>
              </div>
              <div>
            <ExcelFile>
                <ExcelSheet name="Asset Report">
                    <ExcelColumn label="Asset ID" value={this.state.AssetID.map(function(user1) { return user1; })}/>
                    <ExcelColumn label="Control" value={this.state.Control.map(function(user2) { return user2; })}/>
                    <ExcelColumn label="Exposure" value={this.state.Exposure.map(function(user3) { return user3; })}/>
                    <ExcelColumn label="Impact" value={this.state.Impact.map(function(user4) { return user4; })}/>
                    <ExcelColumn label="Probability" value={this.state.Probability.map(function(user5) { return user5; })}/>
                    <ExcelColumn label="Summary" value={this.state.Summary.map(function(user6) { return user6; })}/>
                </ExcelSheet>
            </ExcelFile>
            </div>
            </div>
        );
    }
}