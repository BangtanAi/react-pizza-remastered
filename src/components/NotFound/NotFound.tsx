import React from "react";
import styles from "./NotFound.module.scss";

const NotFound: React.FC = () => {
  return (
    <div className="container">
      <div className={styles.root}>
        <h2>По вашему запросу ничего не найдено</h2>
      </div>
    </div>
  );
}

export default NotFound;
