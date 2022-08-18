import React, { useState, useEffect, useRef } from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import axios from "axios";
import { useWindowDimensions } from "../Constants/Constants";
import "../Styles/Dashboard.css";

function Dashboard() {
  const { width, height } = useWindowDimensions();

  const currentUser = localStorage.getItem("user");
  const user = JSON.parse(currentUser);
  // console.log(currentUser);

  const [todo, setTodo] = useState("");
  // const [edittodo, seteditTodo] = useState("");
  const [todoList, setTodoList] = useState([]);
  const todoRef = useRef(null);
  const [todoTrigger, setTodoTrigger] = useState(false);

  // const [editTodoModal, setEditTodoModal] = useState(false);

  const AddTodo = async () => {
    if (todo === "") {
      console.log("please enter some value");
    } else {
      const res = await axios
        .post("http://localhost:5000/addTodo", {
          user_id: user?._id,
          todo: todo,
          created_at: new Date(),
        })
        .then((res) => {
          console.log(res.data);
          setTodo("");
          GetTodo();
        })
        .catch((err) => {
          console.log(err);
        });
    }

    // navigate("/dashboard");
  };

  const GetTodo = async () => {
    await axios
      .get(`http://localhost:5000/getTodos?user_id=${user._id}`)
      .then((res) => {
        console.log(res.data);
        setTodoList(res.data.todos);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    GetTodo();
  }, [todoTrigger]);

  return (
    <div
      style={{
        flexDirection: "column",
        height: "100vh",
        width: "100vw",
        display: "flex",
        // alignItems: "center",
      }}
    >
      <img
        //  key={bgImage}
        src={
          "https://i.pinimg.com/736x/e1/4b/70/e14b7097d76237a8f5aba0dc66d01e1b.jpg"
        }
        style={{
          width: "100vw",
          height: "100vh",
          position: "fixed",
          top: 0,
          objectFit: "cover",
          zIndex: -10,
        }}
      />
      <div
        style={{
          backgroundColor: "#0005",
          backdropFilter: "blur(5px)",
          width: "100vw",
          height: "100vh",
          //  padding: 24,
        }}
      >
        <div
          style={{
            alignSelf: "flex-start",
            padding: 24,
          }}
        >
          <h1 style={{ color: "white", textAlign: "left" }}> {user?.name}</h1>
          <h4 style={{ color: "white" }}> {user?.email}</h4>

          <div
            style={{
              display: "flex",
              flexDirection: width < 500 ? "column" : "row",
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            <input
              value={todo}
              //    ref={(input) => (todoRef = input)}
              onKeyPress={(e) => e.key === "Enter" && AddTodo()}
              onChange={(e) => setTodo(e.target.value)}
              placeholder="add todo"
              style={{
                height: 20,
                width: "50vw",
                padding: 10,
                borderRadius: 5,
                marginRight: 10,
                elevation: 10,
              }}
            />

            <button
              style={{
                backgroundColor: "wheat",
                borderRadius: 5,
                width: 100,
                height: 45,
                padding: 10,
                marginTop: width < 500 ? 20 : 0,
              }}
              onClick={() => {
                AddTodo();
              }}
            >
              ADD
            </button>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: width < 700 ? "column" : "row",
              alignItems: "flex-start",
              justifyContent: "flex-start",
              //  backgroundColor: "red",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column" }}>
              {todoList?.map((item) => {
                if (!item.completed) {
                  return (
                    <div key={item?._id}>
                      <TodoItem
                        item={item}
                        setTodoTrigger={setTodoTrigger}
                        todoTrigger={todoTrigger}
                      />
                    </div>
                  );
                }
              })}
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginLeft: width < 700 ? 0 : 20,
              }}
            >
              {todoList?.map((item) => {
                if (item.completed)
                  return (
                    <div key={item?._id}>
                      <TodoItem
                        item={item}
                        setTodoTrigger={setTodoTrigger}
                        todoTrigger={todoTrigger}
                      />
                    </div>
                  );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const TodoItem = ({ item, todoTrigger, setTodoTrigger }) => {
  const { width, height } = useWindowDimensions();
  const [edittodo, seteditTodo] = useState("");
  const [done, setDone] = useState(false);
  const [editTodoModal, setEditTodoModal] = useState(false);
  const [deleteTodoModal, setDeleteTodoModal] = useState(false);
  const markDone = async () => {
    const data = {
      todo_id: item._id,
    };

    await axios
      .post("http://localhost:5000/markDone", data)
      .then((res) => {
        console.log(res.data);
        setDone(true);
        setTodoTrigger(!todoTrigger);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const undoDone = async () => {
    const data = {
      todo_id: item._id,
    };

    await axios
      .post("http://localhost:5000/undoTodo", data)
      .then((res) => {
        console.log(res.data);
        setDone(false);
        setTodoTrigger(!todoTrigger);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const EditTodo = async () => {
    const data = {
      todo_id: item._id,
      todo: edittodo,
      created_at: new Date(),
    };

    await axios
      .post("http://localhost:5000/editTodo", data)
      .then((res) => {
        console.log(res.data);

        setTodoTrigger(!todoTrigger);
        setEditTodoModal(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const DeleteTodo = async () => {
    const data = {
      todo_id: item._id,
    };

    await axios
      .post("http://localhost:5000/deleteTodo", data)
      .then((res) => {
        console.log(res.data);

        setTodoTrigger(!todoTrigger);
        setDeleteTodoModal(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div
      key={item._id}
      style={{
        display: "flex",
        //  backgroundColor: "#0005",
        width: width < 700 ? "50vw" : "20vw",
        marginTop: 5,
        padding: 15,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "space-between",
      }}
      className="list_item"
    >
      <div>
        <input
          type="checkbox"
          checked={item.completed}
          name="todo"
          value={item._id}
          style={{
            cursor: "pointer",
          }}
          onChange={() => (!item.completed ? markDone() : undoDone())}
        />

        <a style={{ marginLeft: 10 }}>{item.todo}</a>
      </div>
      <div
        style={{
          display: "flex",
          alignSelf: "end",
        }}
      >
        {!item.completed ? (
          <AutoFixHighIcon
            style={{ color: "white" }}
            onClick={() => {
              seteditTodo(item.todo);
              setEditTodoModal(true);
            }}
          />
        ) : (
          <DeleteOutlineIcon
            style={{ color: "white" }}
            onClick={() => setDeleteTodoModal(true)}
          />
        )}
      </div>

      {editTodoModal && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: "black",
            backdropFilter: "blur(5px)",
            width: "50vw",
            position: "absolute",
            left: "30%",
            alignItems: "center",
            padding: 20,
            borderRadius: 14,
            top: "20%",
          }}
        >
          <h2 style={{ color: "white" }}>EDIT TODO</h2>
          {/* <h6 style={{ color: "white" }}>{item.todo}</h6> */}
          <input
            value={edittodo}
            onChange={(e) => seteditTodo(e.target.value)}
            placeholder="add todo"
            style={{
              height: 20,
              width: "50%",
              padding: 10,
              borderRadius: 5,
              marginRight: 10,
              elevation: 10,
              marginBottom: 20,
            }}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                cursor: "pointer",
                paddingBlock: 10,
                paddingInline: 20,
                borderRadius: 10,
                border: "solid 1px wheat",
              }}
              onClick={() => {
                setEditTodoModal(false);
              }}
            >
              <a style={{ color: "wheat", fontSize: 18 }}>Cancel</a>
            </div>
            <div
              style={{
                cursor: "pointer",
                paddingBlock: 10,
                paddingInline: 20,
                borderRadius: 10,
                backgroundColor: "wheat",
                marginLeft: 40,
                border: "solid 1px wheat",
              }}
              onClick={() => {
                EditTodo();
              }}
            >
              <a style={{ color: "#000000", fontSize: 18 }}>Edit</a>
            </div>
          </div>
        </div>
      )}
      {deleteTodoModal && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: "black",
            backdropFilter: "blur(5px)",
            width: "50vw",
            position: "absolute",
            left: "30%",
            alignItems: "center",
            padding: 20,
            borderRadius: 14,
            top: "20%",
          }}
        >
          <h2 style={{ color: "white" }}>DELETE TODO</h2>
          <a style={{ marginBottom: 20 }}>
            Are You sure you want to delete {item.todo} Todo
          </a>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                cursor: "pointer",
                paddingBlock: 10,
                paddingInline: 20,
                borderRadius: 10,
                border: "solid 1px wheat",
              }}
              onClick={() => {
                setDeleteTodoModal(false);
              }}
            >
              <a style={{ color: "wheat", fontSize: 18 }}>CANCEL</a>
            </div>
            <div
              style={{
                cursor: "pointer",
                paddingBlock: 10,
                paddingInline: 20,
                borderRadius: 10,
                backgroundColor: "wheat",
                marginLeft: 40,
                border: "solid 1px wheat",
              }}
              onClick={() => {
                DeleteTodo();
              }}
            >
              <a style={{ color: "#000000", fontSize: 18 }}>DELETE</a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
