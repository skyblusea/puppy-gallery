//제네릭 타입
import { FC } from "react";
import Dog from "./Dog";
import styles from "./dogs.module.css"


// React.FC : interface
interface DogsProps {
    dog: [string, string[]];

}

//FC : Function Component : 제네릭 타입으로 타입 명시
const Dogs: FC<DogsProps> = ({ dog }) => {
    const fetchedDogLength = dog[1].length
    console.log("fetchedDogLength",fetchedDogLength)
    console.log("dog",dog)
    return (
        <div className={styles.wrap}>
            {dog[1].length && dog[1].map((url) => {
                return (
                    <Dog key={url} breed={dog[0]} url={url} />
                )
            })}
            {/* fetchedDoglength가 3보다 작으면 차이만큼 NoPuppy 출력 */}
            {/* fill 하지 않으면 map 동작 X */}
            {fetchedDogLength < 3 && Array(3-fetchedDogLength).fill(null).map((ele,idx)=>{
                return (
                    <Dog key={idx} breed={dog[0]} url="/NoPuppy.png" />
                )
            })}

        </div>
    )
}

export default Dogs;