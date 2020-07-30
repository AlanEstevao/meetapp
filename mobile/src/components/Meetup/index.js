import React, { useMemo } from 'react';
import { parseISO, formatRelative} from 'date-fns';
import pt from 'date-fns/locale/pt';
import { TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Container, Left, Banner, Info, Name, Time } from './styles';

export default function Meetup({ data, onCancel }){
  const meetup = data.meetup;

  const parsedDate = useMemo(
    () => {
      return formatRelative(parseISO(meetup.date), new Date(), {
        locale: pt,
        addSufix: true,
      })
    }, [meetup.date]);
  
  return(
    <Container past={meetup.past}>
      <Left>
        <Banner
          source={{
            uri: meetup.banner.url 
              ? meetup.banner.url 
              : `https://api.adorable.io/avatars/50/${meetup.organizer.name}.png` 
          }}
        />

        <Info>
          <Name>{meetup.title}</Name>
          <Time>{parsedDate}</Time>
        </Info>
      </Left>
      
      {meetup.cancelable && !data.canceled_at && (
      <TouchableOpacity onPress={onCancel}>
        
        <Icon name="event-busy" size={20} color="#f64c75" />
      </TouchableOpacity>
      )}
    </Container>
  )
}