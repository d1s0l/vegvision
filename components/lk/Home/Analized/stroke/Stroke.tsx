import Image from "next/image";
import styles from "./Stroke.module.scss"


export type PlantType = "Good" | "Risk" | "Problem"

export interface StrokeProps{
    image: string;
    name: string;
    date: string;
    place: string;
    status: PlantType;
}

export const PlantConfig: Record<
  PlantType,
  { text: string; className: string }
> = {
  Good: {
    text: "Здоровое",
    className: styles.good,
  },
  Risk: {
    text: "Риск заболевания",
    className: styles.risk,
  },
  Problem: {
    text: "Обнаружено заболевание",
    className: styles.problem,
  },
};


export function Stroke({image, name, date, place, status}: StrokeProps){
    const config = PlantConfig[status];

    return(
        <div className={styles.stroke}>
            <div className={styles.left}>
                <div>
                    <Image 
                        src={image}
                        alt="img"
                        height={50}
                        width={50}
                    />
                </div>
                <div className={styles.info}>
                    <span>{name} - {place}</span>
                    <span>{date}</span>
                </div>
            </div>
            <div className={styles.right}>
                <a href="/a" className={config.className}>
                    {config.text}
                </a>
            </div>
        </div>
    )
}