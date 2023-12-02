import React, { useEffect } from "react";
import RightArrowIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import CloseIcon from "@mui/icons-material/CloseOutlined";
import UserReg from "./UserReg";
import { blackLinkButton } from "../../components/DesignStandardize";

const FirstSection = () => {
  const admin = window.localStorage.getItem("adminloggedIn");
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (event.target.id === "my_modal_5") {
        document.getElementById("my_modal_5").close();
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const closeModal = () => {
    document.getElementById("my_modal_5").close();
  };

  return (
    <>
      <div className="flex flex-col gap-1 pb-8 border-b-2 border-gray-200 font-[Poppins]">
        <span className="text-3xl font-extrabold text-black">Total Users</span>
        {admin ? (
          <p className="text-[#9FA1A6]">
            You are viewing the total number of users that have access to this
            software. You can add or remove users any time.
          </p>
        ) : (
          <p>
            You are viewing the total number of users that have access to this
            software.
          </p>
        )}
      </div>
      <div className="flex flex-col md:flex-row gap-3 justify-between">
        <div>
          <p className="text-[#0084FF] text-lg border-b-2 border-[#0084FF] px-2 w-max">
            Total Users
          </p>
        </div>
        {admin && (
          <button
            className={`${blackLinkButton}`}
            onClick={() => document.getElementById("my_modal_5").showModal()}
          >
            Add Users <RightArrowIcon />
          </button>
        )}
      </div>

      {/* Popup Modal for adding user */}
      <dialog id="my_modal_5" className="modal m-auto w-11/12 md:w-1/2">
        <div className="modal-box flex flex-col gap-5">
          <div className="flex flex-col gap-3 text-lg">
            <p className="font-bold flex justify-between items-center">
              Add Users
              <button
                className="w-max hover:tooltip hover:tooltip-bottom"
                data-tip="Close"
                onClick={closeModal}
              >
                <CloseIcon />
              </button>
            </p>
            <p className="text-sm text-[#9FA1A6]">
              Press ESC key or click close button to close
            </p>
          </div>
          <UserReg />
        </div>
      </dialog>
    </>
  );
};

export default FirstSection;
