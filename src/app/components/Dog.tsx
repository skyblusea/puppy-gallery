import Image from "next/image";
import { FC, useState } from "react";
import styles from "./dog.module.css"
import { StaticImageData } from "next/image";

interface DogProps {
    url: string | StaticImageData;
    breed: string;
}

const Dog: FC<DogProps> = ({breed, url}) => {
    const [isError, setIsError] = useState(false)
    const fallBackSrc = "/NoPuppy.png"
    return (
        <div className={styles.box}>
            <Image src={isError ?fallBackSrc :url} alt={breed} className={styles.img} fill sizes="100%" onError={(e)=>setIsError(true)}/>
        </div>
    )
}

export default Dog;