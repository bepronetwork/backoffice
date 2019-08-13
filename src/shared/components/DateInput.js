
import React, { PureComponent } from 'react';
import TextField from '@material-ui/core/TextField';

class DateInput extends PureComponent {
   
    constructor(props) {
        super(props);
        this.state = {
            showPassword: false,
        };

    }

    changeContent = (type, item) => {
        if(this.props.changeContent){
            this.props.changeContent(type, item)
        }
    }

    render() {
        const { label, defaultValue } = this.props;

        return (
            <TextField
                id="time"
                type="time"
                label={'Hours:Minutes'}
                defaultValue={defaultValue}
                onChange={(e) =>  this.changeContent(this.props.name, e.target.value)}
                InputLabelProps={{
                    shrink: true,
                }}
                inputProps={{
                step: 300, // 5 min
            }}
            />
        );
    }
}

export default DateInput


