import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  inputStyle,
  labelStyle,
  positiveButton,
} from "../../components/DesignStandardize";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function UserReg() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [designation, setDesigntion] = useState("");
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
  const confirmPass = () => {
    return password === retypePassWord;
  };

  async function register(ev) {
    if (confirmPass()) {
      ev.preventDefault();
      const response = await fetch("http://localhost:4000/userReg/register", {
        method: "POST",
        body: JSON.stringify({ email, password, username, designation }),
        headers: { "Content-Type": "application/json" },
      });
      if (response.status === 200) {
        toast.success("Registration successful!");
        window.location.reload();
      } else {
        toast.error("Registration failed. Email must be unique.");
      }
    } else {
      toast.error("Password and Retype Password did not match");
    }
  }

  return (
    <form className="flex flex-col gap-6" onSubmit={register}>
      {/* User name */}
      <div className="relative">
        <input
          type="text"
          name="name"
          id="name"
          className={`${inputStyle}`}
          placeholder=" "
          required
          value={username}
          onChange={(ev) => setUsername(ev.target.value)}
        />
        <label htmlFor="name" className={`${labelStyle}`}>
          User name
        </label>
      </div>

      {/* User email */}
      <div className="relative">
        <input
          type="email"
          name="email"
          id="email"
          className={`${inputStyle}`}
          placeholder=" "
          required
          value={email}
          onChange={(ev) => setEmail(ev.target.value)}
        />
        <label htmlFor="email" className={`${labelStyle}`}>
          Email address
        </label>
      </div>

      {/* Designation */}
      <div className="relative">
        <input
          type="text"
          name="designation"
          id="designation"
          className={`${inputStyle}`}
          placeholder=" "
          required
          value={designation}
          onChange={(ev) => setDesigntion(ev.target.value)}
        />
        <label htmlFor="designation" className={`${labelStyle}`}>
          Designation
        </label>
      </div>

      {/* Password */}
      <div className="relative">
        <div className="flex">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            id="password"
            className={`${inputStyle}`}
            placeholder=" "
            required
            minLength={4}
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
          />
          <p onClick={togglePasswordVisibility} className="ml-1">
            {EyeIcon}
          </p>
        </div>

        <label htmlFor="password" className={`${labelStyle}`}>
          Password
        </label>
      </div>

      {/* Retype Password */}
      <div className="relative">
        <div className="flex">
          <input
            type={showRetypePassword ? "text" : "password"}
            name="password"
            id="password"
            className={`${inputStyle}`}
            placeholder=" "
            required
            minLength={4}
            value={retypePassWord}
            onChange={(ev) => setretypePassword(ev.target.value)}
          />
          <p onClick={toggleRetypePasswordVisibility} className="ml-1">
            {EyeIconRetype}
          </p>
        </div>

        <label htmlFor="password" className={`${labelStyle}`}>
          Retype Password
        </label>
      </div>

      <button className={`${positiveButton} m-auto`}>Register</button>
    </form>
  );
}
