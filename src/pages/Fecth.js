import React, { useEffect, useState } from "react";

import api from "../config/api";

const Fecth = () => {
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);

  const fetchOne = async () => {
    const { data } = await api.get(
      `Dashboard/journey?from=2022-01-01&to=2022-03-15`
    );
    console.log("fetchOne", data);
    setData1(data);
  };
  const fetchTwo = async () => {
    const { data } = await api.get("/Dashboard/report/1/20");
    console.log("fetchTwo", data.data);
    setData2(data.data);
  };
  useEffect(() => {
    fetchOne();
    fetchTwo();
  }, []);
  return (
    <div>
      <h1>Fetch Page</h1>
      {data1?.length > 0 &&
        data1.map((dat) => <p key={dat.aaji}>{dat.aaji}</p>)}
      {data2?.length > 0 &&
        data2.map((dat) => (
          <p key={dat.mirecruitNumber}>{dat.candidateName}</p>
        ))}
    </div>
  );
};

export default Fecth;
