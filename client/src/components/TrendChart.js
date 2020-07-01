  
import React, {Component} from 'react';
import {Line} from 'react-chartjs-2';
import { connect } from 'react-redux';

class TrendChart extends Component{
  constructor(props){
    super(props);
    this.state = {
      chartData: {
        labels: ["1", "2", "3", "4", "5", "6", "7", "8"],
        datasets: [
            {
                label: "Demo",
                data: [1, 30, 25, 4, 78, 90, 88, 87],
                borderColor : 'rgba(255,255,192,1)',
                borderCapStyle: 'round',
                fill: true,
            }
          ]
      },
      colors: [
        'rgba(75,192,192,1)',
        'rgba(39,245,94,1)',
        'rgba(250,248,122,1)',
        'rgba(250,84,55,1)',
        'rgba(242,64,245,1)'

      ],
      options:{
        scaleFontColor: 'red',
        scales: {
          xAxes: [{ 
            gridLines: {
                display: true,
                zeroLineColor: '#ffffff'
            },
            ticks: {
              fontColor: "#CCC", 
            },
        }],
        yAxes: [{ 
          gridLines: {
              display: true,
              zeroLineColor: '#ffffff'
          },
          ticks: {
            fontColor: "#CCC", 
          },
      }],
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
  console.log(this.props.gtrendsData);

  if(this.props.gtrendsData.items){
    // data.labels = this.props.gtrendsData.dates;
    
    // data.datasets.forEach((set, i) => {
    // set.backgroundColor = this.setGradientColor(canvas);
    // set.data = this.props.lineChartData.values;
    // set.borderColor = 'rgba(75,192,192,1)';    
    // });
    console.log(this.props.gtrendsData.values);
    var trendData = {
        labels: this.props.gtrendsData.date,
        datasets: []
    };
    for(var i = 0; i < this.props.gtrendsData.items.length; i++){

        trendData.datasets.push({
            label: this.props.gtrendsData.items[i],
            data: this.props.gtrendsData.values[i],
            borderColor : this.state.colors[i],
            borderCapStyle: 'round',
            fill: true,
        });
    }
    return trendData;
  }else{
    data.datasets.forEach((set, i) => {
      set.backgroundColor = this.setGradientColor(canvas);
      set.borderColor = 'rgba(75,192,192,1)';    
      });
  }

  
  return data;

}


  render(){


    return (
      <div style={{position: "relative", width: 1000, height: 600}}>
        <Line className="chartjs-render-monitor" data={this.getChartData} options={this.state.options}/>
      </div>
      
    );
  }
}


const mapStateToProps = (state) =>{
    return {gtrendsData: state.gtrendsData};
  };
export default connect(mapStateToProps)(TrendChart);