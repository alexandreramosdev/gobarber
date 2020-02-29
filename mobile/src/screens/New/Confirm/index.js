import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { formatRelative, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import api from '~/services/api';

import Background from '~/components/Background';

import { Container, Avatar, Name, Time, SubmitButton } from './styles';

const fixUrl = avatar =>
  __DEV__ ? `http://192.168.0.104:5000/files/${avatar.path}` : avatar.url;

export default function Confirm({ route, navigation }) {
  const { provider, time } = route.params;

  const dateFormatted = useMemo(
    () => formatRelative(parseISO(time), new Date(), { locale: pt }),
    [time]
  );

  const handleAddAppointment = async () => {
    await api.post('/appointments', {
      provider_id: provider.id,
      date: time,
    });

    navigation.navigate('Dashboard');
  };

  return (
    <Background>
      <Container>
        <Avatar
          source={{
            uri: provider.avatar
              ? fixUrl(provider.avatar)
              : `https://api.adorable.io/avatar/50/${provider.name}.png`,
          }}
        />
        <Name>{provider.name}</Name>

        <Time>{dateFormatted}</Time>

        <SubmitButton onPress={handleAddAppointment}>
          Confirmar agendamento
        </SubmitButton>
      </Container>
    </Background>
  );
}

Confirm.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      time: PropTypes.string,
      provider: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        avatar: PropTypes.object,
      }),
    }),
  }).isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
