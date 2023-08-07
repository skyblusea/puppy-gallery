import { QueryClient } from "@tanstack/react-query";
import { cache } from "react";

//쿼리 클라이언트는 쿼리를 캐시하고 관리하는데 사용
const getQueryClient = cache(()=> new QueryClient());
export default getQueryClient;
