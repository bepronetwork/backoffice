import React, { Component } from 'react';
import { Input } from 'reactstrap';

class BooleanInput extends Component {

    changeContent = (type, item) => {
        if(this.props.changeContent){
            this.props.changeContent(type, item)
        }
    }

    render() {
        return (
          <div style={ {marginTop: '1rem'}}>
            <p style={{fontSize: '1rem'}}>{this.props.label}</p>
            <Input 
              onChange={(e) =>  this.changeContent(this.props.name, e.target.value)} 
              type="select" name="select"
              style={{width: '90%', marginTop: '.5rem'}} 
              disabled={this.props.disabled}>
                <option>{this.props.isActive? 'True' : 'False'}</option>
                <option>{this.props.isActive? 'False' : 'True'}</option>
            </Input>
          </div>
        );
    }
}

export default BooleanInput;


