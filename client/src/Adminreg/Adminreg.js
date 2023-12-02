import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { generalInput, positiveButton } from "../components/DesignStandardize";
import Logo from "../img/Logo.png";
export default function Adminreg() {
  //used as a registration page
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  async function register(ev) {
    ev.preventDefault();
    const response = await fetch("http://localhost:4000/auth/adminReg", {
      method: "POST",
      body: JSON.stringify({ email, password, username }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.status === 200) {
      alert("Registration successful!");
      navigate("/");
    } else {
      alert("Registration failed. email must be unique.");
    }
  }

  return (
    <div className="mt-20 font-lato flex flex-col gap-6 font-[Poppins] items-center">
      <p className="text-center text-3xl">Admin Register</p>
      <img className="w-48" src={Logo} alt="SCS Logo" />
      <form className="flex flex-col gap-3" onSubmit={register}>
        {/* Admin Email Reg */}
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
            onChange={(ev) => setEmail(ev.target.value)}
            required
          />
        </div>

        {/* Admin Password Reg */}
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
            onChange={(ev) => setPassword(ev.target.value)}
            required
          />
        </div>

        {/* Admin Name Reg */}
        <div>
          <label className="label">
            <span className="label-text">
              Enter Name <span className="font-semibold text-red-600">*</span>
            </span>
          </label>
          <input
            type="text"
            placeholder="Enter a name"
            className={`${generalInput}`}
            value={username}
            onChange={(ev) => setUsername(ev.target.value)}
            required
          />
        </div>

        <button className={`${positiveButton} mt-3 m-auto`}>Register</button>
      </form>
    </div>
  );
}
