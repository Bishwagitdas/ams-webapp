import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ShowDiffRate = (id) => {
  const { CustomerID } = id.id;
  console.log(CustomerID);
  const [diffrateData, setDiffrateData] = useState({
    tillW1: 0,
    val1: 0,
    tillW2: 0,
    val2: 0,
    tillW3: 0,
    val3: 0,
    tillW4: 0,
    val4: 0,
    tillW5: 0,
    val5: 0,
  });

  const {
    tillW1,
    val1,
    tillW2,
    val2,
    tillW3,
    val3,
    tillW4,
    val4,
    tillW5,
    val5,
  } = diffrateData;

  const fetchDiffrate = async () => {
    try {
      const result = await axios.get(
        `http://localhost:4000/prepaid/getSingleDiffrate/${CustomerID}`
      );
      console.log(result.data);
      setDiffrateData(result.data);
    } catch (error) {}
  };

  useEffect(() => {
    fetchDiffrate();
  }, [CustomerID]);

  return (
    <div className="m-auto card w-max shadow-lg px-3">
      <div className="card-body grid grid-cols-2 gap-3">
        {tillW1 !== 0 && (
          <div>
            <strong>Weight 1 : </strong>
            {tillW1}
          </div>
        )}
        {val1 !== 0 && (
          <div>
            <strong>Value 1 : </strong>
            {val1}
          </div>
        )}

        {tillW2 !== 0 && (
          <div>
            <strong>Weight 2 : </strong>
            {tillW2}
          </div>
        )}
        {val2 !== 0 && (
          <div>
            <strong>Value 2 : </strong>
            {val2}
          </div>
        )}

        {tillW3 !== 0 && (
          <div>
            <strong>Weight 3 : </strong>
            {tillW3}
          </div>
        )}
        {val3 !== 0 && (
          <div>
            <strong>Value 3 : </strong>
            {val3}
          </div>
        )}

        {tillW4 !== 0 && (
          <div>
            <strong>Weight 4 : </strong>
            {tillW4}
          </div>
        )}
        {val4 !== 0 && (
          <div>
            <strong>Value 4 : </strong>
            {val4}
          </div>
        )}

        {tillW5 !== 0 && (
          <div>
            <strong>Weight 5 : </strong>
            {tillW5}
          </div>
        )}
        {val5 !== 0 && (
          <div>
            <strong>Value 5 : </strong>
            {val5}
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowDiffRate;
