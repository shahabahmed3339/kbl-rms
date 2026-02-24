import "./Main.css";
import React, { Component } from 'react';
import "../auth/Login.css";
import axios from 'axios';
import {Bar, Pie, Line} from 'react-chartjs-2';

var myCurrentDate = new Date();
var year = myCurrentDate.getFullYear()
var month = (myCurrentDate.getMonth()+1)
var mon = ['07','08','09','10','11','12','01','02','03','04','05','06']
var mon1 = 0
var months = []
if (month > 6)
{
  mon1 = 6 - (12 - month)
  for (var i=0; i<mon1; i++)
  {
    months[i] = year + "-" + mon[i]
  }
}
else
{
  for (var i=0; i<6; i++)
  {
    months[i] = year-1 + "-" + mon[i]
  }
  for (var i=0; i<month; i++)
  {
    months[i+6] = year + "-" + mon[i+6]
  }
}

export default class Main extends Component {
    constructor(props) {
      super(props);
      
  
      this.state = {
        EOBI: 20000,
        EOBILimit: 1 + 5,
        Months: months,
        Taxes: [],
        prvFunds: [],
        EOBIs: [],

      }
    }

    componentDidMount() {
      axios.get('http://localhost:5000/Payroll/')
        .then(res => {
          if (res.data.length > 0) {
            // var Months = []
            var Taxes = []
            var prvFunds = []
            var EOBIs = []

            for (var i=0; i<res.data.length; i++)
            {
              var Tax = 0
              var prvFund = 0
              for (var k=0; k<this.state.Months.length; k++)
              {
                if (res.data[i].Month === this.state.Months[k])
                {
                  for (var j=0; j<res.data[i].Tax.length; j++)
                  {
                    Tax = Tax + res.data[i].Tax[j]
                    prvFund = prvFund + res.data[i].prvFund[j]
                  }
                  var EOBI = (this.state.EOBI * (this.state.EOBILimit/100)) * res.data[i].Tax.length
                  Taxes[k] = Tax
                  prvFunds[k] = prvFund
                  EOBIs[k] = EOBI
                }
              }
              
              this.setState({
                Taxes: Taxes,
                prvFunds: prvFunds,
                EOBIs: EOBIs,
              })
            }
            
          }
        })
        .catch((error) => {
          console.log(error);
        })

  
    }

    
    render () {

      var colors = ["#003f5c","#284976","#554f8a","#865092","#b4508d","#db527c","#f56163","#ff7c43","#488f31", "#69a153", "#87b474", "#a5c796"]
      var data = {
          labels: this.state.Months,
          datasets: [
            {
              label: "Taxes Paid",
              data: this.state.Taxes,
              backgroundColor: colors,
              borderWidth: 1,
            },
          ],
        };

        var data1 = {
            labels: this.state.Months,
            datasets: [
              {
                label: "Provident Funds Paid",
                data: this.state.prvFunds,
                backgroundColor: colors,
                borderWidth: 1,
              },
            ],
          };

          var data2 = {
              labels: this.state.Months,
              datasets: [
                {
                  label: "EOBI Funds Paid",
                  data: this.state.EOBIs,
                  backgroundColor: colors,
                  borderWidth: 1,
                },
              ],
            };
          
          const options = {
            plugins: {
              legend: {
                display: false,
              },
            },
          };

    return(
        <main>
            <div className="main__container">
                        <div className="main__title">
                            <i className="fa fa-warning fa-3x"></i>
                            <div className="main__greeting">
                                <h1>Welcome to Payroll Management</h1>
                            </div>
                        </div>
            </div>
            <div style={{marginTop:'100px', textAlign: "center"}} className="form-box1">
              <div className="row">
                <div className="col-sm-6">
                  <h6>Taxes Paid</h6>
                  <Bar data={data} options={options}/>
                </div>
                <div className="col-sm-6">
                  <h6>Provident Funds Paid</h6>
                  <Bar data={data1} options={options}/>
                </div>
              </div>
              <br/>
              <div className="row">
                <div className="col-sm-6">
                  <h6>EOBI Funds Paid</h6>
                  <Bar data={data2} options={options}/>
                </div>
                <div className="col-sm-6">
                </div>
              </div>
            </div>
        </main>
    )}
}