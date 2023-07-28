import styles from "./page.module.css";
import Dogs from "@/app/components/Dogs";
import getDogs from "@/hooks/getDogs";

export default async function Home() {
  const dogs = await getDogs();

  return (
    <main className={styles.main}>
      <div className={styles.table}>
        {dogs.map((dog) => {
          return (
            //! initialState 때문에 key값이 똑같은 경우가 있음
            !!dog.breed && <Dogs key={dog.breed} dog={dog} />
          );
        })}
      </div>
    </main>
  );
}
