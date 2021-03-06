import styled from 'styled-components/native';

import Button from '~/components/Button';

export const Container = styled.SafeAreaView`
  flex: 1;
  padding: 0 30px;

  justify-content: center;
  align-items: center;
`;

export const Banner = styled.Image`
  width: 300px;
  height: 180px;
  border-radius: 30px;
`;

export const Title = styled.Text`
  margin-top: 10px;
  font-size: 20px;
  font-weight: bold;
  color: #FFF;
`;

export const DateTime = styled.Text`
  margin-top: 10px;
  font-size: 20px;
  color: rgba(255, 255, 255, 0.6);
`;

export const SubmitButton = styled(Button)`
  align-self: stretch;
  margin-top: 20px;
`;