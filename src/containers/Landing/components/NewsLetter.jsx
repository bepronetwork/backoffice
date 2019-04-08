import React from 'react';
import { Col, Row, Container } from 'reactstrap';
import CheckIcon from 'mdi-react/CheckIcon';
import TextInput from '../../../shared/components/TextInput';
import { EmailIcon } from 'mdi-react';
const back = `${process.env.PUBLIC_URL}/img/landing/back-3.png`;
const bpro = `${process.env.PUBLIC_URL}/img/betprotocol-logo-white.png`;


class NewsLetter extends React.Component{
    constructor(props){super(props); this.state = {}}

    changeContent = (type, item) => {
        this.setState({[type] : item});
    }

    render = () => {
        return(
            <section className="landing__section ">
            <div className=''>
                 <img className="landing_3_back" src={back} />
             </div>
             <Container className='container__all__landing newsletter-section'>  
                <Row>
                    <Col lg={12}>
                        <h3 className="landing__section-title">Want to Know More?</h3>
                        <a href={'https://www.t.me/betprotocol'} target={'__blank'}
                        >
                            <button style={{width : 200, marginTop : 50}} className="btn btn-primary account__btn">
                                🏇 Join the conversation
                            </button>
                        </a>
                    </Col>
              
                </Row>
               
             </Container>
         </section>
        )
    }

}

export default NewsLetter;
