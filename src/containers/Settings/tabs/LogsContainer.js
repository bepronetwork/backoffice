import React from 'react';
import { Paper } from '@material-ui/core';
import LogsTable from './Components/LogsTable';


export default class LogsContainer extends React.Component{

    render = () => {

        return (
            <div>               
                <p className="dashboard__visitors-chart-title text-left" style={{fontSize : 18, marginBottom : 10}}> Logs </p>
                <hr/>
                <Paper style={{ boxShadow: "0 10px 30px 1px rgba(0, 0, 0, 0.06)", padding: 25 }} >
                    <LogsTable/>
                </Paper>
          </div>
        )
    }

};
