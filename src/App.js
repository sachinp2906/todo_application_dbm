import './App.css';
import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from './components/Home'
import Task from './components/Task'


function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/task" element={<Task />}></Route>
          {/* <Route path="/blog/all" element={<Blog />}></Route>
          <Route path="/blog/create" element={<CreateBlog />}></Route>
          <Route path="/image" element={<ImageCompressor />}></Route> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
