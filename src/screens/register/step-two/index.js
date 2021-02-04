import React, {useState} from 'react';
import {View, StyleSheet, Pressable} from 'react-native';
import {Text, Button, TextInput} from 'react-native-paper';
import {withFormik} from 'formik';
// import Yup from 'yup';

const Form = (props) => (
  <View style={styles.main}>
    <Text>Dados da propriedade</Text>
    <View style={styles.card}>
      <TextInput
        style={styles.textField}
        label="Nome da Propriedade"
        value={props.values.name}
        onChangeText={(text) => props.setFieldValue('name', text)}
      />
      {/*<TextInput*/}
      {/*  style={styles.textField}*/}
      {/*  label="Cidade"*/}
      {/*  value={props.values.city}*/}
      {/*  onChangeText={(text) => props.setFieldValue('city', text)}*/}
      {/*/>*/}

      <Button onPress={()=>props.TakeFormReference(props.values)} mode={'contained'}>
        Próximo
      </Button>
    </View>
  </View>
);

export default withFormik({
  mapPropsToValues: () => ({
    name: '',
    // city: '',
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
    // console.log(values);
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
