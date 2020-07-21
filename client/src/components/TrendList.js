import React from 'react';
import { connect } from 'react-redux';
// import TrendItem from './TrendItem';
import { Button} from 'react-bootstrap';
import { deleteTrend, getGTrend, saveTrend, getTopics } from '../actions';
import '../assets/css/TrendItem.css';
import {DropdownButton, Dropdown, Container} from 'react-bootstrap';


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
        console.log(e.target.value);
        if (e.target.checked){
            this.setState({
                trendArr: [...this.state.trendArr, e.target.value]
            });
      
        } else {
          this.setState({
                trendArr: this.state.trendArr.filter(element => element !== e.target.value)
          });
      
        }
        console.log(this.state.trendArr);
      }

      submitTrend = () => {
        console.log("submit");
        if(this.state.trendArr.length > 0 && this.state.trendArr.length <= 5){
            this.props.getGTrend(this.state.trendArr, this.state.length, this.state.country);
        }
      }

      saveFunction = () =>{
        console.log("save1");
        this.props.saveTrend(this.props.trends);
      }



  renderList = (trends) =>{

    return Object.keys(trends).map((trend, index) => {
 
        return (
            <div className="trend-item">
            <label>
              <input
              className="check-box"
              value={trends[index]}
                type="checkbox"

                onChange={this.toggleCheckbox}
              />
            </label>
            <span>{trends[index]}</span>
            

            <i class="fas fa-times" onClick={() =>{this.props.deleteTrend(trends[index])}}></i>
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
    console.log(value);
    this.setState({
      country: value
    });
  }

  saveButton = () =>{
    if(this.props.auth){
      console.log(this.props.auth);
      return (<div><Button className="btn-display btn-sumbit" variant="success" type="submit"onClick={this.saveFunction}>Save</Button></div>);
      
    }else{
      console.log("no auth");
      return <span></span>;
    }
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
              {this.saveButton()}

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
  getGTrend: getGTrend, saveTrend: saveTrend, getTopics: getTopics})(TrendList);