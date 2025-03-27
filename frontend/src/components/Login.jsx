
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";


function Login() {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });
  const { email, password } = inputValue;
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
      position: "bottom-left",
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "https://focusflowbackend.onrender.com/login",
        {
          ...inputValue,
        },
        { withCredentials: true }
      );
      console.log(data);
      const { success, message, token, user} = data;

      if (success) {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        handleSuccess(message);
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        handleError(message);
      }
    } 
    catch (error) {
      console.log(error);
    }
    setInputValue({
      ...inputValue,
      email: "",
      password: "",
    });
  };

  return (
    <div className="flex justify-center items-top min-h-screen bg-zinc-800">
      <div className="bg-zinc-700 shadow-lg rounded-lg p-6 w-96 h-96 mt-20">
        <h2 className="text-center text-3xl font-semibold text-[#f23064] mb-4">User Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-white">Email</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              placeholder="Email" 
              className="p-2 text-white mt-1 rounded-sm w-[100%] outline-[#f23064] border-[#f23064]
                    border-solid border-x-2 border-y-2 focus:outline-none email"
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
              className="p-2 text-white mt-1 rounded-sm w-[100%] outline-[#f23064] border-[#f23064]
                    border-solid border-x-2 border-y-2 focus:outline-none password"
                    onChange={handleOnChange}
                    value={password}
              required 
            />
          </div>
          <button type="submit" className="w-full bg-[#f23064] text-white py-2 rounded-md hover:bg-[#f23064]">Login</button>
        </form>
        <p className="text-center text-white mt-4 text-base">
          <a href="#" className="text-white hover:underline">Forgot Password?</a>
          <br />
          Not registered? <Link to="/signup" className="text-white hover:underline">Create an account</Link>
        </p>
      </div>
      <ToastContainer />

    </div>
  );
}

export default Login;
