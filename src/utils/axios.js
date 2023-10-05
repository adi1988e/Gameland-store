import axios from "axios";

const customFetch = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
});

export default customFetch;
