import styles from "./page.module.css";
import getDogs from "@/hooks/getDogs";

import SSRPuppyTable from "./components/SSRPuppyTable";
import CSRPuppyTable from "./components/CSRPuppyTable";


export default async function Home() {
  const { fetchData, clearData } = getDogs();
  const dogs = await fetchData();

  return (
    <main className={styles.main}>
      <CSRPuppyTable dogs={dogs} fetchData={fetchData} clearData={clearData}/>
      {/* <SSRPuppyTable dogs={dogs} /> */}
    </main>
  );
}
