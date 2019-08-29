import React from 'react';
import { Col, Row, Container } from 'reactstrap';
import CheckIcon from 'mdi-react/CheckIcon';
const sports = `${process.env.PUBLIC_URL}/img/landing/sports.png`;

const backoffice = `${process.env.PUBLIC_URL}/img/widgets/backoffice.png`;
const back = `${process.env.PUBLIC_URL}/img/landing/back-3.png`;


const Markets = () => (
    <section className="landing__section" style={{marginTop : 100}}>
        <Container style={{textAlign : 'right'}}>
            <h3 className="landing__section-title"> Powered by the Future of Technology </h3>
            <p className='landing__section-text'>
                We take the effort of creating the best Betting Engine for your Application.
                <br></br>
                Focus on your Brand, from Content to Marketing.
            </p>
            <img src={sports} className='landing__image__big'></img>
            <img src={backoffice} className='landing__image__big_mockup'></img>

        </Container>
        <div className='landing__heading'>
            <img className="landing_3_back" src={back} />
        </div>
        
    </section>
);

export default Markets;
