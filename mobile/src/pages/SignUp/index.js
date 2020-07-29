import React, {useRef} from 'react';
import { Image, Text } from 'react-native';

import logo from '~/assets/logo-branca.png';

import Background from '~/components/Background';

import { 
  Container, 
  Form, 
  FormInput, 
  SubmitButton, 
  SignLink, 
  SignLinkText 
} from './styles';

export default function SignUp({ navigation }) {
  const emailRef = useRef();
  const passwordRef = useRef();

  function handleSubmit() {}

  return (
    <Background>
      <Container>
        <Image source={logo} style={{ width:80, height: 80 }} resizeMethod={'resize'} resizeMode={'contain'}/>
        <Text style={{ marginTop: 15, fontWeight: 'bold', fontSize: 25, color:'#FFF'}}>MeetApp</Text>
        <Form>
          <FormInput
            icon="person-outline"
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Nome Completo"
            returnKeyType="next" 
            onSubmitEditing={() => emailRef.current.focus()} 
          />
          <FormInput
            icon="mail-outline"
            keyboardType="email-address"
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Digite seu e-mail" 
            ref={emailRef}
            returnKeyType="next" 
            onSubmitEditing={() => passwordRef.current.focus()}
          />
          <FormInput
            icon="lock-outline"
            secureTextEntry
            placeholder="Sua senha secreta"
            ref={passwordRef}
            returnKeyType="send" 
            onSubmitEditing={handleSubmit} 
          />
          <SubmitButton onPress={handleSubmit}>
            Acessar
          </SubmitButton>
        </Form>

        <SignLink onPress={() => navigation.navigate('SignIn')}>
          <SignLinkText>Já tenho conta</SignLinkText>
        </SignLink>
      </Container>
    </Background>
  );
}