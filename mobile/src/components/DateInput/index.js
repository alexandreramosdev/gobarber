import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { MaterialIcons } from '@expo/vector-icons';

import { Container, DateButton, DateText, Picker } from './styles';

export default function DateInput({ date, onChange }) {
  const [opened, setOpened] = useState(false);

  const dateFormatted = useMemo(
    () => format(date, "dd 'de' MMMM 'de' yyyy", { locale: pt }),
    [date]
  );

  const handleChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;

    onChange(currentDate);
  };

  const showDatepicker = () => {
    if (Platform.OS === 'ios') {
      setOpened(!opened);
    }
  };

  return (
    <Container>
      <DateButton onPress={showDatepicker}>
        <MaterialIcons name="event" size={20} color="#fff" />
        <DateText>{dateFormatted}</DateText>
      </DateButton>

      {opened && (
        <Picker>
          <DateTimePicker
            value={date}
            mode="date"
            display="spinner"
            onChange={handleChange}
            minimumDate={new Date()}
            minuteInterval={60}
          />
        </Picker>
      )}
    </Container>
  );
}

DateInput.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
  onChange: PropTypes.func.isRequired,
};
