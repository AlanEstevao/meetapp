import React, {useEffect, useState, useMemo} from 'react';
import { TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '~/services/api';
import Background from '~/components/Background';
import SelectMeetup from '~/components/Dashboard/SelectMeetup';
import ConfirmMeetup from '~/components/Dashboard/ConfirmMeetup';
import Meetup from '~/components/Meetup';
import {Container, Title, List} from './styles'

const Stack = createStackNavigator();

export default function Dashboard() {

  const [registrations, setRegistrations] = useState([]);

  // useEffect(() => {
  //   async function loadRegistrations() {
  //     const response = await api.get('registration');

  //     setRegistrations(response.data);
  //   }

  //   loadRegistrations()
  // }, []);

  // async function handleCancel(id){
  //   const response = await api.delete(`registration/${id}`);

  //   setRegistrations(
  //     registrations.map(registration => 
  //       registration.meetup.id === id
  //         ? {
  //           ...registration,
  //           canceled_at: response.data.canceled_at,
  //           }
  //         : registration
  //     )
  //   )
  // }

  return (
    <Background>
      <Stack.Navigator 
        screenOptions={{
          headerTransparent: true,
          headerTintColor: '#FFF',
          headerLeftContainerStyle: {
            marginLeft: 30,
          }
        }}>
        <Stack.Screen 
          name="SelectMeetup" 
          component={SelectMeetup}
          options={({ navigation }) => ({
            title: 'Meetups',
            headerTitleAlign: 'center',
          })} />
        <Stack.Screen 
          name="ConfirmMeetup" 
          component={ConfirmMeetup} 
          options={({ navigation }) => ({
            title: 'Confirmar Inscrição',
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Icon name="chevron-left" size={25} color="#FFF" />
              </TouchableOpacity>
            )
          })}
        />
      </Stack.Navigator>
    </Background>
  );
}
