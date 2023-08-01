"use client"
import { FC, useEffect, useState } from "react";
import Button from "./Button";
import PuppyTable from "./PuppyTable";

interface CSRPuppyGalleryProps {
  dogs: [string, string[]][];
  fetchData:() => Promise<[string, string[]][]>;
  clearData:() => void;
  cacheRevalidation:() => Promise<[string, string[]][]>;
}


const CSRPuppyGallery: FC<CSRPuppyGalleryProps> = ({ dogs,fetchData,cacheRevalidation, clearData }) => {
  const [apiCall, setApiCall] = useState(1)
  const [refetchedDogs, setRefetchedDogs] = useState(dogs)
  useEffect(() => {
    cacheRevalidation().then((data) => {
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

export default CSRPuppyGallery;
