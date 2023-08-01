import styles from "./page.module.css";
import getDogs from "@/hooks/getDogs";

import SSRPuppyGallery from "./components/SSRPuppyGallery";
import CSRPuppyGallery from "./components/CSRPuppyGallery";


export default async function Home() {
  const { fetchData, clearData, cacheRevalidation } = getDogs();
  const dogs = await fetchData();

  return (
    <main className={styles.main}>
      <CSRPuppyGallery dogs={dogs} fetchData={fetchData} cacheRevalidation={cacheRevalidation} clearData={clearData}/>
      {/* <SSRPPuppyGallery dogs={dogs} /> */}
    </main>
  );
}
