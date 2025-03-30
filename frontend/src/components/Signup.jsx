
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import server from "../environment";

function Signup() {
    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState({
      email: "",
      password: "",
      username: "",
    });
    const { email, password, username } = inputValue;

    const handleOnChange = (e) => {
      const { name, value } = e.target;
      setInputValue({
        ...inputValue,
        [name]: value,
      });
    };
  
    const handleError = (err) =>
      toast.error(err, {
        position: "bottom-left",
      });
    const handleSuccess = (msg) =>
      toast.success(msg, {
        position: "bottom-right",
      });
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const { data } = await axios.post(
          `${server.prod}/signup`,
          {
            ...inputValue,
          },
          { withCredentials: true }
        );
        const { success, message } = data;
        if (success) {
          handleSuccess(message);
          setTimeout(() => {
            navigate("/login");
          }, 1000);
        } else {
          handleError(message);
        }
      } catch (error) {
        console.log(error);
      }
      setInputValue({
        ...inputValue,
        email: "",
        password: "",
        username: "",
      });
    };
  return (
    <div className="flex justify-center items-top min-h-screen bg-zinc-800">
      <div className="bg-zinc-700 shadow-lg rounded-lg p-6 w-96 h-113 mt-20">
        <h2 className="text-[#f23064] text-center text-3xl font-semibold text-[#f291bf] mb-4">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-white">Username</label>
            <input 
              type="text" 
              id="username" 
              name="username" 
              placeholder="Username" 
              className="p-2 mt-1 text-white rounded-sm w-[100%] outline-[#f23064] border-[#f23064]
                    border-solid border-x-2 border-y-2 focus:outline-none"
                    onChange={handleOnChange}
                    value={username}
              required 
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-white">Email</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              placeholder="Email" 
              className="p-2 mt-1 text-white rounded-sm w-[100%] outline-[#f23064] border-[#f23064]
                    border-solid border-x-2 border-y-2 focus:outline-none "
                    onChange={handleOnChange}
                    value={email}
              required 
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-white">Password</label>
            <input 
              type="password" 
              id="password" 
              name="password" 
              placeholder="Password" 
              className="p-2 mt-1 text-white rounded-sm w-[100%] outline-[#f23064] border-[#f23064]
                    border-solid border-x-2 border-y-2 focus:outline-none"
                    onChange={handleOnChange}
                    value={password}
              required 
            />
          </div>
          <button type="submit" className="w-full bg-[#f23064] text-white py-2 rounded-md hover:bg-[#f23064]">Signup</button>
        </form>
        <p className="text-center text-white mt-4 text-base">
          Already have an account? <Link to="/login" className="text-white hover:underline">Login</Link>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Signup;
