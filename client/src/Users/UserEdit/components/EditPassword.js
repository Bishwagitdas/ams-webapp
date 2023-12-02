import React, { useEffect, useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const EditPassword = () => {
  const id = useParams();
  const navigate = useNavigate();
  const [userdata, setUserData] = useState({ password: "" });
  const { password } = userdata;
  const [showPassword, setShowPassword] = useState(false);
  const [showRetypePassword, setRetypeShowPassword] = useState(false);
  const [retypePassWord, setretypePassword] = useState("");
  const EyeIcon = showPassword ? <Visibility /> : <VisibilityOff />;
  const EyeIconRetype = showRetypePassword ? <Visibility /> : <VisibilityOff />;

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleRetypePasswordVisibility = () => {
    setRetypeShowPassword(!showRetypePassword);
  };

  const updateUserPass = async (e) => {
    try {
      e.preventDefault();
      await axios
        .put(`http://localhost:4000/fetch/updateUserPass/${id.id}`, userdata)
        .then((res) => {
          // console.log(res.data);
          navigate("/users");
        });
      toast.success("User Password Updated Successfully!!");
    } catch (error) {
      toast.error("User Update Failed!!!");
    }
  };

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const validatePasswords = () => {
    setIsButtonDisabled(
      password.length === 0 ||
        retypePassWord.length === 0 ||
        password !== retypePassWord
    );
  };

  useEffect(() => {
    validatePasswords();
  }, [password, retypePassWord]);
  return (
    <form className="flex flex-col gap-5" onSubmit={updateUserPass}>
      {/* Password section */}
      <div className="flex flex-col gap-3 items-center">
        <div className="w-64">
          <label className="label">
            <span className="label-text">
              Password <span className="font-semibold text-red-600">*</span>
            </span>
          </label>
          <div className="flex">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              minLength={4}
              onChange={(e) =>
                setUserData({ ...userdata, password: e.target.value })
              }
              className="input input-bordered input-md w-64 bg-gray-100 focus:bg-white"
              placeholder="Enter Password"
              required
            />
            <p onClick={togglePasswordVisibility} className="ml-1">
              {EyeIcon}
            </p>
          </div>
        </div>

        {/* Retype Password */}
        <div className="w-64">
          <label className="label">
            <span className="label-text">
              Retype Password{" "}
              <span className="font-semibold text-red-600">*</span>
            </span>
          </label>
          <div className="flex">
            <input
              type={showRetypePassword ? "text" : "password"}
              placeholder="Enter Password"
              value={retypePassWord}
              minLength={4}
              onChange={(e) => setretypePassword(e.target.value)}
              className="input input-bordered input-md w-64 bg-gray-100 focus:bg-white"
              required
            />
            <p onClick={toggleRetypePasswordVisibility} className="ml-1">
              {EyeIconRetype}
            </p>
          </div>
        </div>
      </div>

      <button
        disabled={isButtonDisabled}
        className={
          "flex flex-row w-max m-auto px-6 py-3 text-lg text-white rounded-sm bg-green-500 hover:bg-green-600"
        }
      >
        Submit
      </button>
    </form>
  );
};

export default EditPassword;
