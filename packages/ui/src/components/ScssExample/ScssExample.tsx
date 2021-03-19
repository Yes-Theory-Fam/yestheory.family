import { h, FunctionComponent } from "preact";
import styles from "./ScssExample.module.scss";

export const ScssExample: FunctionComponent = () => (
  <div className={styles.example}>This text is red</div>
);
