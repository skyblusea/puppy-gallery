"use client"
import { FC, use, useEffect, useState } from "react";
import Dogs from "./Dogs";

import Button from "./Button";
import PuppyTable from "./PuppyTable";

interface CSRPuppyTable {
  dogs: [string, string[]][];
  fetchData:() => Promise<[string, string[]][]>;
  clearData:() => void;
}


const CSRPuppyTable: FC<CSRPuppyTable> = ({ dogs,fetchData, clearData }) => {
  const [apiCall, setApiCall] = useState(1)
  const [refetchedDogs, setRefetchedDogs] = useState(dogs)
  useEffect(() => {
    fetchData().then((data) => {
      setRefetchedDogs(data)
    })
  }, [apiCall])


  return (
    <div className="table">
      <div className="buttons">
        <Button onClick={()=>setApiCall(apiCall+1)}>Refetch</Button>
        <Button onClick={()=>clearData()}>Reset Cache</Button>
      </div>
      API Call : {apiCall}
      <PuppyTable dogs={refetchedDogs} />
    </div>

  );
};

export default CSRPuppyTable;
