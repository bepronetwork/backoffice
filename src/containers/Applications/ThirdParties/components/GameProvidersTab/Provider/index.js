import React, { useState } from 'react';

import { ProviderContainer, Header, Actions, InputField} from '../styles';
import EditLock from '../../../../../Shared/EditLock';
import { FormLabel } from '@material-ui/core';
import BooleanInput from '../../../../../../shared/components/BooleanInput';

const labelStyle = {
    fontFamily: "Poppins", 
    fontSize: 14, 
    color: "#646777"
}

const Provider = ({ data, editProvider }) => {
    const { activated, api_key, api_url, logo, name, partner_id, _id } = data;

    const [apiKey, setApikey] = useState(api_key);
    const [partnerId, setPartnerId] = useState(partner_id);

    const [isActivated, setIsActivated] = useState(activated);
    const [locked, setLocked] = useState(true);
    const [loading, setLoading] = useState(false);

    async function handleEditProvider() {
        setLoading(true);

        await editProvider({ 
            _id: _id,
            api_key: apiKey ? apiKey : "",
            partner_id: partnerId ? partnerId : "",
            activated: isActivated
        });

        setLoading(false);
        setLocked(true);
    }

    return (
        <ProviderContainer>
            <EditLock 
            isLoading={loading} 
            unlockField={() => setLocked(false)} 
            lockField={() => setLocked(true)} 
            confirmChanges={() => handleEditProvider()} 
            locked={locked}>
                <Header>
                    <img src={logo} alt={name} />
                    <p className="text-small text-left" style={{ marginTop: 0 }}><a style={{ pointerEvents: locked || loading ? "none" : "unset" }} href={api_url} target="_blank">{api_url}</a></p>
                </Header>
                <hr/>
                <Actions>
                    <div style={{ marginBottom: 10 }}>
                        <FormLabel component="legend" style={labelStyle}>{ isActivated ? "Active" : "Inactive" }</FormLabel>
                        <BooleanInput
                            checked={isActivated} 
                            onChange={() => setIsActivated(!isActivated)}
                            disabled={locked || loading}
                            type={'isActivated'}
                            id={'isactivated'}
                        />
                    </div>

                    <p>Add your API Key to integrate</p>
                    <InputField disabled={locked || loading} value={apiKey} onChange={(e) => setApikey(e.target.value)}/>

                    <p>Partner ID</p>
                    <InputField disabled={locked || loading} value={partnerId} onChange={(e) => setPartnerId(e.target.value)}/>

                </Actions>
            </EditLock>
        </ProviderContainer>
    )
};

export default Provider;