import React, {useState} from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity } from "react-native";
import Geolocation from '@react-native-community/geolocation';
import { Button, Paragraph, Dialog, Portal } from 'react-native-paper';

const CollectScreen = () => {
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');

  const [visible, setVisible] = React.useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  const onPress = () =>
    Geolocation.getCurrentPosition((info) => {
      setLat(info.coords.latitude);
      setLng(info.coords.longitude);
      setVisible(true)
    });

  return (
    <View style={styles.main}>
      <TouchableOpacity onPress={onPress} style={styles.touchable}>
        <Image source={require('./target.png')} style={styles.pinBotton}/>
      </TouchableOpacity>
      <View>
        <Text>Latitude: {lat}</Text>
        <Text>Longitude: {lng}</Text>
      </View>
      <Button mode="contained" onPress={onPress}>Salvar Ponto</Button>


      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>Alert</Dialog.Title>
          <Dialog.Content>
            <Paragraph>Realmente deseja salvar está localização?</Paragraph>
            <Paragraph>Latitude: {lat}</Paragraph>
            <Paragraph>Longitude: {lng}</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button mode="contained" onPress={hideDialog}>Sim</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

export default CollectScreen;


const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  pinBotton: {
    width: '50%'
  },
  touchable: {
    width: '100%',
    alignItems: 'center'
  }
});
