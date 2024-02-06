import axios from "axios";

export const API_URL = `https://api.npoint.io/4829d4ab0e96bfab50e7`;

export const getRequest = async (url) => {
    const header = {
      headers: {
        'Content-Type': 'application/json',
        Accept: '*/*'
      }
    };
    return axios.get(url, header);
  };