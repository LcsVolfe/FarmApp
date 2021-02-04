import React, {useEffect, useState, useCallback} from 'react';
import {Avatar, Button, Card, Paragraph, Title, ProgressBar, Colors} from "react-native-paper";
import {Image, View, Dimensions, StyleSheet} from "react-native";
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import ApiService from "../../../service";

const ICON_URL = 'http://openweathermap.org/img/wn/'

const WeatherCard = ({item, index}) => {
    const [indicators, setIndicators] = useState();

    const getIndicators = useCallback(async () => {
        setIndicators(await ApiService.FetchWeather())
    }, [])

    useEffect(() => {
        getIndicators();
    }, [getIndicators])

    return (
        <Card>
            {/*<Card.Title title="Chapecó" subtitle="Sol nublado" left={LeftContent} />*/}
            <Card.Content>
                {!indicators ? <ProgressBar indeterminate /> : <View style={styles.main}>
                    <View>
                        <Title>{indicators.name} {indicators.main.temp}°</Title>
                        <Paragraph>{indicators.weather[0].description}</Paragraph>
                    </View>
                    <Image
                        source={{uri: ICON_URL+indicators.weather[0].icon+'@2x.png'}}
                        style={styles.img}
                    />
                    <View>
                        <View style={styles.rowDirection}>
                            <View style={styles.indicators}>
                                <FontAwesome5 name="arrow-down" size={16} color={"#31b1ff"}/>
                                <Paragraph style={styles.ml4}>{indicators.main.temp_min}°</Paragraph>
                            </View>
                            <View style={styles.indicators}>
                                <FontAwesome5 name="arrow-up" size={16} color="#d21d1d"/>
                                <Paragraph style={styles.ml4}>{indicators.main.temp_max}°</Paragraph>
                            </View>
                        </View>
                        <View style={styles.rowDirection}>
                            <View style={styles.indicators}>
                                <FontAwesome5 name="wind" size={16} color={"#898A8B"}/>
                                <Paragraph style={styles.ml4}>{indicators.wind.speed}m/s</Paragraph>
                            </View>
                            <View style={styles.indicators}>
                                <Entypo name="water" size={16} color="#31b1ff"/>
                                <Paragraph style={styles.ml4}>{indicators.main.humidity}%</Paragraph>
                            </View>
                        </View>
                    </View>
                </View>}
            </Card.Content>
        </Card>
    );
}

export default WeatherCard;


const styles = StyleSheet.create({
    main:{
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    ml4: {marginLeft: 4},
    rowDirection: {flexDirection: 'row'},
    indicators: {
        width: 60,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    img: {
        width: 64,
        height: 64,
    },
})
