import { isAxiosError } from "axios";

// API Axios config
import { api } from "../../config/axios";

export async function getAllImages () {
    try {
        const { data } = await api.get("/images");
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            const message = error.response.data.error;
            throw new Error(message);
        }
        return new Error(`${error}`)
    }
}