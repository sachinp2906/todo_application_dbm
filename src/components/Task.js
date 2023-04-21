import React, { useState, useEffect } from "react";
import axios from "axios";
const Task = () => {
  const [description, setDescription] = useState("");
  const [getTask, setGetTask] = useState([]);

  const submitHandler = async (e) => {
    let status = document.getElementById("select").value;
    e.preventDefault();
    const response = await axios.post(
      "http://localhost:3001/task/create",
      {
        description,
        status
      },
      {
        headers: {
          "Content-type": "application/json",
        },
        withCredentials: true,
      }
    );
    
    if (!response.data || response.status === 400) {
      console.log("invalid request || no data found");
    }
    setDescription("");
  };

  return (
    <>
      <div className="container">
        <div>
          <div className="row">
            <div className="col-md-12">
              <card className="card p-5 m-5">
                <form>
                  <div>
                    <input
                      className="form-control w-full mb-3"
                      type="text"
                      name="description"
                      required
                      placeholder="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    ></input>
                    <div className="selectBox" id="selectBox">
                      <span> Status : </span>
                      <select id="select">
                        <option value="no select">select</option>
                        <option value="pending">Pending</option>
                        <option value="in progress">In progress</option>
                        <option value="completed">Completed</option>
                      </select>
                    </div>
                    <button
                      type="submit"
                      className="btn bg-primary text-white"
                      onClick={submitHandler}
                    >
                      Create Note
                    </button>
                  </div>
                </form>
              </card>
            </div>
          </div>
        </div>
        {/* <div className="row">
          {getNote
            .slice(0)
            .reverse()
            .map((ele) => {
              let { description, body, id } = ele;
              console.log(ele);
              return (
                <div className="col-md-8 p-3" key={id}>
                  <div>{description}</div>
                  <div>{body}</div>
                  <button
                    onClick={() => {
                      deleteNote(id);
                    }}
                  >
                    Delete
                  </button>
                  <hr></hr>
                </div>
              );
            })}
        </div> */}
      </div>
    </>
  );
};
export default Task;
