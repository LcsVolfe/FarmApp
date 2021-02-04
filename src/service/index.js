import axios from "axios";
import Geolocation from '@react-native-community/geolocation';
import {PermissionsAndroid} from "react-native";
import GetLocalitation from "./geolocation";


const URL_BASE = 'http://192.168.0.104:8000/';
const URL_WEATHER = 'http://api.openweathermap.org/data/2.5/';

const fetchApi = async (path = '', method = 'GET', body) => {
  // await delay(2000);
    let headers = {
    // Authorization: 'Bearer ', //+ localStorage.getItem('AuthorizationToken'),
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    };

    switch (method){
        case "GET":
            try{
                let response = await axios.get(`${URL_BASE}${path}`, {headers});
                return response;
            }catch (e) {
                return e.response;
            }
            break;

        case "POST":
            try{
                let response = await axios.post(`${URL_BASE}${path}/`, body, {headers});
                return response;
            }catch (e) {
                return e.response;
            }
            break;

        case "PUT":
            try{
                let response = await axios.put(`${URL_BASE}${path}/`, body, {headers});
                return response;
            }catch (e) {
                return e.response;
            }
            break;

        case "DELETE":
            try{
                let response = await axios.delete(`${URL_BASE}${path}/`, {headers});
                return response;
            }catch (e) {
                return e.response;
            }
            break;

        default:
            break;
    }



};


const FetchWeather = async () => {
    let headers = {
        // Authorization: 'Bearer ', //+ localStorage.getItem('AuthorizationToken'),
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    };
    const {latitude, longitude} = await GetLocalitation();
    try{
        let response = await axios.get(
            `${URL_WEATHER}weather?lat=${latitude}&lon=${longitude}&APPID=1fe851438bdfe374d29cdc4074958a13&units=metric&lang=pt`,
            {headers}
        );
        if(response.status == 200)
            return response.data;
        return;
    }catch (e) {
        return e.response;
    }

    return;
}

const checkErrors = (res) => {
    let error = mountApiResult(res, true);
    return error;
}

const mountApiResult = (res, error = false, pagination = true) => {
    // console.log(res)
    return ({
        errorRequest: error,
        data: pagination && res.data?.results ? res.data?.results : res.data,
        message: res.message,
        status: pagination ? res.status : res.status,
        statusText: res?.statusText || res.response?.statusText
    });
}


const ApiService = {
  Post: (path, data) => fetchApi(path, 'POST', data),
  Put: (path, data) => fetchApi(path, 'PUT', data),
  Get: (path) => fetchApi(path, 'GET'),
  Delete: (path) => fetchApi(path, 'DELETE'),
  FetchWeather,
};
export default ApiService;
