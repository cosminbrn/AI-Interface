import styles from './Header.module.scss'
import Dropdown from '../../components/dropdown/Dropdown'
import burgerIcon from '../../assets/burger.svg';
import shareIcon from '../../assets/share.svg';

export function Header() {
    return (
        <nav className={styles.navbar}>
            <div className={styles.burger}>
                <img src={burgerIcon} alt="Menu" />
            </div>
            <Dropdown />
            <div className={styles.share}>
                <img src={shareIcon} alt="Share" />
            </div>
        </nav>
    )
}