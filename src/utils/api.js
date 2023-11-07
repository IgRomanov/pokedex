import axios from "axios";
import { BASE_URL } from "./const";

export const getAllData = async (controller) => {
    return await axios.get(`${BASE_URL}pokemon?limit=100000&offset=0.`, {
        signal: controller.signal
    });
};

export const getDataWithParams = async (offset, limit) => {
    return await axios.get(`${BASE_URL}pokemon?limit=${limit}&offset=${offset}.`);
};

export const getTypes = async () => {
    return await axios.get(`${BASE_URL}type`);
};

export const getType = async (type) => {
    return await axios.get(`${BASE_URL}type/${type}`);
};