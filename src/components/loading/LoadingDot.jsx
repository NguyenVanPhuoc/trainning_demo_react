import styles from "./styles.module.css";

function LoadingDot() {

  return (
    <div className={ styles.wrapper }>
      <div className={ styles.circle }></div>
      <div className={ styles.circle }></div>
      <div className={ styles.circle }></div>
  </div>    
  );
}

export default LoadingDot;