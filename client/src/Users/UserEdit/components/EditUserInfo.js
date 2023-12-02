import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { positiveButton } from "../../../components/DesignStandardize";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const EditUserInfo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [userdata, setUserData] = useState({
    username: "",
    email: "",
    designation: "",
  });
  const { username, email, designation } = userdata;

  const getUser = async () => {
    await axios
      .get(`http://localhost:4000/fetch/getSingleUser/${id}`)
      .then((res) => {
        setUserData(res.data);
        // console.log(res.data);
      });
  };
  const updateUser = async (e) => {
    try {
      e.preventDefault();
      await axios
        .put(`http://localhost:4000/fetch/updateUser/${id}`, userdata)
        .then((res) => {
          // console.log(res.data);
          navigate("/users");
        });
      toast.success("User Detais Updated Successfully!!");
    } catch (error) {
      toast.error("User Update Failed!!!");
    }
  };

  useEffect(() => {
    getUser();
  }, []);
  return (
    <form className="flex flex-col gap-5" onSubmit={updateUser}>
      {/* User information */}
      <div className="flex flex-col gap-3 items-center">
        {/* Change Email */}
        <div>
          <label className="label">
            <span className="label-text">
              Email <span className="font-semibold text-red-600">*</span>
            </span>
          </label>
          <input
            type="email"
            placeholder="Enter Email"
            className="input input-bordered input-md w-64 bg-gray-100 focus:bg-white"
            value={email}
            onChange={(e) =>
              setUserData({ ...userdata, email: e.target.value })
            }
            id="email"
            required
          />
        </div>

        {/* Change Username */}
        <div>
          <label className="label">
            <span className="label-text">
              Username <span className="font-semibold text-red-600">*</span>
            </span>
          </label>
          <input
            type="text"
            placeholder="Enter Email"
            className="input input-bordered input-md w-64 bg-gray-100 focus:bg-white"
            value={username}
            onChange={(e) =>
              setUserData({ ...userdata, username: e.target.value })
            }
            id="email"
            required
          />
        </div>

        {/* Change Designation */}
        <div>
          <label className="label">
            <span className="label-text">
              Designation <span className="font-semibold text-red-600">*</span>
            </span>
          </label>
          <input
            type="text"
            placeholder="Enter Designation"
            className="input input-bordered input-md w-64 bg-gray-100 focus:bg-white"
            value={designation}
            id="password"
            onChange={(e) =>
              setUserData({ ...userdata, designation: e.target.value })
            }
            required
          />
        </div>
      </div>

      <button className={`${positiveButton} m-auto`}>Submit</button>
    </form>
  );
};

export default EditUserInfo;
