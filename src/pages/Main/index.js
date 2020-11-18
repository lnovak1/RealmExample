/* eslint-disable quotes */
import React, {useState, useEffect} from 'react';
import {Keyboard} from 'react-native';

import {
  Container,
  Header,
  Content,
  Form,
  Item,
  Input,
  Label,
  Button,
  Text,
  List,
  ListItem,
} from 'native-base';

import getRealm from '~/services/realm';

// import {
//   Container, Title, Form, Input, Submit, List,
// } from './styles';

export default function Main() {
  const [input, setInput] = useState('');
  //   const [error, setError] = useState(false);
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    async function loadRepositories() {
      const realm = await getRealm();

      const data = realm.objects('Repository');
      setRepositories(data);
    }
    loadRepositories();
  }, []);

  async function saveRepository(repository) {
    const data = {
      id: repository.id,
      photo: repository.photo,
    };

    const realm = await getRealm();

    realm.write(() => {
      realm.create('Repository', data, 'all');
    });
  }

  async function handleAddRepository() {
    try {
      // eslint-disable-next-line prettier/prettier
      await saveRepository({"id":0, "photo": "abc12333"});
      setInput('');
      Keyboard.dismiss();
    } catch (err) {
      console.log('repositorios ja existentes->', repositories);
      console.log(err);
    }
  }

  return (
    <Container>
      <Header />
      <Content>
        <Form>
          <Item fixedLabel>
            <Input
              value={input}
              onChangeText={setInput}
              autoCaptalize="none"
              autoCorrect={false}
              placeholder="test"
            />
          </Item>
          <Button onPress={handleAddRepository}>
            <Text>coe</Text>
          </Button>
        </Form>
        <ListItem
          keyboardShouldPersistTaps="handled"
          data={repositories}
          keyExtractor={(item) => String(item.id)}
          renderItem={({item}) => <ListItem data={item} />}
        />
      </Content>
    </Container>
  );
}
