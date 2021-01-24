import React from 'react';
import { connect } from 'react-redux';
import { Button} from 'react-bootstrap';
import { deleteTrend, getGTrend, getTopics } from '../actions';
import '../assets/css/TrendItem.css';
import {DropdownButton, Dropdown} from 'react-bootstrap';


class TrendList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
          trendArr: [],
          length: "1 year",
          country: "Global"
        };
    }
    componentDidMount(){
      this.props.getTopics();
    }

    toggleCheckbox = e => {
        if (e.target.checked){
            this.setState({
                trendArr: [...this.state.trendArr, e.target.value]
            });
      
        } else {
          this.setState({
                trendArr: this.state.trendArr.filter(element => element !== e.target.value)
          });
      
        }
      }

      submitTrend = () => {
        if(this.state.trendArr.length > 0 && this.state.trendArr.length <= 5){
            this.props.getGTrend(this.state.trendArr, this.state.length, this.state.country);
        }
      }


  renderList = (trends) =>{

    return Object.keys(trends).map(index => {
 
        return (
            <div className="trend-item" key={trends[index].topicId}>
            <label>
              <input
              className="check-box"
              value={trends[index].topic}
                type="checkbox"

                onChange={this.toggleCheckbox}
              />
            </label>
            <span>{trends[index].topic}</span>
            

            <i class="fas fa-times" onClick={() =>{this.props.deleteTrend(trends[index].topicId)}}></i>
           </div>
        );
      });
    
  }
  dropdownClick = (value) => {
    
    this.setState({
      length: value
  });

  }
  dropdownCountry = (value) => {
    this.setState({
      country: value
    });
  }


  render(){

    if(this.props.trends){


        return (
          <div style={{ marginBottom: "30px"}}>
           
              
            {this.renderList(this.props.trends)}
        
            <DropdownButton className="btn-display" id="dropdown-item-button" title={this.state.length}>
            <Dropdown.Item onClick = {(e) => this.dropdownClick(e.target.textContent)}>7 DAYS</Dropdown.Item>
              <Dropdown.Item onClick = {(e) => this.dropdownClick(e.target.textContent)}>1 YEAR</Dropdown.Item>
              <Dropdown.Item onClick = {(e) => this.dropdownClick(e.target.textContent)}>5 YEARS</Dropdown.Item>
              <Dropdown.Item onClick = {(e) => this.dropdownClick(e.target.textContent)}>FULL</Dropdown.Item>
            </DropdownButton>

            <DropdownButton className="btn-display" id="dropdown-item-button" title={this.state.country}>
            <Dropdown.Item onClick = {(e) => this.dropdownCountry(e.target.textContent)}>Global</Dropdown.Item>
              <Dropdown.Item onClick = {(e) => this.dropdownCountry(e.target.textContent)}>USA</Dropdown.Item>
              <Dropdown.Item onClick = {(e) => this.dropdownCountry(e.target.textContent)}>China</Dropdown.Item>
              <Dropdown.Item onClick = {(e) => this.dropdownCountry(e.target.textContent)}>Vietnam</Dropdown.Item>
            </DropdownButton>
            <Button className="btn-display btn-sumbit" variant="primary" type="submit" onClick={this.submitTrend}>Submit</Button>
            <div>
              <p>Add keywords you want to search, select at most five keywords, then click Submit to get search trend lines</p>
            </div>
        

          </div>
        );
    }else{
        return <div></div>;

    }

  
  }
}


function mapStateToProps(state) {
  return {
    trends: state.trends,
    auth: state.auth
  };
}



export default connect(mapStateToProps, {deleteTrend: deleteTrend, 
  getGTrend: getGTrend, getTopics: getTopics})(TrendList);