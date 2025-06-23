import axios from "axios";
const apios = axios.create({
  // baseURL: "http://localhost:8000/api/",
  baseURL: "http://automagico.megb.com.br/api/",
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': '*',
    "Content-Type": "application/json"
  },
});

export default apios;
