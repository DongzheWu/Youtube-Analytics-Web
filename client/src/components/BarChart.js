import React, {Component} from 'react';
import {Bar} from 'react-chartjs-2';

class BarChart extends Component{
  constructor(props){
    super(props);
    this.state = {
      chartData: {
        labels: ["Video1", "Video2", "Video3", "Video4", "Video5", "Video6", "Video7", "Video8", "Video9", "Video10"],
        datasets: [{
            label: "View Count",
            data: [478,267,734,784,433,555,1000,132,777,333]
          }]
      },

      options:{
        legend: {
          labels: {
              fontColor: "white",
              fontSize: 15
          },

        },
        plugins: {
            labels: {
                render: 'percentage',
                fontColor: '#fff',
                precision: 2,
                position: 'outside',
                textMargin: 12
            }
      },
      scales: {
        xAxes: [{ 
          gridLines: {
              display: true,
              zeroLineColor: '#ffffff'
          },
          ticks: {
            fontColor: "white", 
            fontSize: 12,
            callback: function(value) {
                return value.substr(0, 10);
            },
          },
      }],
      yAxes: [{ 
        gridLines: {
            display: true,
            zeroLineColor: '#ffffff'
        },
        ticks: {
          fontColor: "white", 
          fontSize: 12
        },
    }],
      }
      }
    }



}
setGradientColor = (canvas) => {
  const ctx = canvas.getContext('2d');
  const gradient = ctx.createLinearGradient(0, 0, 0, 400);
  gradient.addColorStop(0, "rgba(32, 73, 219, 1)");
  gradient.addColorStop(1, "rgba(42, 242, 112, 1)");

  return gradient;
}

getChartData = canvas =>{
  const data = this.state.chartData;
  console.log(this.props.chartData);

  if(this.props.data){

    


    data.datasets.forEach((set, i) => {
        set.backgroundColor = this.setGradientColor(canvas);
        set.data = this.props.data;
         
        });
    data.labels = this.props.labels;  

    return data;
  }else{
    data.datasets.forEach((set, i) => {
      set.backgroundColor = this.setGradientColor(canvas);   
      });

      return data;
  }

  
  

}


  render(){


    return (
      
        <Bar className="chartjs-render-monitor" data={this.getChartData} options={this.state.options}/>
      
      
    );
  }
}



export default BarChart;