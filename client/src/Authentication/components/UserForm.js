import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  generalInput,
  positiveButton,
} from "../../components/DesignStandardize";
const UserForm = () => {
  const navigate = useNavigate();
  const [emailUser, setEmailUser] = useState("");
  const [passwordUser, setPasswordUser] = useState("");

  //function for USER LOGIN
  async function loginUser(ev) {
    // console.log("password", passwordUser);
    ev.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/userAuth/login", {
        method: "POST",
        body: JSON.stringify({
          email: emailUser,
          password: passwordUser,
        }),
        headers: { "Content-Type": "application/json" },
        // credentials: 'include', // saves cookie in the local browser
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data, "userLogin");
          if (data.status === "ok") {
            toast.success("Login Successful");
            window.localStorage.setItem("token", data.access_token);
            window.localStorage.setItem("userLogin", true);
            window.location.href = "./";
            navigate("/dashboard");
          } else {
            toast.error("Login Failed!!");
          }
        });
    } catch (error) {
      console.log("Error:", error);
    }
  }

  return (
    <div className="flex flex-col gap-6 font-[Poppins] font-lato items-center">
      <form className="flex flex-col gap-3" onSubmit={loginUser}>
        <div>
          <label className="label">
            <span className="label-text">
              User Email <span className="font-semibold text-red-600">*</span>
            </span>
          </label>
          <input
            type="email"
            placeholder="Enter User Email"
            className={`${generalInput}`}
            value={emailUser}
            onChange={(e) => setEmailUser(e.target.value)}
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
            placeholder="Enter User Password"
            className={`${generalInput}`}
            value={passwordUser}
            onChange={(e) => setPasswordUser(e.target.value)}
            required
          />
        </div>

        <button className={`${positiveButton} mt-3 m-auto`}>Submit</button>
      </form>
    </div>
  );
};

export default UserForm;
