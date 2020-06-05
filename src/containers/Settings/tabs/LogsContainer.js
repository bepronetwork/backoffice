import React from 'react';
import { Paper } from '@material-ui/core';
import LogsTable from './Components/LogsTable';


export default class LogsContainer extends React.Component{

    render = () => {

        return (
            <div>               
                <p className="dashboard__visitors-chart-title text-left" style={{fontSize : 18, marginBottom : 10}}> Logs </p>
                <hr/>
                <Paper style={{ padding: 25, borderRadius: "10px", border: "solid 1px rgba(164, 161, 161, 0.35)", backgroundColor: "#fafcff", boxShadow: "none" }} >
                    <LogsTable/>
                </Paper>
          </div>
        )
    }

};
