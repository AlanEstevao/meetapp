import React, {useRef, useState} from 'react';
import { Image, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import logo from '~/assets/logo-branca.png';

import Background from '~/components/Background';
import { signInRequest } from '~/store/modules/auth/actions';

import { 
  Container, 
  Form, 
  FormInput, 
  SubmitButton, 
  SignLink, 
  SignLinkText 
} from './styles';

export default function SignIn({ navigation }) {
  const dispatch = useDispatch();
  const passwordRef = useRef();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loading = useSelector(state => state.auth.loading);

  function handleSubmit() {
    dispatch(signInRequest(email, password));
  }

  return (
    <Background>
      <Container>
        <Image source={logo} style={{ width:80, height: 80 }} resizeMethod={'resize'} resizeMode={'contain'}/>
        <Text style={{ marginTop: 15, fontWeight: 'bold', fontSize: 25, color:'#FFF'}}>MeetApp</Text>
        <Form>
          <FormInput
            icon="mail-outline"
            keyboardType="email-address"
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Digite seu e-mail"
            returnKeyType="next" 
            onSubmitEditing={() => passwordRef.current.focus()}
            value={email}
            onChangeText={setEmail}
          />
          <FormInput
            icon="lock-outline"
            secureTextEntry
            placeholder="Sua senha secreta" 
            ref={passwordRef}
            returnKeyType="send" 
            value={password}
            onChangeText={setPassword}
            onSubmitEditing={handleSubmit}
          />
          <SubmitButton loading={loading} onPress={handleSubmit}>
            Acessar
          </SubmitButton>
        </Form>

        <SignLink onPress={() => navigation.navigate('SignUp')}>
          <SignLinkText>Criar conta gratuita</SignLinkText>
        </SignLink>
      </Container>
    </Background>
  );
}