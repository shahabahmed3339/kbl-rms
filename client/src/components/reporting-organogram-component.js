import React, { Component } from 'react'  
import axios from 'axios';  
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import './Custom.css';
import UnlockAccess from "./roles/UnlockAccess";
import { Tree, TreeNode } from 'react-organizational-chart';

export class ReportingOrganogram extends Component {
        constructor(props) {
                super(props)
                this.state = {
                        ProductData: [],
                        ProductData1: []

                }
        }
        componentDidMount() {
                axios.get('http://localhost:5000/HR/').then(response => {
                        this.setState({
                                ProductData: response.data
                        });
                });
                axios.get('http://localhost:5000/Department/').then(response => {
                        this.setState({
                                ProductData1: response.data
                        });
                });
        }
        render() {
                return (
                <div className="form-box1">
                <UnlockAccess request={'Admin'}>
                <h3>Reporting Organogram</h3>
                                                <Tree
                                                lineWidth={'1px'}
                                                lineColor={'#3895ff'}
                                                lineBorderRadius={'10px'}
                                                label={<div className="div-1">Founder</div>}>
                                                        {
                                                        this.state.ProductData1.map((p) => {
                                                                return  <>
                                                                        <TreeNode label={<div className="div-1">{p.Name} Department</div>}>
                                                                        {
                                                                        this.state.ProductData.filter(lvl => lvl.Level===1 && lvl.Department===p.Name).map((p1) => {
                                                                                return  <>
                                                                                        <TreeNode label={<div className="div-1">{p1.Designation}<br/>{p1.Name}</div>}>
                                                                                        {
                                                                                        this.state.ProductData.filter(lvl => lvl.Level===2 && lvl.Department===p.Name && lvl.LineManager===p1.Name).map((p2) => {
                                                                                                return  <>
                                                                                                        <TreeNode label={<div className="div-1">{p2.Designation}<br/>{p2.Name}</div>}>
                                                                                                        {
                                                                                                        this.state.ProductData.filter(lvl => lvl.Level===3 && lvl.Department===p.Name && lvl.LineManager===p2.Name).map((p3) => {
                                                                                                                return  <>
                                                                                                                        <TreeNode label={<div className="div-1">{p3.Designation}<br/>{p3.Name}</div>}>
                                                                                                                        {
                                                                                                                        this.state.ProductData.filter(lvl => lvl.Level===4 && lvl.Department===p.Name && lvl.LineManager===p3.Name).map((p4) => {
                                                                                                                                return  <>
                                                                                                                                        <TreeNode label={<div className="div-1">{p4.Designation}<br/>{p4.Name}</div>}>
                                                                                                                                        </TreeNode>
                                                                                                                                        </>
                                                                                                                                        })
                                                                                                                        }
                                                                                                                        </TreeNode>
                                                                                                                        </>
                                                                                                                        })
                                                                                                        }
                                                                                                        </TreeNode>
                                                                                                        </>
                                                                                                        })
                                                                                        }
                                                                                        </TreeNode>
                                                                                        </>
                                                                                        })
                                                                        }
                                                                        </TreeNode>
                                                                        </>
                                                                        })
                                                        }
                                                </Tree>
                </UnlockAccess>
                <UnlockAccess request={'User'}>
                        Page Not Available...
                </UnlockAccess>
                </div>  
                )
        }
}
export default ReportingOrganogram