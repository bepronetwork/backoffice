import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import { translate } from 'react-i18next';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { compose } from 'lodash/fp'
import { EditableTable, InfoNumericCard } from '../../components';
import Switch from '@material-ui/core/Switch';

const defaultState = {
    percentageOnLossTotal : 0,
    affiliateStructures : []
}

class AffiliatesContainer extends React.Component{

    constructor(props){
        super(props)
        this.state = defaultState;
    }

    componentDidMount(){
        this.projectData(this.props)
    }

    componentWillReceiveProps(props){
        this.projectData(props);
    }

    projectData = (props) => {
        const { profile } = props;
        const affiliateInfo = profile.getApp().getSummaryData('affiliates').data;
        this.setState({...this.state,
            affiliateStructures : affiliateInfo.affiliateStructures,
            percentageOnLossTotal : affiliateInfo.affiliateStructures.reduce( (acc, v) => {
                if(v.isActive){
                    return parseFloat(v.percentageOnLoss)+acc
                }else{
                    return acc;
                }
            },0)*100
        })

    }

    onChange = async (new_data) => {
        const { profile } = this.props;
        new_data = new_data.map(i => {
            let pl = parseFloat(i.percentageOnLoss);
            if(i.isNew){
                pl = parseFloat(pl/100)
            }
            if(i.isActive != true){return null }
            return {level : parseInt(i.level), percentageOnLoss : pl}
        }).filter(el => el != null)
        let res = await profile.getApp().editAffiliateStructure({structures : new_data});
        // Test if 200
        await profile.getData();
    }



    render = () => {
        const { affiliateStructures, percentageOnLossTotal } = this.state;
        const lastRowLevelActive = affiliateStructures.reduce( (acc, i) => {
            if(i.isActive){
                return i.level;
            }else{
                return acc;
            }
        }, 0)
        return (
            <Container className="dashboard">
                <Row>
                    <Col md={4}>
                        <InfoNumericCard 
                            title={'Affiliate Cut'}
                            subtitle={'How much affiliates make on % of house wins'}
                            ticker={'%'}
                            amount={percentageOnLossTotal}
                        />
                       
                    </Col>
                  
                </Row>
                <Row>
                    <Col md={5}>
                        <EditableTable
                            title={'Affiliate Structure'}
                            onChange={this.onChange}
                            compareField={'level'}
                            columns={[
                                { title: 'Level', field: 'level', type : 'numeric', initialEditValue : affiliateStructures.length + 1, editable : 'never'},
                                { title: 'Affiliate Fee (%) ', field: 'percentageOnLoss', type : 'numeric', render : rowData => { return `${rowData.percentageOnLoss}%`} },
                                { title: 'Active', field: 'isActive', lookup : { 1 : 'Yes' , 0 : 'No'}, initialEditValue : 1, 
                                render : rowData => {
                                    return <Switch color="primary" checked={rowData.isActive} value={`checkedActive-${rowData.level}`} inputProps={{ 'aria-label': 'primary checkbox' }} />
                                },
                                editComponent: props => {
                                    const { rowData, onChange } = props;
                                    return (
                                        <Switch disabled={rowData.level > (lastRowLevelActive + 1)} color="primary" checked={rowData.isActive} onChange={e => onChange( !rowData.isActive ? 1 : 0)} value={`checkedActive-${rowData.level}`} inputProps={{ 'aria-label': 'primary checkbox' }} />
                                    )
                                }}
                            ]}
                            rawData={affiliateStructures}
                            data={affiliateStructures.map( v => {
                                return {
                                    level: v.level, 
                                    percentageOnLoss: `${v.percentageOnLoss*100}`,
                                    isActive : v.isActive ? 1 : 0
                                }
                            })}
                        />
                    </Col>
                </Row>
            </Container>
        )
    }

}



function mapStateToProps(state){
    return {
        profile: state.profile
    };
}

AffiliatesContainer.propTypes = {
    t: PropTypes.func.isRequired
};


export default compose(
    translate('common'),
    connect(mapStateToProps)
)(AffiliatesContainer);

