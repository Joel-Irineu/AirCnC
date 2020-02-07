import axios from 'axios';
import {YellowBox} from 'react-native';

YellowBox.ignoreWarnings([
  'Unrecognized WebSocket',
  'Possible Unhandled'
]);

const api = axios.create({
  baseURL: 'http://192.168.0.108:3333',
});

export default api;