import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/EditNoteOutlined";
//import { IconButton } from "@mui/material";
import { Link } from "react-router-dom";

const UserTable = () => {
  const admin = window.localStorage.getItem("adminloggedIn");
  const [users, setUsers] = useState([]);

  const DeleteUser = async (id, username) => {
    if (window.confirm(`Are u sure u want to delete the user ${username}?`)) {
      await fetch("http://localhost:4000/fetch/remove", {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          userid: id,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          fetchData();
        });
    }
  };
  const fetchData = async () => {
    await fetch("http://localhost:4000/fetch/getUsers", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "usersData");
        setUsers(data.data);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="max-w-96 overflow-auto">
      <table className="table text-center overflow-x-auto">
        {/* head */}
        <thead>
          <tr className="">
            <th className="sticky left-0 z-10 bg-white">Serial No.</th>
            <th>User Name</th>
            <th>E-mail</th>
            <th>Designation</th>
          </tr>
        </thead>
        <tbody>
          {users.map((el, i) => {
            return (
              <tr className="">
                <td className="sticky left-0 z-10 bg-white">{i + 1}</td>
                <td className="">{el.username}</td>
                <td>{el.email}</td>
                <td className="">{el.designation}</td>

                {admin && (
                  <>
                    <td className="text-[#DB1E1E] cursor-pointer">
                      <button onClick={() => DeleteUser(el.id, el.username)}>
                        <DeleteIcon />

                        <p className="hover:underline">Delete</p>
                      </button>
                    </td>
                    <td className="text-[#0084FF] cursor-pointer">
                      <Link to={`/userEdit/${el.id}`}>
                        <EditIcon />
                        <p className="hover:underline">Edit</p>
                      </Link>
                    </td>
                  </>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
