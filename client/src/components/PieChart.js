import React, {Component} from 'react';
import {Pie} from 'react-chartjs-2';

class PieChart extends Component{
  constructor(props){
    super(props);
    this.state = {
      chartData: {
        labels: ["2020", "2019", "2018", "2017", "2016", "Others"],
        datasets: [{
            label: "Published Years",
            backgroundColor: ["#24C9F6", "#2af270","#f7f794","#f74545","#f745e5", "#9b34eb"],
            data: [2478,5267,734,784,433,321]
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

        }
      }
    }



}
setGradientColor = (canvas) => {
  const ctx = canvas.getContext('2d');
  const gradient = ctx.createLinearGradient(0, 0, 500, 400);
  gradient.addColorStop(0, "rgba(75,192,192,0.8)");
  gradient.addColorStop(1, "rgba(75,192,192,0)");
  return gradient;
}

getChartData = canvas =>{
  const data = this.state.chartData;
  console.log(this.props.chartData);

  if(this.props.chartData){

    


    var PieData = {
        labels: this.props.chartData.labels,
        datasets: [{
            label: this.props.chartData.datasets.label,
            backgroundColor: this.props.chartData.datasets.backgroundColor,
            data: this.props.chartData.datasets.data
          }]
    };

    return PieData;
  }else{

      return data;
  }

  
  

}


  render(){


    return (
      
        <Pie className="chartjs-render-monitor" data={this.getChartData()} options={this.state.options}/>
      
      
    );
  }
}



export default PieChart;