import Image from "next/image";
import styles from "./page.module.css";
import Copy from "@/svg/Copy";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.form}>
          <span>Генератор паролей</span>
          <div className={styles.length_input}>
            <span>Кол-во символов</span>
            <input type="number" className={styles.input}/>
          </div>
          <div className={styles.password_input}>
            <span>Пароль</span>
            <span className={styles.password}>Password</span>
            <button className={styles.copy}><Copy /></button>
          </div>
          <button className={styles.copy_btn}>Скопировать</button>
          <button className={styles.generate_button}>Сгенерировать</button>
        </div>
      </div>
    </main>
  );
}
