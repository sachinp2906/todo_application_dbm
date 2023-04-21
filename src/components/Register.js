import React , {useState} from 'react'
// import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  // const Navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const submitHandler = async (e) => {
    e.preventDefault();
    const response = await axios.post("http://localhost:3001/user/create", {
      name,
      email,
      password,
    });
    if (!response.data || response.status === 400 || response.status === 404) {
      console.log("invalid credential");
    } else {
      // Navigate("/login");
      console.log("succesfully created")
    }
    setName("");
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
                      name="name"
                      required
                      placeholder="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    ></input>
                    <input
                      className="form-control w-full mb-3"
                      type="email"
                      name="email"
                      required
                      placeholder="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    ></input>
                    <input
                      className="form-control w-full mb-3"
                      type="password"
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
                      Register
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
export default Register;
