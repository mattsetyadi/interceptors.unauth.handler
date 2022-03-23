import React, { useEffect, useState } from "react";

import api from "../config/api";

const Fecth = () => {
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);

  const fetchOne = async () => {
    const { data } = await api.get("/case/template");
    console.log("fetchOne", data);
    setData1(data);
  };
  const fetchTwo = async () => {
    const { data } = await api.get("/taskKeys?TaskType=1");
    console.log("fetchTwo", data);
    setData2(data);
  };
  useEffect(() => {
    fetchOne();
    fetchTwo();
  }, []);
  return (
    <div>
      <h1>Fetch Page</h1>
      {data1.map((dat) => (
        <p key={dat.id}>{dat.id}</p>
      ))}
      {data2.map((dat) => (
        <p key={dat.taskId}>{dat.taskId}</p>
      ))}
    </div>
  );
};

export default Fecth;
