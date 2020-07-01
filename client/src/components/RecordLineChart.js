  
import React, {Component} from 'react';
import {Line} from 'react-chartjs-2';
import { connect } from 'react-redux';

class RecordLineChart extends Component{
  constructor(props){
    super(props);
    this.state = {
      chartData: {
        labels: ["1", "2", "3", "4", "5"],
        datasets: [
            {
                label: "Demo",
                data: [1, 2, 3, 4, 5, 6],
                borderColor : 'rgba(75,192,192,1)',
                borderCapStyle: 'round',
                fill: true,
            }
          ],

      },


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

  if(this.props.lineChartData.redates){
    data.labels = this.props.lineChartData.redates;
    data.datasets.forEach((set, i) => {
    set.backgroundColor = this.setGradientColor(canvas);
    set.data = this.props.lineChartData.values;
    set.borderColor = 'rgba(75,192,192,1)';    
    });
  }else{
    data.datasets.forEach((set, i) => {
      set.backgroundColor = this.setGradientColor(canvas);
      set.borderColor = 'rgba(75,192,192,1)';    
      });
  }

  
  return data;

}


  render(){
    if(this.props.lineChartData.redates){
      return (
        <div style={{position: "relative", width: 600, height: 550}}>
        <Line data={this.getChartData} />
      </div>
      );
    }else{
      return <div></div>;
    }


  }
}


const mapStateToProps = (state) =>{
    return {lineChartData: state.lineChartData};
  };
export default connect(mapStateToProps)(RecordLineChart);