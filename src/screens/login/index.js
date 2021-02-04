import React, {useState, useEffect} from 'react';
import {View, Image, Pressable} from 'react-native';
import {Button} from 'react-native-paper';
import {TextInput, Text} from 'react-native-paper';
import {StyleSheet} from 'react-native';
import UserToken from '../../service/sqlite/user_token';
import {withFormik} from "formik";
import ApiService from "../../service";

const Form = (props) => {
  // console.log('gorm props', props)
  return (
      <View style={styles.main}>
        <Image style={styles.tinyLogo} source={require('./farm.png')} />
        <View style={styles.card}>
          <TextInput
              style={styles.textField}
              label="Usuário"
              error={props.errors?.username}
              value={props.values.username}
              onChangeText={(text) => props.setFieldValue('username', text)}
          />

          <TextInput
              label="Senha"
              style={styles.textField}
              error={props.errors?.username}
              value={props.values.password}
              onChangeText={(text) => props.setFieldValue('password', text)}
          />

          <Button onPress={props.handleSubmit} mode={'contained'}>
            Login
          </Button>

          <Pressable
              onPress={() => {
                // console.log(navigation);
                props.navigation.navigate('Register');
              }}>
            <Text style={styles.text}>Cadastre-se</Text>
          </Pressable>
        </View>
      </View>
  );
}

export default withFormik({
  mapPropsToValues: () => ({
    username: '1',// String(Math.random()),
    password: '1',
  }),

  // validationSchema: Yup.object().shape({
  //   email: Yup.string()
  //     .email('Digite um e-mail válido')
  //     .required('Preencha o campo de e-mail'),
  //   password: Yup.string()
  //     .min(6, 'A senha deve ter no mínimo 6 caracteres')
  //     .required('Preencha o campo de senha'),
  // }),

  handleSubmit: async (values, props) => {
    let res = await props.props.signIn(values);
    if(res?.status == 401){
      props.setFieldError('username', 'Usuário inválido!')
    }
    // console.log('props', props)
    // console.log('res', res)
  },
})(Form);

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

