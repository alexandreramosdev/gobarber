import React, { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';

import api from '~/services/api';

import Background from '~/components/Background';
import Appointment from '~/components/Appointment';

import { Container, Title, List } from './styles';

export default function Dashboard() {
  const [appointments, setAppointments] = useState();

  const isFocused = useIsFocused();

  const loadAppointments = async () => {
    const response = await api.get('/appointments');

    setAppointments(response.data);
  };

  useEffect(() => {
    if (isFocused) {
      loadAppointments();
    }
  }, [isFocused]);

  const handleCancel = async id => {
    const response = await api.delete(`/appointments/${id}`);

    setAppointments(
      appointments.map(appointment =>
        appointment.id === id
          ? {
              ...appointment,
              canceled_at: response.data.canceled_at,
            }
          : appointment
      )
    );
  };

  return (
    <Background>
      <Container>
        <Title>Agendamento</Title>
        <List
          data={appointments}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <Appointment data={item} handleCancel={handleCancel} />
          )}
        />
      </Container>
    </Background>
  );
}
