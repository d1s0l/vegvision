import Image from "next/image";
import { plantStatusText } from "../../model/analysis";
import type { PlantAnalysis } from "../../model/types";
import styles from "./AnalysisRow.module.scss";

interface AnalysisRowProps {
  analysis: PlantAnalysis;
}

const statusClassName = {
  Good: styles.good,
  Risk: styles.risk,
  Problem: styles.problem,
};

export function AnalysisRow({ analysis }: AnalysisRowProps) {
  return (
    <div className={styles.stroke}>
      <div className={styles.left}>
        <div>
          <Image src={analysis.image} alt="img" height={50} width={50} />
        </div>
        <div className={styles.info}>
          <span>{analysis.name} - {analysis.place}</span>
          <span>{analysis.date}</span>
        </div>
      </div>
      <div className={styles.right}>
        <a href="/a" className={statusClassName[analysis.status]}>
          {plantStatusText[analysis.status]}
        </a>
      </div>
    </div>
  );
}
