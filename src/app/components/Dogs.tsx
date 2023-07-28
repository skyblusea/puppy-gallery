//제네릭 타입
import { FC } from "react";
import Dog from "./Dog";
import styles from "./dogs.module.css"

// React.FC : interface
interface DogsProps {
    dog: { breed:string, urls:string[] };
}

//FC : Function Component : 제네릭 타입으로 타입 명시
const Dogs: FC<DogsProps> = ({dog}) => {
    return (
        <div className={styles.wrap}>
            {dog.urls.length && dog.urls.map((url) => {
                return (
                    <Dog key={url} breed={dog.breed} url={url} />
                )
            })}
        </div>
    )
}

export default Dogs;