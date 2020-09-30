import React, { useState } from 'react';

import { AddProviderContainer, Header, Logo, Details, Actions, AddButton } from './styles';
import { AddIcon } from 'mdi-react';

const AddProvider = ({ data, addProvider }) => {
    const { api_url, logo, name, _id } = data;
    const [loading, setLoading] = useState(false);
    
    async function handleAddProvider() {
        setLoading(true);
        await addProvider({ provider_id: _id });
        setLoading(false);
    }

    return (
        <AddProviderContainer>
            <Header>
                <Logo>
                    <img style={{ padding: "0px 10px" }}src={logo} alt={name} />
                </Logo>
                <Details>
                    <span>{name}</span>
                    <p className="text-small text-left" style={{ marginTop: 0 }}><a href={api_url} target="_blank">{api_url}</a></p>
                </Details>
            </Header>
            <Actions>
                <AddButton disabled={loading} style={{ margin: 0, marginTop: 10 }} onClick={() => handleAddProvider()}>
                    { loading ? "Adding..." : <p style={{ color: "white", fontSize: 12 }}><AddIcon className="deposit-icon"/> Add </p> }
                </AddButton>
            </Actions>
        </AddProviderContainer>
    )
}

export default AddProvider;