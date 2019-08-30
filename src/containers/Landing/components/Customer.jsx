import React from 'react';
import { Col, Row, Container } from 'reactstrap';
import CheckIcon from 'mdi-react/CheckIcon';
const sports = `${process.env.PUBLIC_URL}/img/landing/sports.png`;

const backoffice = `${process.env.PUBLIC_URL}/img/widgets/backoffice.png`;
const back = `${process.env.PUBLIC_URL}/img/landing/back-3.png`;


const Customer = () => (
    <section className="landing__section landing_customer_section" >
        <div className='landing__heading'>
            <img className="landing_3_back" src={back} />
        </div>
        <Container className='container__all__landing' >
            <h3 className="landing__section-title">Focus on Customer Experience</h3>
            <p className='landing__section-text '>
                Don't worry about hiring a huge tech team or developing a betting platform by yourself
                <br></br>
                We handle the technology so developers and entrepreneurs can focus on the customer.
            </p>
            <img src={sports} className='landing__image__big'></img>
            <img src={backoffice} className='landing__image__big_mockup'></img>

        </Container>
    </section>
);

export default Customer;
