import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { parseISO, formatRelative } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import { Container, Left, Avatar, Info, Name, Time } from './styles';

const fixUrl = avatar =>
  __DEV__ ? `http://192.168.0.104:5000/files/${avatar.path}` : avatar.url;

export default function Appointment({ data, handleCancel }) {
  const dateParsed = useMemo(() => {
    return formatRelative(parseISO(data.date), new Date(), {
      locale: pt,
      addSuffix: true,
    });
  }, [data.date]);

  return (
    <Container past={data.past}>
      <Left>
        <Avatar
          source={{
            uri: data.provider.avatar
              ? fixUrl(data.provider.avatar)
              : `https://api.adorable.io/avatar/50/${data.provider.name}.png`,
          }}
        />

        <Info>
          <Name>{data.provider.name}</Name>
          <Time>{dateParsed}</Time>
        </Info>
      </Left>

      {data.cancelable && !data.canceled_at && (
        <TouchableOpacity onPress={() => handleCancel(data.id)}>
          <MaterialIcons name="event-busy" size={20} color="#f64c75" />
        </TouchableOpacity>
      )}
    </Container>
  );
}

const providerShape = {
  name: PropTypes.string,
  avatar: PropTypes.objectOf(PropTypes.string),
};

const dataShape = {
  id: PropTypes.number.isRequired,
  date: PropTypes.string.isRequired,
  cancelable: PropTypes.bool.isRequired,
  past: PropTypes.bool.isRequired,
  canceled_at: PropTypes.string,
  provider: PropTypes.shape(providerShape).isRequired,
};

// FIXME improvide
Appointment.propTypes = {
  handleCancel: PropTypes.func.isRequired,
  data: PropTypes.shape(dataShape).isRequired,
};
