import React, {useEffect, useState, useMemo} from 'react';
import api from '~/services/api';
import Background from '~/components/Background';
import Meetup from '~/components/Meetup';
import {Container, Title, List} from './styles'

export default function Dashboard() {
  const [registrations, setRegistrations] = useState([]);

  useEffect(() => {
    async function loadRegistrations() {
      const response = await api.get('registration');

      setRegistrations(response.data);
    }

    loadRegistrations()
  }, []);

  async function handleCancel(id){
    const response = await api.delete(`registration/${id}`);

    setRegistrations(
      registrations.map(registration => 
        registration.meetup.id === id
          ? {
            ...registration,
            canceled_at: response.data.canceled_at,
            }
          : registration
      )
    )
  }

  return (
    <Background>
      <Container>
        <Title>Dashboard</Title>

        <List
          data={registrations}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) =>
            <Meetup 
              data={item}
              onCancel={() => handleCancel(item.id)} 
            />
          }
        />
      </Container>
    </Background>
  );
}
