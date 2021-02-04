import React from 'react';
import {Dimensions, StyleSheet, Text, View, Pressable, ScrollView} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {Avatar, Button, IconButton, Colors, Card} from "react-native-paper";
import NewsLetterCard from "./newsletter";
import WeatherCard from "./weather";


const HomeScreen = ({signOut, navigation}) => {
  return (
    <ScrollView>
        <WeatherCard />
        <Text>HOME</Text>
        <Button title="Sign out" onPress={signOut} >Sign out</Button>
        <Carousel
            data={ [
                {
                    title:"Item 1",
                    text: "Colheita de soja atinge 2,23% da área em MT; plantios de milho e algodão têm atraso",
                },
                {
                    title:"Item 2",
                    text: "Soja sobe pela terceira sessão consecutiva em Chicago nesta 4ª direcionada pela demanda",
                },
                {
                    title:"Item 3",
                    text: "Text 3",
                },
                {
                    title:"Item 4",
                    text: "Text 4",
                },
                {
                    title:"Item 5",
                    text: "Text 5",
                },
            ]}
            renderItem={NewsLetterCard}
            sliderWidth={Dimensions.get('window').width}
            itemWidth={Dimensions.get('window').width * 0.8}
        />
        <View style={styles.viewCards}>
            {screens.map((screen,i) => (
                <Pressable key={i} onPress={()=>navigation.navigate(screen.name)}>
                    <Card style={styles.card}>
                        <Card.Content style={styles.cardContent}>
                            {/*<IconButton*/}
                            {/*    icon={screen.icon}*/}
                            {/*    color={Colors.red500}*/}
                            {/*    size={48}*/}
                            {/*    onPress={() => console.log('Pressed')}*/}
                            {/*/>*/}
                            <Avatar.Icon icon={"folder"} />
                            <Text>{screen.label}</Text>
                        </Card.Content>
                    </Card>
                </Pressable>
            ))}
        </View>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
    card: {
        width: Dimensions.get('window').width * 0.3,
        marginTop: 8,
    },
    cardContent: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    viewCards: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        flexWrap: 'wrap'
    }
});

const screens = [
    {
        name: 'Collect',
        label: 'COLETA',
        icon: 'camera'
    },
    {
        name: 'Planting',
        label: 'PLANTAÇÃO',
        icon: 'camera'
    },
    {
        name: 'Collect',
        label: 'COLETA',
        icon: 'camera'
    },
    {
        name: 'Collect',
        label: 'COLETA2',
        icon: 'camera'
    },
    {
        name: 'Collect',
        label: 'COLETA',
        icon: 'camera'
    },
    {
        name: 'Collect',
        label: 'COLETA2',
        icon: 'camera'
    },
]
