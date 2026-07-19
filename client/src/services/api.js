import axios from "axios";

const API = axios.create({
    baseURL: "https://spendwise-expense-tracker-mqvg.onrender.com/api",
});

export default API;