import React, { useMemo } from 'react';
import { formatRelative, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import api from '~/services/api';

import Background from '~/components/Background';
import { Container, Banner, Title, DateTime, SubmitButton } from './styles';

export default function ConfirmMeetup({ route, navigation }) {
  const { meetup } = route.params;

  console.log(meetup.date);

  const parsedDate = useMemo(
    () => {
      return formatRelative(parseISO(meetup.date), new Date(), {
        locale: pt,
        addSufix: true,
      })
    }, [meetup.date]);

  async function handleRegister() {
    await api.post('registration', {
      meetup_id: meetup.id,
    });

    navigation.navigate('RegistrationsScreen');
  }

  return(
    <Background>
      <Container>
      <Banner
        source={{
          uri: meetup.banner
            ? meetup.banner.url 
            : `https://api.adorable.io/avatars/50/${item.organizer.name}.png` 
        }}
      />
      <Title>{meetup.title}</Title>
      <DateTime>{parsedDate}</DateTime>
      <SubmitButton onPress={handleRegister}>
        Confirmar Inscrição
      </SubmitButton>
      </Container>
    </Background>
  );
};