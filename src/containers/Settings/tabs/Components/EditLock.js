import React from 'react';
import { Button } from 'reactstrap';
import { ArrowExpandRightIcon, LockIcon } from 'mdi-react';

const EditLock = (props) => {
    return(
        <div style={{ width: "100%"}} className={`${props.locked ? 'locker-container' : null}`}>
            <div style={{ width: "100%", display: "flex"}}>
            {props.children}
            </div>
            <div style={{marginTop : 20}}>
                {props.locked ?
                    <Button onClick={() => props.unlockField({field : props.type})} className="icon" outline style={{ backgroundColor: "white" }}>
                        <p><LockIcon className="deposit-icon"/> Unlock</p>
                    </Button>
                :
                    <div>
                        <Button onClick={() => props.lockField({field : props.type})} className="icon" outline style={{ backgroundColor: "white" }}>
                            <p><LockIcon className="deposit-icon"/> Lock </p>
                        </Button>
                        <Button disabled={props.isLoading} onClick={() => props.confirmChanges({field : props.type})} className="icon" outline style={{ backgroundColor: "white" }}>
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


export default EditLock;