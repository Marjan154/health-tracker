import React, {Component} from 'react'
import CanvasJSReact from './canvasjs.react.js'
//var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
// import CanvasJS from CanvasJSReact.CanvasJS;
// import CanvasJSChart from CanvasJSReact.CanvasJSChart;

class Graph extends Component {
    constructor(props) {
      super(props);
      this.state = {};
    }

    render() {
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
          type: "column",
          dataPoints: [
            { x: 1, label: "12/1/19",  y: 10  },
            { x: 2, label: "12/2/19", y: 15  },
            { x: 3, label: "12/3/19", y: 25  },
            { x: 4, label: "12/4/19",  y: 30  },
            { x: 5, label: "12/5/19",  y: 28  },
            { x: 6, label: "12/6/19",  y: 28  },
            { x: 7, label: "12/7/19",  y: 28  },
            { x: 8, label: "12/8/19",  y: 28  },
            { x: 9, label: "12/9/19",  y: 28  },
            { x: 10, label: "12/10/19",  y: 28  },
            { x: 11, label: "12/19/19",  y: 28  },
            { x: 12, label: "12/11/19",  y: 28  },
            { x: 13, label: "12/12/19",  y: 28  },
            { x: 14, label: "12/13/19",  y: 28  },
            { x: 15, label: "12/14/19",  y: 28  },
            { x: 16, label: "12/15/19",  y: 28  },
            { x: 17, label: "12/16/19",  y: 28  },
            { x: 18, label: "12/17/19",  y: 28  },
            { x: 19, label: "12/18/19",  y: 28  }
          ]
        }
        ]
      }

    return (
      <CanvasJSChart options = {options}></CanvasJSChart>
        
      // <svg/>
    );
	}
}

export default Graph;