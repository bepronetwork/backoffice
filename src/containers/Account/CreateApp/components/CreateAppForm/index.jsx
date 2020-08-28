import React, { useState } from 'react';
import { CoinIcon, EthereumIcon } from 'mdi-react';
import { Input, Button, Link } from '../../../../../components';

import { Form, Label, Actions } from './styles';

const CreateAppForm = props => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [virtual, setVirtual] = useState(false);

  const { isLoading } = props;

  function handleChangeVirtual() {
    setVirtual(!virtual);
  }

  function handleSubmit(data) {}

  return (
    <Form onSubmit={handleSubmit}>
      <Label>Username or E-mail</Label>
      <Input label="App" name="name" type="text" defaultValue={name} />
      <Label>Description</Label>
      <Input
        name="description"
        label="Description"
        type="text"
        defaultValue={description}
      />

      <Actions>
        <Button variant="primary" loading={isLoading} type="submit">
          Log In
        </Button>
      </Actions>
    </Form>
  );
};

export default CreateAppForm;
