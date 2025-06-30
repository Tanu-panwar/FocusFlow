
const server={
    dev:"http://localhost:5000",
    prod:"https://focusflowbackend.onrender.com"
}

const baseURL =
  process.env.NODE_ENV === "development" ? server.dev : server.prod;

export default baseURL;
