import styles from "./WordChanger.module.css"; // Import the CSS module


export default function wordchanger(){
  return (
    <div className={styles.wordChangerContainer}>
  <div className={styles.wordChanger}>
  <div className={styles.wordColor1}>Visionary</div>
    <div className={styles.wordColor2}>Talented</div>
    <div className={styles.wordColor3}>Local</div>
    <div className={styles.wordColor4}>Creative</div>
  </div>
</div>

    );
};


