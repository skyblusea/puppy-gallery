import styles from "./page.module.css";
import Dogs from "@/app/components/Dogs";
import getDogs from "@/hooks/getDogs";
import Button from "./components/Button";


export default async function Home() {
  const { fetchData, clearData } = getDogs();
  const dogs = await fetchData();

  return (
    <main className={styles.main}>

      <div className={styles.table}>
        {dogs.map((dog) => {
          return (
            //! initialState 때문에 key값이 똑같은 경우가 있음
            !!dog && <Dogs key={dog[0]} dog={dog} />
          );
        })}
      </div>
    </main>
  );
}
