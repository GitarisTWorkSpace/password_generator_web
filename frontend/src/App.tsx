import styles from "./page.module.css";
import Copy from "./svg/Copy";
import Check from "./svg/Check";
import { useState } from "react";
import axios from "axios";

export default function App() {
  const [passwordLength, setPassswordLength] = useState(8)
  const [useDigit, setUseDigit] = useState(true)
  const [usePunctuation, setUsePunctuation] = useState(true)

  const [password, setPasssword] = useState("Password")

  const [copied, setCopied] = useState(false)

  const copyInputBtn = async () => {
    try {
      await navigator.clipboard.writeText(password)
      console.log('Текст успешно скопирован в буфер обмена!')
      setCopied(true)
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Ошибка:', err)
    }
  }

  const generatePassword = async () => {
    if (Number.isNaN(passwordLength))
      setPassswordLength(8);

    const response = await axios.post("http://127.0.0.1:8900/generate?use_digit=" + useDigit + "&use_punctuation=" + usePunctuation+ "&length=" + passwordLength)
    const data = await response.data

    setPasssword(data.password)
  }

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.form}>
          <div className={styles.form__header}>Генератор паролей</div>
          <div className={styles.settings}>
            <div className={styles.settings__header}>Настройки пароля</div>
            <div className={styles.settings__grid}>
              <div className={styles.settings__grid__row_checkbox}>
                <input type="checkbox" className={styles.checkbox} checked={useDigit} onChange={(e) => {setUseDigit(e.target.checked)}} /> {/* digit */}
                <input type="checkbox" className={styles.checkbox} checked={usePunctuation} onChange={(e) => {setUsePunctuation(e.target.checked)}}/> {/* punctuation */}
              </div>
              <div className={styles.settings__grid__row_txt}>
                <span className={styles.digit__text}>Использовать цифры</span>
                <span className={styles.punctuation__text}>Использовать символы "{"{}"}@#$%^&?/"</span>
              </div>
            </div>
          </div>
          <div className={styles.length_input}>
            <div className={styles.length_input__text}>Кол-во символов</div>
            <input type="number" className={styles.input} value={passwordLength} onChange={(e) => {setPassswordLength(parseInt(e.target.value))}}/>
            <div className={styles.length_input__description}>мин:8 макс:32</div>
          </div>
          <div className={styles.password}>
            <div className={styles.password__header}>Пароль</div>
            <div className={styles.password_input}>
              <input className={styles.password_text} type="text" value={password} onChange={(e) => {setPasssword(e.target.value)}}/>
              <button className={styles.copy} onClick={copyInputBtn}>{copied ? <Check /> : <Copy />}</button>
            </div>
          </div>
          <div className={styles.buttons}>
            <button className={styles.copy_btn} onClick={copyInputBtn} >Скопировать</button>
            <button className={styles.generate_button} onClick={generatePassword}>Сгенерировать</button>
          </div>
        </div>
      </div>
    </main>
  );
}