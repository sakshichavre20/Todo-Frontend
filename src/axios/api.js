import AxiosInst from "./instance";

const API = {};

API.signUp = async (data) => AxiosInst.post("signup", data);
API.Login = async (data) => AxiosInst.post("login", data);
API.AddTodo = async (data) => AxiosInst.post("addTodo", data);
API.GetTodo = async (id) => AxiosInst.get(`getTodos?user_id=${id}`);

API.MarkDone = async (data) => AxiosInst.post("markDone", data);
API.UndoTodo = async (data) => AxiosInst.post("undoTodo", data);
API.EditTodo = async (data) => AxiosInst.post("editTodo", data);
API.DeleteTodo = async (data) => AxiosInst.post("deleteTodo", data);

export default API;
