import React from 'react';
import { forwardRef } from 'react';
import { Card, CardBody } from 'reactstrap';

import MaterialTable from 'material-table';
import AddBox from '@material-ui/icons/AddBox';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  };

class EditableTable extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            columns: [],
            data: []
        }
    }


    componentDidMount(){
        this.projectData(this.props)
    }

    componentWillReceiveProps(props){
        this.projectData(props);
    }

    projectData = (props) => {
        const { title,  data, columns, compareField } = props;
        this.setState({...this.state, 
            title,
            data,
            compareField,
            columns
        })
    }   

    /* Edits */

    onRowAdd = async (newData) => {
        const { onChange, rawData } = this.props;
        newData.isNew = true;
        rawData.push(newData);
        await onChange(rawData);
        
    }

    onRowUpdate = async (newData, oldData) => {
        const { onChange, rawData } = this.props;
        const { compareField } = this.state;
        newData.isNew = true;
        var index = rawData.findIndex(x => x[compareField] == newData[compareField]);
        rawData[index] = newData;
        await onChange(rawData);

    }

    onRowDelete = async (oldData) => {
        const { onChange, rawData } = this.props;
        const { compareField } = this.state;
        var index = rawData.findIndex(x => x[compareField] == oldData[compareField]);
        if (index > -1) {
            rawData.splice(index, 1);
        }
        await onChange(rawData);
    }


    /* Render */

    render = () => {
        const { enableAdd=true, enableUpdate=true, enableDelete=true, isEditable=true } = this.props;
        const { title, data, columns} = this.state;
        return (
            <Card>
                <CardBody className="dashboard__card-widget">
                    <MaterialTable
                        icons={tableIcons}
                        title={title}
                        columns={columns}
                        data={data}
                        editable={
                            isEditable ?
                                enableAdd && enableUpdate && enableDelete ?
                                {
                                    onRowAdd: newData =>
                                        new Promise(async resolve => {
                                            await this.onRowAdd(newData);
                                            resolve();
                                    }),
                                    onRowUpdate: (newData, oldData)=>
                                        new Promise(async resolve => {
                                            await this.onRowUpdate(newData, oldData);
                                            resolve();
                                    }),
                                    onRowDelete: newData =>
                                        new Promise(async resolve => {
                                            await this.onRowDelete(newData);
                                            resolve();
                                    })
                                }
                                :
                                enableAdd && enableUpdate && !enableDelete ?
                                {
                                    onRowAdd: newData =>
                                        new Promise(async resolve => {
                                            await this.onRowAdd(newData);
                                            resolve();
                                    }),
                                    onRowUpdate: (newData, oldData)=>
                                        new Promise(async resolve => {
                                            await this.onRowUpdate(newData, oldData);
                                            resolve();
                                    })
                                }
                                :
                                enableAdd && !enableUpdate && enableDelete ?
                                {
                                    onRowAdd: newData =>
                                        new Promise(async resolve => {
                                            await this.onRowAdd(newData);
                                            resolve();
                                    }),
                                    onRowDelete: newData =>
                                        new Promise(async resolve => {
                                            await this.onRowDelete(newData);
                                            resolve();
                                    })
                                }
                                :
                                !enableAdd && enableUpdate && enableDelete ?
                                {
                                    onRowUpdate: (newData, oldData)=>
                                        new Promise(async resolve => {
                                            await this.onRowUpdate(newData, oldData);
                                            resolve();
                                    }),
                                    onRowDelete: newData =>
                                        new Promise(async resolve => {
                                            await this.onRowDelete(newData);
                                            resolve();
                                    })
                                }
                                :
                                enableAdd && !enableUpdate && !enableDelete ?
                                {
                                    onRowAdd: newData =>
                                        new Promise(async resolve => {
                                            await this.onRowAdd(newData);
                                            resolve();
                                    })
                                }
                                :
                                !enableAdd && enableUpdate && !enableDelete ?
                                {
                                    onRowUpdate: (newData, oldData)=>
                                        new Promise(async resolve => {
                                            await this.onRowUpdate(newData, oldData);
                                            resolve();
                                    })
                                }
                                :
                                !enableAdd && !enableUpdate && !enableDelete ?
                                {
                                    onRowDelete: newData =>
                                        new Promise(async resolve => {
                                            await this.onRowDelete(newData);
                                            resolve();
                                    })
                                }
                                :
                                null
                            :
                            null
                        }
                    />
                </CardBody>
            </Card>
          );
    }
}



export default EditableTable;