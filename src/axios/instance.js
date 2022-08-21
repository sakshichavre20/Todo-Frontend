import axios from "axios";

const AxiosInst = axios.create({
  baseURL: "https://sakshi-todo.herokuapp.com/",
});

export default AxiosInst;
