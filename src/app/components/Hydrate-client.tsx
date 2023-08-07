"use client";

import { Hydrate as RQHydrate, HydrateProps } from "@tanstack/react-query";


//hydrate : 서버에서 클라이언트로 데이터 전달
function Hydrate(props : HydrateProps){
  return <RQHydrate {...props} />
}

export default Hydrate;