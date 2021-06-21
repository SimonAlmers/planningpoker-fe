import React from "react";
import styles from "../../../../SessionDetail.module.scss";

const StatusIndicator = ({ isOnline }: { isOnline: boolean }): JSX.Element => (
  <i
    className={`${styles.statusIndicator} ${
      isOnline ? styles.isOnline : styles.isOffline
    }`}
  />
);
export default StatusIndicator;
