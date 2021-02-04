import React, {useState} from 'react';
import {View, StyleSheet, Pressable} from 'react-native';
import {Text, Button, TextInput} from 'react-native-paper';
import {withFormik} from 'formik';
// import Yup from 'yup';

const StepThree = ({goToHome}) => (
  <View style={styles.main}>
    <Text>TERMINO</Text>
    <View style={styles.card}>
      <Button onPress={goToHome} mode={'contained'}>
        Ir para home
      </Button>
    </View>
  </View>
);

export default StepThree;

const styles = StyleSheet.create({
  main: {
    alignItems: 'center',
    flex: 1,
    // backgroundColor: '#FFF',
    paddingTop: 32,
  },
  card: {
    width: '90%',
  },
  textField: {
    marginBottom: 16,
  },
  tinyLogo: {
    width: '50%',
    marginBottom: 16,
    marginTop: 16,
  },
  text: {
    textAlign: 'center',
  },
});
