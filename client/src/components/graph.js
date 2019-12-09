import React, {Component} from 'react'
import CanvasJSReact from './canvasjs.react.js'
import axios from "axios";
import { connect } from "react-redux";

//var CanvasJS = CanvasJSReact.CanvasJS;

var CanvasJSChart = CanvasJSReact.CanvasJSChart;
// import CanvasJS from CanvasJSReact.CanvasJS;
// import CanvasJSChart from CanvasJSReact.CanvasJSChart;

class Graph extends Component {
    constructor(props) {
      super(props);
      this.state = {
        waterlog:[],
        waterDatatodisplayonGraph:[]
      };
    }

    componentDidMount() {
    const useremail=this.props.email;
    //console.log(this.props.user.email);
    let url = "http://localhost:5000/api/water/all";
    axios
      .get(url, {
        params: {
          email: useremail
        }
      })
      .then(res => {
        console.log(res);
        console.log(res.data);
        const data = res.data;
        this.setState({ waterlog: res.data });
        // alert("Succesfully retrieved");
        // this.setState({ redirect: true });
      })
      .catch(error => {
        console.log(error);
      });
    }

    render() {
      let records = this.state.waterlog.map(waterData =>{
        return {
          label: waterData.createdAt,
          y: parseInt(waterData.amount)
        }
          // const newData={
          //   x: waterData.createdAt,
          //   y: waterData.amount
          // }
          // this.setState({ waterDatatodisplayonGraph: [this.state.waterDatatodisplayonGraph, newData] }, ()=>{
          //   console.log(this.state.waterData)
          // })
      });

      console.log(records)

      const options = {
        animationEnabled: true,
        title: {
          text: "Set whatever we want"
        },
        axisX: {
          title: "DATES",
          labelAngle: 120,
        },
        axisY: {
          title: "Water Intake (oz)",
        },
        data: [
        {
          // Change type to "doughnut", "line", "splineArea", etc.
          //label=x-axis
          //y=values
          type: "line",
          dataPoints:records
          // [
          //   { label: "12/1/19",  y: 10,  x: 1 },
          //   { label: "12/2/19", y: 15, x: 2 },
          //   { label: "12/3/19", y: 25, x: 3  },
          // ]
        }
        ]
      }

    return (
      <CanvasJSChart options = {options}></CanvasJSChart>
    );
	}
}

const mapState = state => {
  return {
    //user: state.user.user.user,
  };
};

export default connect(
  mapState,
  null
)(Graph);


// export default Graph;