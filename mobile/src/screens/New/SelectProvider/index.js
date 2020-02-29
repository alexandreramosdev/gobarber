import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import api from '~/services/api';

import Background from '~/components/Background';

import { Container, ProvaidersList, Provider, Avatar, Name } from './styles';

const fixUrl = avatar =>
  __DEV__ ? `http://192.168.0.104:5000/files/${avatar.path}` : avatar.url;

export default function SelectProvider({ navigation }) {
  const [providers, setProviders] = useState([]);

  useEffect(() => {
    async function loadProviders() {
      const response = await api.get('/providers');

      setProviders(response.data);
    }
    loadProviders();
  }, []);

  return (
    <Background>
      <Container>
        <ProvaidersList
          data={providers}
          keyExtractor={provider => String(provider.id)}
          renderItem={({ item: provider }) => (
            <Provider
              onPress={() =>
                navigation.navigate('SelectDateTime', { provider })
              }
            >
              <Avatar
                source={{
                  uri: provider.avatar
                    ? fixUrl(provider.avatar)
                    : `https://api.adorable.io/avatar/50/${provider.name}.png`,
                }}
              />
              <Name>{provider.name}</Name>
            </Provider>
          )}
        />
      </Container>
    </Background>
  );
}

SelectProvider.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
