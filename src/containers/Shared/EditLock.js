import React from 'react';
import { Col, Container, Row, Card, CardBody, Button } from 'reactstrap';
import { ArrowExpandRightIcon, LockIcon, BankIcon } from 'mdi-react';

const EditLock = (props) => {
    return(
        <div className={`${props.locked ? 'locker-container' : null}`}>
            {props.children}
            <div style={{marginTop : 20}}>
                {props.locked ?
                    <Button onClick={() => props.unlockField({field : props.type})} className="icon" outline style={{ backgroundColor: 'white' }}>
                        <p><LockIcon className="deposit-icon"/> Unlock</p>
                    </Button>
                :
                    <div>
                        <Button onClick={() => props.lockField({field : props.type})} className="icon" outline style={{ backgroundColor: 'white' }}>
                            <p><LockIcon className="deposit-icon"/> Lock </p>
                        </Button>
                        <Button disabled={props.isLoading} onClick={() => props.confirmChanges({field : props.type})} className="icon" outline style={{ backgroundColor: 'white' }}>
                            <p style={{ color: props.isLoading ? "black" : "unset" }}><ArrowExpandRightIcon style={{ color: props.isLoading ? "black" : "unset" }}  className="deposit-icon"/>
                                {props.isLoading ? 'Updating..' : 'Confirm'}
                            </p>
                        </Button>
                    </div>
                }
            </div>
        </div>
    )
}


export default EditLock;