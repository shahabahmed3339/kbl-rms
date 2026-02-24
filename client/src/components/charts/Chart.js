import "../../../node_modules/react-vis/dist/style.css";
// import {XYPlot, LineSeries, XAxis, YAxis, VerticalGridLines, HorizontalGridLines, makeVisFlexible} from 'react-vis';
import {Bar, Pie} from 'react-chartjs-2';
import axios from 'axios';
import React, { Component } from 'react';

var newDate = new Date();

export default class Chart extends Component {

    constructor(props) {
        super(props);
        this.state = {
            len: 0,
            Class: [],
            Assets: [],
            CIAs: [],
            Risks: [],
            Mitigations: [],
            Depts: [],
            Asst_Issue: [],
            Risk_Types: [],
            Quarters: [],
            Year: newDate.getFullYear()
        }
    }

        componentDidMount() {
            
        axios.get('http://localhost:5000/Department/')
          .then(res => {
              this.setState({
                  Depts: res.data
              })
          })
          .catch((error) => {
            console.log(error);
          })
            
        axios.get('http://localhost:5000/Assets/')
          .then(res => {
              this.setState({
                  Assets: res.data
              })
          })
          .catch((error) => {
            console.log(error);
          })
            
          axios.get('http://localhost:5000/AssetIssue/')
            .then(res => {
                this.setState({
                    Asst_Issue: res.data
                })
            })
            .catch((error) => {
              console.log(error);
            })

        axios.get('http://localhost:5000/CIAMark/')
          .then(res => {
              this.setState({
                  CIAs: res.data
              })
          })
          .catch((error) => {
            console.log(error);
          })

        axios.get('http://localhost:5000/RiskAssessment/')
          .then(res => {
              this.setState({
                  Risks: res.data
              })
          })
          .catch((error) => {
            console.log(error);
          })

        axios.get('http://localhost:5000/RiskMitigation/')
          .then(res => {
              this.setState({
                  Mitigations: res.data
              })
          })
          .catch((error) => {
            console.log(error);
          })


          axios.get('http://localhost:5000/Risk/')
          .then(res => {
              this.setState({
                  Risk_Types: res.data.map(risk => risk.Risk_Name)
              })
          })
          .catch((error) => {
            console.log(error);
          })


          axios.get('http://localhost:5000/Quarters/')
          .then(res => {
              this.setState({
                  Quarters: res.data.map(quar => quar.Quarter)
              })
          })
          .catch((error) => {
            console.log(error);
          })

        }

    render() {
        var Asst_CIA = this.state.CIAs.filter( cia1 => cia1._id === 
                        Math.max(...this.state.CIAs.filter(cia => cia.APID === cia1.APID && cia.APType === "Asset").map(cia => cia._id)))
                        .map(cia1 => cia1)
        var Asst_HBI = Asst_CIA.filter(cia => cia.Class === "HBI")
        var Risk_Asst = this.state.Risks.filter( risk1 => risk1._id === 
                        Math.max(...this.state.Risks.filter(risk => risk.APID === risk1.APID && risk.APType === "Asset").map(risk => risk._id)))
                        .map(risk1 => risk1)
        var Risk_High = Risk_Asst.filter(risk => risk.Summary === 5)
        var Risk_Mit = this.state.Mitigations.filter( mit1 => mit1._id === 
                        Math.max(...this.state.Mitigations.filter(mit => mit.APID === mit1.APID && mit.APType === "Asset").map(mit => mit._id)))
                        .map(mit1 => mit1)
        var data = {
            labels: ['Total Assets', 'CIA Marked Assets', 'HBI Class', 'Risk Assessment', 'High Risked', 'Risk Mitigation'],
            datasets: [
              {
                label: 'Asset Risk Management Details',
                data: [this.state.Assets.length, Asst_CIA.length, Asst_HBI.length, Risk_Asst.length, Risk_High.length, Risk_Mit.length],
                backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
              },
            ],
          };

          var Asst_Dept = new Set();
          var asst_count = [];
          for(var i=0; i<this.state.Depts.length; i++)
          {
              asst_count[i] = 0;
              var Asst_Id = new Set()
              for(var j=0; j<this.state.Asst_Issue.length; j++)
              {
                  if(this.state.Depts[i].Name === this.state.Asst_Issue[j].Department)
                  {
                      Asst_Id.add(parseInt(this.state.Asst_Issue[j].IssuedID[0]))
                      asst_count[i] += 1;
                  }
              }
              Asst_Dept.add(Array.from(Asst_Id))
          }

          Asst_Dept = Array.from(Asst_Dept)
          var risk_count = [];
          for(var i=0; i<Asst_Dept.length; i++)
          {
            risk_count[i] = 0;
              for(var j=0; j<Asst_Dept[i].length; j++)
              {
                  for(var k=0; k<this.state.Risks.length; k++)
                  {
                      if(Asst_Dept[i][j] === this.state.Risks[k].APID && this.state.Risks[k].APType === "Asset")
                      {
                        risk_count[i] += 1;
                        break;
                      }
                  }
              }
              asst_count[i] = asst_count[i] - risk_count[i];
          }

          const data1 = {
            labels: this.state.Depts.map(dept => dept.Name),
            datasets: [
              {
                label: 'Risk Assessed Assets',
                data: risk_count,
                backgroundColor: 'rgb(54, 162, 235)',
              },
              {
                label: 'Remaining Assets',
                data: asst_count,
                backgroundColor: 'rgb(255, 99, 132)',
              },
            ],
          };
          
          const options = {
            scales: {
              y: {
                stacked: true,
                ticks: {
                  beginAtZero: true
                }
              },
              x: {
                stacked: true
              }
            }
          };
          
          var colors = ['#292da8', '#e922df', '#db8869', '#acdd88', '#af2cd3', '#873f06', '#8e1992', '#2a5d10', '#c5d9a7', '#aa16dd', '#ecfb12', '#b9383f', '#aec20f', '#981294', '#c66ddd', '#2b5812', '#c7cd73', '#3920b7', '#567a20', '#d6008e']
          var colors1 = ['#292da870', '#e922df70', '#db886970', '#acdd8870', '#af2cd370', '#873f0670', '#8e199270', '#2a5d1070', '#c5d9a770', '#aa16dd70', '#ecfb1270', '#b9383f70', '#aec20f70', '#98129470', '#c66ddd70', '#2b581270', '#c7cd7370', '#3920b770', '#567a2070', '#d6008e70']


          var Risk_Type = []
          for(var i=0; i<this.state.Risk_Types.length; i++)
          {
              Risk_Type[i] = 0;
              for(var j=0; j<this.state.Risks.length; j++)
              {
                  if(this.state.Risk_Types[i] === this.state.Risks[j].Risk_Name)
                  {
                      Risk_Type[i] += 1;
                  }
              }
          }
        var data2 = {
            labels: this.state.Risk_Types,
            datasets: [
              {
                label: 'Asset Risk Management Details',
                data: Risk_Type,
                backgroundColor: colors1,
                borderColor:colors,
                borderWidth: 1.2,
              },
            ],
          };

          var Risk_Year = []
          for(var i=0; i<this.state.Quarters.length; i++)
          {
              Risk_Year[i] = 0;
              for(var j=0; j<this.state.Risks.length; j++)
              {
                  if(this.state.Risks[j].Year === this.state.Year && this.state.Risks[j].Quarter === this.state.Quarters[i] && this.state.Risks[j].APType === "Asset")
                  {
                      Risk_Year[i] += 1;
                  }
              }
          }
        var data3 = {
            labels: this.state.Quarters,
            datasets: [
              {
                label: 'Year '+this.state.Year,
                data: Risk_Year,
                backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
              },
            ],
          };

    return (
        <div className="form-box1">
            <div className="row">
                <div className="col" style={{width: '50%', padding: "0 30px"}}>
                    <h3>Assets Wise</h3>
                    <Bar
                    data = {data}
                    height = "200"
                    />
                </div>
                <div className="col" style={{width: '50%'  , padding: "0 30px"}}>
                    <h3>Department Wise</h3>
            
                    <Bar
                    data={data1}
                    options={options}
                    height = "200"
                    />
                </div>
            </div>
            <div className="row">
                <div className="col" style={{width: '50%', padding: "0 30px"}}>
                    <div style={{width: '85%', padding: "0 30px"}}>
                    <h3>Risk Wise</h3>

                    <Pie
                    data = {data2}
                    height = "200"
                    />
                    </div>
                </div>
                <div className="col" style={{width: '50%', padding: "0 30px"}}>
                    <h3>Quarter Wise {this.state.Year}</h3>
                    <Bar
                    data = {data3}
                    height = "200"
                    />
                </div>
            </div>
        </div>
    )
    }
}