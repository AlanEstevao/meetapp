import React, { useEffect, useState, useMemo } from 'react';
import { formatRelative, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import api from '~/services/api';

import Background from '~/components/Background';
import { 
  Container, 
  MeetupsList, 
  MeetupItem, 
  Banner, 
  Organizer,
  Informations,
  Right,
  Title, 
  DateTime, 
  Localization } from './styles';

export default function SelectMeetup({ navigation }) {
  const [meetups, setMeetups] = useState([]);

  useEffect(() => {
    async function loadMeetups() {
      const response = await api.get('meetups');

      setMeetups(response.data);
    }

    loadMeetups();
  }, [])

  return( 
    <Background>
      <Container>
        <MeetupsList 
          data={meetups}
          keyExtractor={meetup => String(meetup.id)}
          renderItem={({ item: meetup }) => (
            <MeetupItem onPress={() => 
              navigation.navigate('ConfirmMeetup', { meetup })}>
              <Banner
                source={{
                  uri: meetup.banner
                    ? meetup.banner.url 
                    : `https://api.adorable.io/avatars/50/${meetup.organizer.name}.png` 
                }}
              />
              <Informations>
                <Organizer
                  source={{
                    uri: meetup.organizer.avatar.url
                      ? meetup.organizer.avatar.url
                      : `https://api.adorable.io/avatars/50/${meetup.organizer.name}.png` 
                  }}
                />
                <Right>
                  <Title>{meetup.title}</Title>
                  <DateTime>{formatRelative(parseISO(meetup.date), new Date(), { addSuffix: true, locale: pt })}</DateTime>
                  <Localization>{meetup.localization}</Localization>
                </Right>
              </Informations>
            </MeetupItem>
          )}
        />
      </Container>
    </Background>
  );
};