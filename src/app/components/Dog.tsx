import Image from "next/image";
import { FC } from "react";
import styles from "./dog.module.css"

interface DogProps {
    url: string;
    breed: string
}

const Dog: FC<DogProps> = ({breed, url}) => {
    
    return (
        <div className={styles.box}>
            <Image src={url} alt={breed} className={styles.img} fill />
        </div>
    )
}

export default Dog;