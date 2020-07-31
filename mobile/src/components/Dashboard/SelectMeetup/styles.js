import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const MeetupsList = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  numColumns: 1,
})`
  margin-top: 60px;
  padding: 0 20px;
`;

export const MeetupItem = styled(RectButton)`
  background: #FFF;
  border-radius: 4px;
  padding: 20px;
  flex: 1;

  margin: 0 10px 20px;
`;

export const Banner = styled.Image`
  width: 100%;
  height: 160px;
`;

export const Informations = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

export const Organizer = styled.Image`
  background-color: rgba(0, 0, 0, 0.8);
  width: 40px;
  height: 40px;
  border-radius: 20px;
`;

export const Right = styled.View`
  flex-direction: column;
  align-items: flex-start;
  margin-left: 20px;
`;

export const Title = styled.Text`
  margin-top: 15px;
  font-size: 20px;
  font-weight: bold;
  color: #333;
  text-align: left;
  flex-wrap: wrap;
`;

export const DateTime = styled.Text`
  color: #555;
  font-size: 12px;
  margin-top: 2px;
  text-align: left;
`;

export const Localization = styled.Text`
  color: #999;
  font-size: 12px;
  margin-top: 2px;
  text-align: left;
`;

