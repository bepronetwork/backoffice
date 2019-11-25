/* eslint-disable react/no-array-index-key */
import React, { PureComponent } from 'react';
import { Card, CardBody, Col, Row } from 'reactstrap';
import store from '../../../App/store';
import { setModal, MODAL_TYPES } from '../../../../redux/actions/modal';
import Numbers from '../../../../services/numbers';
const edit = `${process.env.PUBLIC_URL}/img/dashboard/edit.png`;

class AffiliateInfo extends PureComponent {
 
    constructor() {
        super();
        this.state = {

        };
    }

    renderInfo = ({title, info, span}) => {
        return (
            <>
                <p className='text-small'> {title} </p>
                <p> {info} </p>
                <span className='secondary-text'> {span} </span>
            </>
        )
    }

    openModal = async () => {
        const { user } = this.props;
        await store.dispatch(setModal({MODAL_TYPE : MODAL_TYPES.USER_AFFILIATE_EDIT, data : {user}}));
    }

    render() {
        const { user } = this.props;
        const { isCustom, affiliateStructure } = user.affiliateLink;
        const { percentageOnLoss } = affiliateStructure;
        
        return (
            <Row>
                <Col lg={12}>
                    <div className="dashboard__visitors-chart">
                            <h5 className="pink-text" style={{marginBottom : 10}}> Affiliate Structure
                            <button onClick={this.openModal} className='button-hover edit-button'> <img className='small-icon' src={edit}/></button></h5>
                    </div>
                    <Row>
                        <Col sm={4}>
                            {this.renderInfo({title : 'Percentage (%)', info : `${ Numbers.toFloat(percentageOnLoss*100)}%`, span : isCustom ? 'Custom' : 'Regular'})}
                        </Col> 
                    </Row>
                </Col>
            </Row>
        );
    }
}

export default AffiliateInfo;
