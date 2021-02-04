import React, {useState} from 'react';

import {PermissionsAndroid} from "react-native";
import Geolocation from "@react-native-community/geolocation";


const GetLocalitation = async () => {
    const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (granted === PermissionsAndroid.RESULTS.GRANTED)
        return await myCoord();
    return;
}

export default GetLocalitation;



const myCoord = () =>
    new Promise((resolve, reject) => {
        const geoSuccess = position => resolve(position.coords);
        const geoFailure = error => reject(error);

        Geolocation.getCurrentPosition(
            geoSuccess,
            geoFailure,
            {
                timeout: 5000,
                maximumAge: 5000,
                enableHighAccuracy: false
            }
        );

    });
