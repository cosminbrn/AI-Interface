import styles from './Dropdown.module.scss';
import arrow from '../../assets/arrow.svg'

export default function Dropdown() {
    return (
        <div className={styles.dropdown}>
            <div className={styles.text}>GPT-4o</div>
            <img src={arrow} alt="Dropdown Arrow" className={styles.arrow} />
        </div>
    )
}