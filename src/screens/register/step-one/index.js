import React, {useState} from 'react';
import {View, StyleSheet, Pressable} from 'react-native';
import {Text, Button, TextInput} from 'react-native-paper';
import {withFormik} from 'formik';
// import Yup from 'yup';

const Form = (props) => (
  <View style={styles.main}>
    <Text>Dados do usuário</Text>
    <View style={styles.card}>
      <TextInput
        style={styles.textField}
        label="Nome"
        value={props.values.first_name}
        onChangeText={(text) => props.setFieldValue('first_name', text)}
      />

      <TextInput
        style={styles.textField}
        label="Usuário"
        value={props.values.username}
        onChangeText={(text) => props.setFieldValue('username', text)}
      />

      <TextInput
        label="Senha"
        style={styles.textField}
        value={props.values.password}
        onChangeText={(text) => props.setFieldValue('password', text)}
      />

      <Button onPress={()=>props.TakeFormReference(props.values)} mode={'contained'}>
        Próximo
      </Button>
    </View>
  </View>
);

export default withFormik({
  mapPropsToValues: () => ({
    username: String(Math.random()),
    password: '1',
    first_name: 'aa',
  }),

  // validationSchema: Yup.object().shape({
  //   email: Yup.string()
  //     .email('Digite um e-mail válido')
  //     .required('Preencha o campo de e-mail'),
  //   password: Yup.string()
  //     .min(6, 'A senha deve ter no mínimo 6 caracteres')
  //     .required('Preencha o campo de senha'),
  // }),

  handleSubmit: (values) => {
    console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
    console.log(values);
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
