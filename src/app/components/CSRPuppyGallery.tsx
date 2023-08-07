"use client"
import { FC, use, useEffect, useState } from "react";
import Button from "./Button";
import PuppyTable from "./PuppyTable";
import { useDogsQuery } from "@/hooks/useDogsQuery";



// interface CSRPuppyGalleryProps {
//   dogs: [string, string[]][];
//   fetchData:() => Promise<[string, string[]][]>;
//   clearData:() => void;
//   cacheRevalidation:() => Promise<[string, string[]][]>;
// }



const CSRPuppyGallery = ({}) => {

  // const [apiCall, setApiCall] = useState(1)
  // const [refetchedDogs, setRefetchedDogs] = useState(dogs)
  // useEffect(() => {
  //   cacheRevalidation().then((data) => {
  //     setRefetchedDogs(data)
  //   })
  // }, [apiCall])
  // const dogs = useDogsQuery()
  // console.log(dogs)
  return (
    <div className="table">
      {/* <div className="buttons">
        <Button onClick={()=>setApiCall(apiCall+1)}>Refetch</Button>
        <Button onClick={()=>clearData()}>Reset Cache</Button>
      </div>
      API Call : {apiCall} */}
      {/* <PuppyTable dogs={refetchedDogs} /> */}
    </div>

  );
};

export default CSRPuppyGallery;


