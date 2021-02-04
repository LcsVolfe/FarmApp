import React, {useState} from 'react';
import {Text, View, Image, StyleSheet, ScrollView} from "react-native";
import {Button, Snackbar, TextInput} from 'react-native-paper';
import {withFormik} from "formik";
import DatePicker from 'react-native-datepicker'
import CollectScreen from "./collect";
import ApiService from "../../../service";
import * as Yup from 'yup';

const Form = (props) => {
    // console.log('gorm props', props)
    const [error, setError] = useState(false);
    const [message, setMessage] = useState('xxx');
    const [visible, setVisible] = useState(false);

    const onDismissSnackBar = () => setVisible(false);

    const setCollectPoint = (list) => props.setFieldValue('points', list);

    return (
        <ScrollView>
            <View style={styles.main}>
                <View style={styles.card}>
                    <TextInput
                        style={styles.textField}
                        label="Nome"
                        error={props.errors?.name}
                        value={props.values.name}
                        onChangeText={(text) => props.setFieldValue('name', text)}
                    />

                    <TextInput
                        label="Semente"
                        style={styles.textField}
                        error={props.errors?.seed}
                        value={props.values.seed}
                        onChangeText={(text) => props.setFieldValue('seed', text)}
                    />

                    <DatePicker
                        style={styles.textField}
                        date={props.values.start}
                        mode={"date"}
                        placeholder="Selecione uma data"
                        format={"DD-MM-YYYY"}
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={{
                            dateIcon: {
                                position: 'absolute',
                                left: 0,
                                top: 4,
                                marginLeft: 0
                            },
                            dateInput: {
                                marginLeft: 36
                            }
                            // ... You can check the source to find the other keys.
                        }}
                        onDateChange={(date) => props.setFieldValue('start', date)}
                        // onDateChange={(date) => {this.setState({date: date})}}
                    />

                    <CollectScreen setData={setCollectPoint} initData={props.values.points} />
                    <Button onPress={props.handleSubmit} mode={'contained'} editPage={'PlantingForm'}>
                        Salvar
                    </Button>

                </View>

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
        </ScrollView>
    );
}

export default withFormik({
    mapPropsToValues: ({route}) => {
        return ({
            id: route?.params?.id,
            name: route?.params?.name,
            seed: route?.params?.seed,
            start: route?.params?.start || new Date(),
            points: route?.params?.points || []
        })
    },

    validationSchema: Yup.object().shape({
      name: Yup.string()
        .required('Preencha o campo de nome'),
      // seed: Yup.string()
      //   .min(6, 'A senha deve ter no mínimo 6 caracteres')
      //   .required('Preencha o campo de senha'),
    }),

    handleSubmit: async (values, props) => {
        // console.log(JSON.stringify(values))
        let response;
        if (!values.id)
            response = await ApiService.Post('plantings', values);
        else
            response = await ApiService.Put(`plantings/${values.id}`, values);

        if(response.status == 201 || response.status == 200)
            props.props.navigation.navigate('Planting')
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

