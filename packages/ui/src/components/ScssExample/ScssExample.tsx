import { h, FunctionComponent } from "preact";
import styles from "./ScssExample.module.scss";
import { Button } from "@chakra-ui/react";

export const ScssExample: FunctionComponent = () => (
  <div className={styles.example}>
    This text is red
    <Button>Example button inside custom component</Button>
  </div>
);
