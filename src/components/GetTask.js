import React, { useState, useEffect } from "react";
import axios from 'axios'
const GetTask = () => {
  const [getTask, setgetTask] = useState([]);
  console.log(getTask)

 const deleteTask = async (id) => {
   try {
     const del = await axios.get(`http://localhost:3001/task/delete/${id}`, {
       headers: {
         "Content-type": "application/json",
       },
       withCredentials: true,
     });
     console.log("succesfully deleted");
     getTasks();
   } catch (err) {
     console.log("unable to delete data");
   }
 };


  const getTasks = async (e) => {
    const response = await axios.get("http://localhost:3001/task/all" , 
      {
        headers: {
          "Content-type": "application/json",
        },
        withCredentials: true,
      }
    )

    // console.log(data);
    setgetTask(response.data);
  };
  useEffect(() => {
    getTasks();
  }, []);
  return (
      <div className="container">
        <div className="row">
          {getTask.map((ele) => {
            return (
              <>
                <div className="col-md-8 p-3">
                  <div>{ele.description}</div>
                  <div>{ele.status}</div>
                  <button>Update</button>
                  <button
                    onClick={() => {
                      deleteTask(ele.id);
                    }}
                  >
                    Delete
                  </button>
                  <hr></hr>
                </div>
              </>
            );
          })}
        </div>
      </div>
  );
};

export default GetTask;
