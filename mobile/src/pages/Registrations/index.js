import React, {useEffect, useState, useMemo} from 'react';
import api from '~/services/api';

import { Alert } from 'react-native';

import Background from '~/components/Background';
import Meetup from '~/components/Meetup';
import {Container, Title, List} from './styles'

export default function Registrations( {navigation}) {
  const [registrations, setRegistrations] = useState([]);

  async function loadRegistrations() {
    const response = await api.get('registration');

    setRegistrations(response.data);
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadRegistrations()
    });

    return unsubscribe;
  }, [navigation, registrations]);

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
    
    Alert.alert('Tudo certo', 'Você não está mais inscrito nesse meetup.');

  }

  return (
    <Background>
      <Container>
        <Title>Inscrições</Title>

        <List
          data={registrations}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) =>
            <Meetup 
              data={item}
              onCancel={() => handleCancel(item.id)} 
              load={() => loadRegistrations} 
            />
          }
        />
      </Container>
    </Background>
  );
}
