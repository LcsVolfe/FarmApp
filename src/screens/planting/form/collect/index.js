import React, {useState} from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Button, Paragraph, Dialog, Portal } from 'react-native-paper';
import GetLocalitation from "../../../../service/geolocation";
import DataTableComponent from "../../../../components/data-table";
import ApiService from "../../../../service";

const CollectScreen = ({setData, initData=[]}) => {
  const [visible, setVisible] = useState(false);
  const [listData, setListData] = useState(initData);
  const [geoState, setGeoState] = useState();
  const hideDialog = (e) => {
    setVisible(false);
    if(!e) return;
    listData.push({
      grid: 1,
      ...geoState
    });
    if(setData)
      setData(listData)
  }
  const columns = [
    {
      name: 'grid',
      label: 'Grid',
    },
    {
      name: 'latitude',
      label: 'Latitude',
    },
    {
      name: 'longitude',
      label: 'Longitude',
    }
  ];


  const onDelete = async (newList, itemDeleted) => {
    setListData(newList);
    if(setData)
      setData(listData);

    if(itemDeleted?.id)
      await ApiService.Delete(`sampling-points/${itemDeleted.id}`);
  };

  const onPress = async () =>{
    setGeoState({...(await GetLocalitation())})
    setVisible(true)
  }

  return (
    <View style={styles.main}>
      <TouchableOpacity onPress={onPress} style={styles.touchable}>
        <Image source={require('./target.png')} style={styles.pinBotton}/>
        <Text>Salvar Ponto Coleta</Text>
      </TouchableOpacity>


      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>Alert</Dialog.Title>
          <Dialog.Content>
            <Paragraph>Realmente deseja salvar está localização?</Paragraph>
            <Paragraph>Latitude: {geoState?.latitude}</Paragraph>
            <Paragraph>Longitude: {geoState?.longitude}</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button mode="contained" onPress={hideDialog}>Sim</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>


      <DataTableComponent columns={columns} data={listData} onDelete={onDelete}/>
    </View>
  );
};

export default CollectScreen;


const styles = StyleSheet.create({
  main: {
    // flex: 1,
    // alignItems: 'center',
    // justifyContent: 'space-around'
  },
  pinBotton: {
    width: 100,
    height: 100
  },
  touchable: {
    width: '100%',
    alignItems: 'center'
  }
});
