import React, {useState} from 'react';
import {View, StyleSheet, Pressable} from 'react-native';
import Stepper from 'react-native-stepper-ui';
import { Button, Snackbar } from 'react-native-paper';
import StepOne from './step-one/index';
import StepTwo from './step-two/index';
import StepThree from './step-three';
import ApiService from "../../service";
// import UserToken from './src/service/sqlite/user_token';

const RegisterScreen = ({navigation, signIn}) => {
  const [authValues, setAuthValues] = useState(null);
  const [stepOneValues, setStepOneValues] = useState(null);
  const [stepTwoValues, setStepTwoValues] = useState(null);
  const [active, setActive] = useState(0);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState('');
  const [visible, setVisible] = React.useState(false);

  const onDismissSnackBar = () => setVisible(false);

  const TakeFormReference = async (props) => {
    switch (active){
      case 0:
        setAuthValues(props)
        let res = await ApiService.Post('owners', props);
        if (res.status == 400 || res.status == 500){
          setError(true)
          setMessage(res.data?.username[0])
        }
        else if (res.status == 201){
          setStepOneValues(res.data)
          setError(false)
          setMessage('Usuário criado com sucesso!')
          setActive((p) => p + 1)
        }
        setVisible(true)
        break;

      case 1:
        let owner = await ApiService.Post('farms', {owner: stepOneValues.id, ...props});
        if (owner.status == 400){
          setError(true)
          setMessage(owner.data?.username)
        }
        else if (owner.status == 201){
          setStepTwoValues(owner.data)
          setError(false)
          setMessage('Propriedade criada com sucesso!')
          setActive((p) => p + 1)
        }
        setVisible(true)
        break;

      default:
        break;
    }
    // if(active < 2)
    //   setActive((p) => p + 1)
  };
  const goToHome = () => {
    signIn({username: authValues.username, password: authValues.password})
  }


  const content = [
    <StepOne TakeFormReference={TakeFormReference} />,
    <StepTwo TakeFormReference={TakeFormReference} />,
    <StepThree goToHome={goToHome} />,
  ];



  return (
    <View style={{marginVertical: 16, marginHorizontal: 16, flex: 1, justifyContent: 'space-between',}}>
      <Stepper
        active={active}
        content={content}
        onNext={() => setActive((p) => p + 1)}
        onBack={() => setActive((p) => p - 1)}
        onFinish={() => console.log('Finish')}
        showButton={false}
      />

      <Snackbar
          style={{backgroundColor: error ? '#d32f2f' : '#388e3c'}}
          visible={visible}
          duration={1500}
          onDismiss={onDismissSnackBar}
          action={{
            label: 'FECHAR',
            onPress: () => {
              // Do something
            },
          }}>
        {message}
      </Snackbar>
    </View>
  );
};
export default RegisterScreen;

// const Form = (props) => (
//   <View style={styles.main}>
//     <View style={styles.card}>
//       <TextInput
//         style={styles.textField}
//         label="Email"
//         value={props.values.email}
//         onChangeText={text => props.setFieldValue('email', text)}
//       />
//
//       <TextInput
//         label="Senha"
//         style={styles.textField}
//         value={props.values.password}
//         onChangeText={text => props.setFieldValue('password', text)}
//       />
//
//       <Button
//         onPress={props.handleSubmit}
//       ></Button>
//     </View>
//   </View>
// );
//
// export default withFormik({
//   mapPropsToValues: () => ({ email: '', password: '' }),
//   handleSubmit: (values) => {
//     console.log(values);
//   }
// })(Form);

const styles = StyleSheet.create({
  main: {
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#FFF',
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
