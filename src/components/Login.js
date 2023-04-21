import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const submitHandler = async (e) => {
    e.preventDefault();
    const data = await axios.post(
      "http://localhost:3001/user/login",
      { email, password },
      {
        headers: {
          "Content-type": "application/json",
        },
        withCredentials: true,
      }
    );
    console.log(data);
    if (!data || data.status === 400 || data.status === 404) {
      console.log("login failed");
    } else{
        console.log("login succesfull")
    }
    setEmail("");
    setPassword("");
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
                      name="email"
                      required
                      placeholder="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    ></input>
                    <input
                      className="form-control w-full mb-3"
                      type="text"
                      name="password"
                      required
                      placeholder="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    ></input>
                    <button
                      type="submit"
                      className="btn bg-primary text-white"
                      onClick={submitHandler}
                    >
                      Login
                    </button>
                  </div>
                </form>
              </card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
