import React, {useEffect, useState} from 'react';
import {ScrollView} from "react-native";
import DataTableComponent from "../../../components/data-table";
import ApiService from "../../../service";
import {Button} from "react-native-paper";

const PlantingListScreen = (props) => {
    const [state, setState] = useState([]);

    const loadData = async () => {
        let response = await ApiService.Get('plantings/');
        if(response.status !== 200) return;
        setState(response.data)
    }

    useEffect(() => {
        loadData();
        return () => {
            // console.log("This will be logged on unmount")
        }
    },[state])

    return (
        <ScrollView>
            <Button onPress={()=>props.navigation.navigate('PlantingForm')}>Adicionar</Button>
            <DataTableComponent {...props} columns={columns} data={state} editPage={'PlantingForm'}/>
        </ScrollView>
    );
}

export default PlantingListScreen;


const columns = [
    {
        name: 'name',
        label: 'Cultivo'
    },
    {
        name: 'seed',
        label: 'Semente'
    },
]
