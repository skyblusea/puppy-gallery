import styles from "./page.module.css";
// import getDogs from "@/hooks/getDogs";

import SSRPuppyGallery from "./components/SSRPuppyGallery";
import CSRPuppyGallery from "./components/CSRPuppyGallery";
import Hydrate from "./components/Hydrate-client";
import getQueryClient from "@/lib/get-query-client";
import { dehydrate } from "@tanstack/react-query";
import { fetchAllBreeds, getRandomBreeds, useDogsQuery } from "@/hooks/useDogsQuery";



export default async function Home() {
  // const { fetchData, clearData, cacheRevalidation } = getDogs();
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(["allBreeds"], fetchAllBreeds);
  const dehydratedState = dehydrate(queryClient);
  return (
    <Hydrate state={dehydratedState}>
      <main className={styles.main}>
        {/* <CSRPuppyGallery/> */}
        {/* <CSRPuppyGallery dogs={dogs} fetchData={fetchData} cacheRevalidation={cacheRevalidation} clearData={clearData} /> */}
        {/* <SSRPPuppyGallery dogs={dogs} /> */}
      </main>
    </Hydrate>
  );
}
