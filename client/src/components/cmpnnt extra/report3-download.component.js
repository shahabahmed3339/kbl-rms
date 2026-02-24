import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReactExport from "react-data-export";
import axios from 'axios';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const Report = props => (
  <tr>
    <td>{props.report.APID}</td>
    <td>{props.report.Controls}</td>
    <td>{props.report.Description}</td>
    <td>{props.report.Exposr}</td>
    <td>{props.report.Impact}</td>
    <td>{props.report.Probab}</td>
    <td>{props.report.Summary}</td>
  </tr>
)
const Report1 = props => (
  <tr>
    <td>{props.report1.Risk_Name}</td>
  </tr>
)

export default class ReportDownload extends Component {
  constructor(props) {
    super(props);

    this.state = {
        reports: [],
        reports1: [],
        reports2: []
    };
  }

  componentDidMount() {
    axios.get('http://localhost:5000/RiskMitigation/')
      .then(response => {
        this.setState({ reports: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
      axios.get('http://localhost:5000/RiskAssessment/')
        .then(response1 => {
          this.setState({ reports1: response1.data })
        })
        .catch((error) => {
          console.log(error);
        })
  }

  reportList() {
    return this.state.reports.map(currentreport => {
      return <Report report={currentreport} key={currentreport._id}/>;
    })
  }
  reportList1() {
    return this.state.reports1.filter(astid => astid.APID == 1).map(currentreport1 => {
      return <Report1 report1={currentreport1} key={currentreport1._id}/>;
    })
  }

  render() {
    return (
      <div>
          <div>
        <h3>Asset Report</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Asset ID</th>
              <th>Control</th>
              <th>Description</th>
              <th>Exposure</th>
              <th>Impact</th>
              <th>Probability</th>
              <th>Summary</th>
              <th>Risk</th>
            </tr>
          </thead>
          <tbody>
            { this.reportList() }{ this.reportList1() }
          </tbody>
        </table>
        </div>
              <div>
            <ExcelFile>
                <ExcelSheet data={this.reportList()} name="Asset Report">
                    <ExcelColumn label="Asset ID" value=""/>
                    <ExcelColumn label="Control" />
                    <ExcelColumn label="Exposure" />
                    <ExcelColumn label="Description" />
                    <ExcelColumn label="Impact" />
                    <ExcelColumn label="Probability" />
                    <ExcelColumn label="Summary" />
                </ExcelSheet>
            </ExcelFile>
            </div>
      </div>
    )
  }
}