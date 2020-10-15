/* eslint-disable react/no-array-index-key */
import React, { PureComponent } from 'react';
import { CardBody, Col, Row, Button } from 'reactstrap';
import { AddIcon } from 'mdi-react';

class LanguageStoreContainer extends PureComponent {
 
    constructor() {
        super();
        this.state = {
            isLoading: false
        };
    }

    handleAddLanguage = async () => {
        const { addLanguage, language } = this.props;

        this.setState({ isLoading: true })

        await addLanguage(language.prefix);

        this.setState({ isLoading: false })
    }

    render() {
        const { language, isAdded } = this.props;
        const { isLoading } = this.state;

        if(!language){return null}

        const { name, logo, prefix } = language;
        
        return (
            <CardBody className="dashboard__card-widget" style={{ minHeight: 120, minWidth: 241, borderRadius: "10px", border: "solid 1px rgba(164, 161, 161, 0.35)", backgroundColor: "#fafcff", boxShadow: "none", padding: 20 }}>
                <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                <img className='application__game__image' 
                        style={{display: 'block', width: '60px', margin: "0px 10px" }} 
                        src={logo}/>

                <div className="dashboard__visitors-chart text-left" style={{ margin: "0px 10px" }}>
                    <p className="dashboard__visitors-chart-title text-left" style={{fontSize : 20}}> {name} </p>
                    <p className="text-left secondary-text"> {prefix} </p>
                </div>
                </div>

                <hr/>
                        
                <Button disabled={isLoading || isAdded} style={{margin : 0, marginTop : 10}} className="icon" onClick={this.handleAddLanguage} >
                    {   
                        isLoading ?
                            "Adding"
                        : isAdded ? 
                            "Added"
                        : 
                            <p><AddIcon className="deposit-icon"/> Add </p>
                    }
                </Button>
            </CardBody>
        );
    }
}

export default LanguageStoreContainer;
