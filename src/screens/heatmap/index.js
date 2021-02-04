import React, {Component} from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 400,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

const HeatMapScreen = () => {
  let points = [
    {latitude: -27.081028, longitude: -52.717192, weight: 0},
    {latitude: -27.081286, longitude: -52.716314, weight: 25},
    {latitude: -27.08153, longitude: -52.71544, weight: 50},
    {latitude: -27.081731, longitude: -52.714635, weight: 100},
  ];
  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        mapType={'satellite'}
        region={{
          latitude: -27.081028,
          longitude: -52.717192,
          latitudeDelta: 0.09,
          longitudeDelta: 0.0121,
        }}
        minZoomLevel={16}
        maxZoomLevel={20}>
        <MapView.Heatmap
          points={points}
          opacity={1}
          onZoomRadiusChange={{
            zoom: [0, 3, 4, 5, 6, 9, 10, 11, 12, 13, 14, 15, 16, 17, 20],
            radius: [
              100,
              100,
              100,
              100,
              100,
              100,
              100,
              100,
              100,
              100,
              100,
              100,
              100,
              100,
              100,
            ],
          }}
          gradient={{
            colors: ['#79BC6A', '#BBCF4C', '#EEC20B', '#F29305', '#E50000'],
            values: [0, 0.25, 0.5, 0.75, 1],
          }}
          maxIntensity={100}
          gradientSmoothing={10}
          heatmapMode={'POINTS_WEIGHT'}
        />
      </MapView>
    </View>
  );
};

export default HeatMapScreen;
