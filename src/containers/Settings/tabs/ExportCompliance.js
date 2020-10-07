import React from 'react';
import { connect } from "react-redux";
import { DatePicker } from 'antd';
import moment from 'moment';

import { Actions, Container } from './styles'
import { Button, Paper, Typography } from '@material-ui/core';
import { TableIcon } from 'mdi-react';

import _ from 'lodash'

const { RangePicker } = DatePicker;

const paperStyle = {
    padding: 15, 
    borderRadius: "10px",
    border: "solid 1px rgba(164, 161, 161, 0.35)", 
    backgroundColor: "#fafcff", 
    boxShadow: "none"
}

const buttonStyle = {
    textTransform: "none", 
    backgroundColor: "#008000", 
    color: "#ffffff", 
    boxShadow: "none", 
    maxWidth: 150
}


class ExportCompliance extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            isLoading: false,
            begin_at: moment().utc().format('YYYY-MM-DD'),
            end_at: moment().utc().format('YYYY-MM-DD')
        };
    }

    onChangeDate = (_value, dateString) => {
        const [begin_at, end_at] = dateString;

        this.setState({
            begin_at: begin_at,
            end_at: end_at
        })
    }

    downloadFiles = (files) => {
        files && files.forEach(function (value, idx) {
            const response = {
              file: value.link,
            };
            setTimeout(() => {
                window.location.href = response.file;
            }, idx * 100)
        })
    }

    handleDownloadFile = async () => {
        const { profile } = this.props;
        const { begin_at, end_at } = this.state;

        const app = profile.getApp();

        this.setState({ isLoading: true })

        const response = await app.getComplianceFile({
            size: 200,
            offset: 0,
            begin_at,
            end_at
        })

        if (response.data.message) {
            const list = response.data.message.list;

            if (!_.isEmpty(list)) {
                this.downloadFiles(list.concat(list))
            }
        }

        this.setState({ isLoading: false })
    }

    disabledDate = (current) => {
        return current && current > moment().endOf('day');
    }

    render = () => {
        const { isLoading, begin_at, end_at } = this.state;

        return (       
            <Paper style={paperStyle}>
                <Container>
                    <Typography style={{ fontSize: 17 }} variant="h6" id="tableTitle">Download users balance</Typography>
                    <br/>
                    <Actions>
                    <RangePicker 
                        defaultValue={[moment().utc(), moment().utc()]}
                        onChange={this.onChangeDate}
                        disabledDate={this.disabledDate}
                        ranges={{
                            'Today': [moment().utc(), moment().utc()],
                            'Yesterday': [moment().subtract(1, 'days').utc(), moment().subtract(1, 'days').utc()],
                            'Last 7 days': [moment().subtract(7, 'days').utc(), moment().utc()],
                            'Last 15 days': [moment().subtract(15, 'days').utc(), moment().utc()],
                            'Last month': [moment().subtract(1, 'month').utc(), moment().utc()]
                        }}/>
                    <Button variant="contained" size="small" style={buttonStyle} disabled={!begin_at || !end_at || isLoading} onClick={() => this.handleDownloadFile()}>
                        <TableIcon style={{marginRight: 7}}/> { isLoading ? 'Downloading...' : 'Download' } 
                    </Button>
                    <div></div>
                    </Actions>
                </Container>
            </Paper>   
        )
    }

}


function mapStateToProps(state){
    return {
        profile: state.profile
    };
}

export default connect(mapStateToProps)(ExportCompliance);

