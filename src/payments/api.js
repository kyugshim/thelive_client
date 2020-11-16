import axios from 'axios';

import { SERVER } from '../pages/config'
export const doPayment = (amount, tokenId, accessToken) => {
    const body = {
        amount: amount,
        tokenId: tokenId,
    };
    return axios
        .post(`${SERVER}/api/doPayment`, body)
        .then(({ data }) => {
            return data;
        })
        .catch(error => {
            return console.log(error);
        })
};
