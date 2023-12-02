import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  generalInput,
  positiveButton,
} from "../../components/DesignStandardize";
const AdminForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  async function AdminLogin(ev) {
    ev.preventDefault();
    const response = await fetch("http://localhost:4000/auth/login", {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "adminLogin");
        if (data.status === "ok") {
          toast.success("Login Successful");
          window.localStorage.setItem("token", data.token);
          window.localStorage.setItem("adminloggedIn", true);
          window.location.href = "./";
          navigate("/dashboard");
        } else {
          toast.error("Login Failed!!");
        }
      });

    // if (response.status === 200){
    //     alert('Auth successful!');
    //     navigate("/dashboard");

    // } else {
    //     alert('Auth failed.');
    // }
  }
  return (
    <div className="flex flex-col gap-6 font-[Poppins] font-lato items-center">
      <form className="flex flex-col gap-3" onSubmit={AdminLogin}>
        <div>
          <label className="label">
            <span className="label-text">
              Admin Email <span className="font-semibold text-red-600">*</span>
            </span>
          </label>
          <input
            type="email"
            placeholder="Enter Admin Email"
            className={`${generalInput}`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="label">
            <span className="label-text">
              Password <span className="font-semibold text-red-600">*</span>
            </span>
          </label>
          <input
            type="password"
            placeholder="Enter Admin Password"
            className={`${generalInput}`}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button className={`${positiveButton} mt-3 m-auto`}>Submit</button>
      </form>
    </div>
  );
};

export default AdminForm;
