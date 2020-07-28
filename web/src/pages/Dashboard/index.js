import React, { useState, useMemo, useEffect } from 'react';
import { format, subMonths, addMonths, isBefore, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

import api from '~/services/api';
import { Container, Meetup } from './styles';

export default function Dashboard() {
  const [schedule, setSchedule] = useState([]);
  const [date, setDate] = useState(new Date());

  const month = useMemo(
    () => format(date, "MMMM", { locale: pt }),
    [date]
  );

  useEffect(() => {
    async function loadSchedule() {
      const response = await api.get('schedule', {
        params: { date }
      });

      setSchedule(response.data);

      // const timezone = Intl.DateTimeFormat().resolvedOptions().timezone;

      // const data = range.map(month => {
      //   const checkDate = setMonth(date, month);
      //   console.log('checkDate: ', checkDate);

        // const compareDate = utcToZonedTime(checkDate, timezone);
        // console.log('checkDate: ', compareDate);

        // return {
        //   month: `${month}`,
        //   past: isBefore(checkDate, new Date()),
        //   meetup: response.data.find(a => 
        //     isEqual(parseISO(a.date)), checkDate)
        //   };

      // });
    
    }

    loadSchedule();

  }, [date])

  function handlePrevMonth() {
    setDate(subMonths(date, 1));
  }

  function handleNextMonth() {
    setDate(addMonths(date, 1));
  }

  return(
    <Container>
      <header>
        <button type="button" onClick={handlePrevMonth}>
          <MdChevronLeft size={36} color={"#FFF"} />
        </button>
        <strong>{month.toUpperCase()}</strong>
        <button type="button" onClick={handleNextMonth}>
          <MdChevronRight size={36} color={"#FFF"} />
        </button>
      </header>

      <ul>
        {schedule.map((meetup) => { 
          
          const past = isBefore(parseISO(meetup.date), new Date());
          var parsedDate = parseISO(meetup.date);
          var dateFormatted = format(parsedDate, "d 'de' MMMM 'de' y 'às' hh:mm", { locale: pt });
          
          console.log(dateFormatted);
          
          return (
            <Meetup 
              key={meetup.id} 
              past={past}>
                <img src={meetup.banner.url} />
                <strong>{meetup.title}</strong>
                <span><b>{dateFormatted}</b></span>
                <span>{meetup.localization}</span>
            </Meetup>
          )
        }
        
        )}
      </ul> 
    </Container>
  )
}