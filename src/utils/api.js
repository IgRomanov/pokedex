import axios from "axios";
import { BASE_URL } from "./const";

export const getAllData = async () => {
    try {
        return await axios.get(`${BASE_URL}pokemon?limit=100000&offset=0.`);
    } catch (e) {
        console.log(e);
    }
};

export const getDataWithParams = async (offset, limit) => {
    try {
        return await axios.get(`${BASE_URL}pokemon?limit=${limit}&offset=${offset}.`);
    } catch (e) {
        console.log(e);
    }
};

export const getType = async (type) => {
    try {
        return await axios.get(`${BASE_URL}type/${type}`);
    } catch (e) {
        console.log(e);
    }
};