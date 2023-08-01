import Image from "next/image";
import { FC } from "react";
import styles from "./dog.module.css"
import { StaticImageData } from "next/image";

interface DogProps {
    url: string | StaticImageData;
    breed: string;
}

const Dog: FC<DogProps> = ({breed, url}) => {
    
    return (
        <div className={styles.box}>
            <Image src={url} alt={breed} className={styles.img} fill sizes="100%" />
        </div>
    )
}

export default Dog;