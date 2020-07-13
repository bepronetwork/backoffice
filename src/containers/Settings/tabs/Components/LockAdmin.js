import React from 'react';
import { Col, Container, Row, Card, CardBody, Button } from 'reactstrap';
import { ArrowExpandRightIcon, LockIcon, BankIcon } from 'mdi-react';

const LockAdmin = (props) => {
    return(
        <div className={`${props.locked ? 'locker-container' : null}`}>
            {props.children}
            <div style={{ height: "35px", marginTop: 10 }}>
                {props.locked ?
                    <Button size="sm" style={{ margin: 0, backgroundColor: "white" }} onClick={() => props.unlockField({field : props.type})} className="icon" outline>
                        <p><LockIcon className="deposit-icon"/> Unlock</p>
                    </Button>
                :
                    <div>
                        <Button size="sm" style={{ margin: 0, marginRight: 15, backgroundColor: "white" }} onClick={() => props.lockField({field : props.type})} className="icon" outline>
                            <p><LockIcon className="deposit-icon"/> Lock </p>
                        </Button>
                        <Button size="sm" style={{ margin: 0, backgroundColor: "white" }} disabled={props.isLoading} onClick={() => props.confirmChanges({field : props.type})} className="icon" outline>
                            <p><ArrowExpandRightIcon className="deposit-icon"/>
                                {props.isLoading ? 'Updating..' : 'Confirm'}
                            </p>
                        </Button>
                    </div>
                }
            </div>
        </div>
    )
}


export default LockAdmin;