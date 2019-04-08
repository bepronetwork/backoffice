import React from 'react';
import { Col, Row, Container } from 'reactstrap';
import { Link } from 'react-router-dom';
import team from '../consts/team';
import advisors from '../consts/advisors';
const logo = `${process.env.PUBLIC_URL}/img/betprotocol-logo-white.png`;
const back = `${process.env.PUBLIC_URL}/img/front.png`;
const revenue = `${process.env.PUBLIC_URL}/img/widgets/revenue.png`;
const games = `${process.env.PUBLIC_URL}/img/widgets/games.png`;
const users = `${process.env.PUBLIC_URL}/img/widgets/users.png`;
const stats = `${process.env.PUBLIC_URL}/img/widgets/stats.png`;
const deposit = `${process.env.PUBLIC_URL}/img/widgets/deposit.png`;
const ggr = `${process.env.PUBLIC_URL}/img/widgets/ggr.png`;
const renderAvatar = (avatar, advisor) => {
    return (
        <Col sd={3} lg={3}>
            <div className='avatar-box'>
                    <img src={avatar.image} className='user-image'/>
                    <div className='avatar-cover'/>
                    <p className={`above text ${advisor ? 'advisor-name' : ''} user-name`}> {avatar.name} </p>
                    <p className='above white-text light-text user-title margin-elements'>{avatar.position ? avatar.position : ""}</p>
                    <a className='above' href={avatar.linkedinurl} target='_blank'> 
                        <img className='above user-linkedin' src={avatar.linkedin}/>
                    </a>
            </div>
        </Col>
    )
}
const  render_avatar_hire = () => {
    return (
        <div className='col-sd-3'>
            <div className='avatar-box'>
                    <div className='avatar-cover background-pink'>
                        <img src={logo} className='bpro-team-enter'/>
                    </div>
                    <p className={`above text user-name`}> YOU </p>
                    <p className='above white-text light-text user-title margin-elements'> Join our team </p>
            </div>
        </div>
    )
}

class Team extends React.Component{
    constructor(props){super(props); this.state = {}}

    changeContent = (type, item) => {
        this.setState({[type] : item});
    }

    render = () => {
        return(
            <section className="landing__section " style={{marginTop  : 200}}>
               
             <Container className='container__all__landing container-auto-height'>  
                <h3 className="landing__section-title">Core Team 🎲</h3>
                <p className='landing__section-text '>
                    Serial Entrepreuners & Product Freak Guys
                </p>
                <Row style={{marginTop : 30}}>
                    {team.map( (avatar) => {
                        return renderAvatar(avatar)
                    })} 
                    {/* render_avatar_hire() */}
                </Row>
                
             </Container>
             <Container className='container__all__landing container-auto-height'>  
                <h3 className="landing__section-title">Advisors 🏇🏻</h3>
                <Row style={{marginTop : 30}}>
                    {advisors.map( (avatar) => {
                        return renderAvatar(avatar)
                    })} 
                    {/* render_avatar_hire() */}
                </Row>
                
             </Container>
         </section>
        )
    }

}

export default Team;
