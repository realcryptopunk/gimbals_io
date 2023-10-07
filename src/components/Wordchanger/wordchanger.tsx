import styles from "./WordChanger.module.css"; // Import the CSS module


export default function wordchanger(){
  return (
    <div className={styles.wordChangerContainer}>
  <div className={styles.wordChanger}>
  <div className={styles.wordColor1}>Amazing</div>
    <div className={styles.wordColor2}>Talented</div>
    <div className={styles.wordColor3}>Indian</div>
    <div className={styles.wordColor4}>American</div>
  </div>
</div>

    );
};


