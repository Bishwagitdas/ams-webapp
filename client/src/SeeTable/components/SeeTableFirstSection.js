import React from 'react'
import CustomerDetails from '../../Monthly/AddMonthlyCustomers/components/CustomerDetails'
import { blackLinkButton } from '../../components/DesignStandardize';
import CloseIcon from "@mui/icons-material/CloseOutlined";
const SeeTableFirstSection = () => {
    const closeModal = () => {
        document.getElementById("my_modal_5").close();
        // fetchData();
      };
  return (
    <>
    <button
            className={`${blackLinkButton}`}
            onClick={() => {
              document.getElementById("my_modal_5").showModal()}}
          >
      Add New Customer
      </button>

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
          <CustomerDetails inSeeTable/>
        </div>
      </dialog>
      </>
  )
}

export default SeeTableFirstSection