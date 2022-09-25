import { useState } from "react";
import Button from "./Button";
import * as styles from "./Folding.css";

interface Props {
  name: string;
  children: React.ReactNode;
}

export default function Folding(props: Props) {
  const [folded, setFolded] = useState(true);
  const onClick = () => {
    setFolded(!folded);
  };

  return (
    <div className={styles.empty}>
      <Button className={styles.button} onClick={onClick}>
        {props.name}
      </Button>
      {!folded && (
        <>
          <p>{props.name}</p>
          {props.children}
        </>
      )}
    </div>
  );
}
