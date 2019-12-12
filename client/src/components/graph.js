import React, { Component } from "react";
import CanvasJSReact from "./canvasjs.react.js";
import axios from "axios";
import { connect } from "react-redux";
import moment from "moment";

//var CanvasJS = CanvasJSReact.CanvasJS;

var CanvasJSChart = CanvasJSReact.CanvasJSChart;
// import CanvasJS from CanvasJSReact.CanvasJS;
// import CanvasJSChart from CanvasJSReact.CanvasJSChart;

class Graph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      waterlog: [],
      waterDatatodisplayonGraph: [],
      startDate: new Date(),
      weekBefore: new Date()
    };
  }

  componentDidMount() {
    this.props.onRef(this);
    this.getData();
  }

  getData = () => {
    const { healthlabel } = this.props;
    const useremail = this.props.email;
    let url = `http://localhost:5000/api/${healthlabel}/groupbyday`;
    axios
      .get(url, {
        params: {
          email: useremail
        }
      })
      .then(res => {
        const data = res.data;
        this.setState({ waterlog: res.data });
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    const { healthlabel, graphyAxis, title } = this.props;
    const { waterlog } = this.state;
    const sorted = waterlog.sort((a, b) => {
      return new Date(a.date) - new Date(b.date);
    })
    let records = sorted.map(waterData => {
      return {
        label: waterData.date,
        y: parseInt(waterData.total)
      };
    });

    const options = {
      animationEnabled: true,
      // zoomEnabled: true,
      // zoomType: "x",

      title: {
        text: title,
        fontColor: "#91b0ff"
      },
      axisX: {
        title: "DATES",
        titleFontColor: "#91b0ff",
        labelAngle: 120
        // viewportMinimum: this.state.weekBefore,
        // viewportMaximum: this.state.startDate
      },
      axisY: {
        title: graphyAxis,
        titleFontColor: "#91b0ff"
      },
      data: [
        {
          // Change type to "doughnut", "line", "splineArea", etc.
          //label=x-axis
          //y=values
          type: "column",
          dataPoints: records
          // [
          //   { label: "12/1/19",  y: 10,  x: 1 },
          //   { label: "12/2/19", y: 15, x: 2 },
          //   { label: "12/3/19", y: 25, x: 3  },
          // ]
        }
      ]
    };

    return (
      <div>
        <CanvasJSChart options={options}></CanvasJSChart>
      </div>
    );
  }
}

const mapState = state => {
  return {
    //user: state.user.user.user,
  };
};

export default connect(mapState, null)(Graph);

// export default Graph;
