import React from 'react';
import axios from 'axios'

export const url = "localhost:8080/api";


export default {
    menu: {
        get: () => axios.get(`${url}/menu`).then(res => res)
    }
}
