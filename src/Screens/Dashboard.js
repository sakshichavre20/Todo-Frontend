import React, { useState, useEffect, useRef } from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import Moment from "react-moment";
import { useWindowDimensions } from "../Constants/Constants";
import "../Styles/Dashboard.css";
import API from "../axios/api";
import Loader from "../Components/Loader";

function Dashboard() {
  const { width, height } = useWindowDimensions();

  const [loading, setLoading] = useState(false);

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
      const res = await API.AddTodo({
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
    setLoading(true);
    await API.GetTodo(user?._id)
      .then((res) => {
        console.log(res.data);
        setTodoList(res.data.todos);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
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
        overflow: "hidden",
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
        {loading && <Loader loading={loading} />}
        <div
          style={{
            alignSelf: "flex-start",
            padding: 24,
          }}
        >
          <h1
            style={{
              color: "wheat",
              textAlign: "left",
              textShadow: "4px 4px 5px #0007",
            }}
          >
            {" "}
            {user?.name}
          </h1>
          <h4 style={{ color: "white", textShadow: "4px 4px 5px #0007" }}>
            {" "}
            {user?.email}
          </h4>

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
              placeholder="Add Your Todo..."
              style={{
                height: 20,
                width: width < 385 ? "80vw" : "50vw",
                padding: 10,
                borderRadius: 9,
                marginRight: 10,
                elevation: 10,
                borderWidth: 0,
                borderColor: "white",
                outline: "none",
              }}
            />

            <button
              style={{
                backgroundColor: "wheat",
                borderRadius: 9,
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
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                height: width < 700 ? "100%" : "calc(100vh - 300px)",
              }}
            >
              <h2 style={{ color: "wheat", textShadow: "4px 4px 5px #0007" }}>
                To do's
              </h2>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  overflowY: "auto",
                  height: width < 700 ? "100%" : "calc(100vh - 300px)",
                  //  backgroundColor: "red",

                  // height: "calc(100vh - 400px)",
                }}
              >
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
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",

                height: width < 700 ? "100%" : "calc(100vh - 300px)",
                marginLeft: width < 700 ? 0 : 20,
              }}
            >
              <h2
                style={{
                  color: "wheat",
                  marginLeft: width < 700 ? 0 : 20,
                  textShadow: "4px 4px 5px #0007",
                }}
              >
                Completed
              </h2>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  overflowY: "auto",
                  height: width < 700 ? "100%" : "calc(100vh - 300px)",
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
    </div>
  );
}

const TodoItem = ({ item, todoTrigger, setTodoTrigger }) => {
  const { width, height } = useWindowDimensions();
  const [edittodo, seteditTodo] = useState("");
  const [done, setDone] = useState(false);
  const [editTodoModal, setEditTodoModal] = useState(false);
  const [deleteTodoModal, setDeleteTodoModal] = useState(false);
  const [hover, setHover] = useState(null);
  const markDone = async () => {
    const data = {
      todo_id: item._id,
    };

    await API.MarkDone(data)
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

    await API.UndoTodo(data)
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

    await API.EditTodo(data)
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

    await API.DeleteTodo(data)
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
    <>
      <div
        key={item._id}
        style={{
          display: "flex",
          //  backgroundColor: "#0005",
          width: width < 700 ? "55vw" : "40vw",
          marginTop: 5,
          padding: 15,
          borderRadius: 5,
          alignItems: "center",
          justifyContent: "space-between",
          flexDirection: "column",
        }}
        onMouseEnter={() => {
          // setTimeout(() => {
          setHover(item?._id);
          // }, 500);
        }}
        onMouseLeave={() => {
          setHover("");
        }}
        className="list_item"
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <input
            type="checkbox"
            checked={item.completed}
            name="todo"
            value={item._id}
            style={{
              cursor: "pointer",
              outline: "none",
            }}
            onChange={() => (!item.completed ? markDone() : undoDone())}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              //   backgroundColor: "pink",
              width: width < 700 ? "53vw" : "38vw",
            }}
          >
            <a style={{ marginLeft: 10 }}>{item.todo}</a>
            <a
              style={{
                color: "#fff",
                fontSize: 10,
                textAlign: "right",
                alignSelf: "flex-end",
              }}
            >
              <Moment format="D MMM YYYY" withTitle>
                {item?.created_at}
              </Moment>
            </a>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignSelf: "flex-start",
          }}
        >
          {/* {!item.completed ? (
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
          )} */}
          {hover === item?._id && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginTop: 10,
              }}
            >
              {!item.completed && (
                <div
                  style={{
                    cursor: "pointer",
                    backgroundColor: "wheat",
                    padding: 8,
                    paddingInline: 15,
                    borderRadius: 10,
                    marginLeft: 10,
                    boxShadow: "5px 5px 10px #0007",
                    transition: "500ms",
                    opacity: hover === item?._id ? 1 : 0,
                    transform: `scale(${hover === item?._id ? 1 : 0})`,
                  }}
                >
                  <AutoFixHighIcon
                    style={{ color: "white" }}
                    onClick={() => {
                      seteditTodo(item.todo);
                      setEditTodoModal(true);
                    }}
                  />
                </div>
              )}
              <div
                style={{
                  cursor: "pointer",
                  // backgroundColor: color,
                  backgroundColor: "#f57",
                  padding: 8,
                  paddingInline: 15,
                  borderRadius: 10,
                  marginLeft: 10,
                  boxShadow: "5px 5px 10px #0007",
                  transition: "500ms",
                  opacity: hover === item?._id ? 1 : 0,
                  transform: `scale(${hover === item?._id ? 1 : 0})`,
                }}
                // onClick={() => editTodoUI(item)}
              >
                <DeleteOutlineIcon
                  style={{ color: "white" }}
                  onClick={() => setDeleteTodoModal(true)}
                />
              </div>
            </div>
          )}
        </div>
      </div>
      {editTodoModal && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#000e",
            backdropFilter: "blur(50px)",
            width: width < 385 ? "75vw" : "50vw",
            position: "fixed",
            left: width > 385 ? "30%" : null,
            alignItems: "center",
            padding: 20,
            borderRadius: 14,
            top: "20%",
            alignSelf: "center",
            transition: "200ms",
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
              width: "80%",
              padding: 10,
              borderRadius: 6,
              marginRight: 10,
              elevation: 10,
              marginBottom: 20,
              outline: "none",
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
            backgroundColor: "#000e",
            backdropFilter: "blur(50px)",
            width: width < 385 ? "75vw" : "50vw",
            position: "fixed",
            left: width > 385 ? "30%" : null,
            alignItems: "center",
            padding: 20,
            borderRadius: 14,
            top: "20%",
            alignSelf: "center",
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
    </>
  );
};

export default Dashboard;
