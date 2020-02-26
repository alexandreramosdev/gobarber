import React, { useState, useMemo, useEffect } from 'react';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import pt from 'date-fns/locale/pt';
import { utcToZonedTime } from 'date-fns-tz';
import {
  format,
  parseISO,
  subDays,
  addDays,
  isBefore,
  isEqual,
  setHours,
  setMinutes,
  setSeconds,
  setMilliseconds,
} from 'date-fns';

import api from '~/services/api';

import { Container, Time } from './styles';

const range = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];

export default function Dashboard() {
  const [date, setDate] = useState(new Date());
  const [schedule, setSchedule] = useState([]);

  const dateFormatted = useMemo(
    () => format(date, "d 'de' MMMM", { locale: pt }),
    [date]
  );

  useEffect(() => {
    async function loadSchedules() {
      const response = await api.get('/schedule', {
        params: { date },
      });

      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

      const data = range.map(hour => {
        const checkDate = setMilliseconds(
          setSeconds(setMinutes(setHours(date, hour), 0), 0),
          0
        );
        const compareDate = utcToZonedTime(checkDate, timezone);

        return {
          time: `${hour}:00h`,
          past: isBefore(compareDate, new Date()),
          appointment: response.data.find(a =>
            isEqual(parseISO(a.date), compareDate)
          ),
        };
      });

      setSchedule(data);
    }
    loadSchedules();
  }, [date]);

  const handleDay = func => setDate(func(date, 1));

  return (
    <Container>
      <header>
        <button type="button" onClick={() => handleDay(subDays)}>
          <MdChevronLeft size={36} color="#fff" />
        </button>
        <strong>{dateFormatted}</strong>
        <button type="button" onClick={() => handleDay(addDays)}>
          <MdChevronRight size={36} color="#fff" />
        </button>
      </header>

      <ul>
        {schedule.map(time => (
          <Time key={time.time} past={time.past} available={!time.appointment}>
            <strong>{time.time}</strong>
            <span>
              {time.appointment ? time.appointment.user.name : 'Em aberto'}
            </span>
          </Time>
        ))}
      </ul>
    </Container>
  );
}
