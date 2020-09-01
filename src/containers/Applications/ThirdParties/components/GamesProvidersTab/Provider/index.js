import React, { useState } from 'react';

import { ProviderContainer, Header, Actions, ApiField} from '../styles';
import EditLock from '../../../../../Shared/EditLock';

const Provider = ({ data, addProvider }) => {
    const { activated, api_key, api_url, logo, name, _id } = data;

    const [apiKey, setApikey] = useState(api_key);
    const [isActivated, setIsActivated] = useState(activated);
    const [locked, setLocked] = useState(false);
    const [loading, setLoading] = useState(false);

    async function handleAddProvider() {
        setLoading(true);
        await addProvider({ provider_id: _id });
        setLoading(false);
        setLocked(true);
    }

    return (
        <ProviderContainer>
            <EditLock 
            isLoading={loading} 
            unlockField={() => setLocked(false)} 
            lockField={() => setLocked(true)} 
            confirmChanges={() => handleAddProvider()} 
            locked={locked}>
                <Header>
                    <img src={logo} alt={name} />
                    <p className="text-small text-left" style={{ marginTop: 0 }}><a href={api_url} target="_blank">{api_url}</a></p>
                </Header>
                <Actions>
                    <p>Add your API Key to integrate</p>
                    <ApiField value={apiKey} onChange={(e) => setApikey(e.target.value)}/>
                </Actions>
            </EditLock>
        </ProviderContainer>
    )
};

export default Provider;