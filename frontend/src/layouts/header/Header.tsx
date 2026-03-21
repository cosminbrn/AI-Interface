import styles from './Header.module.scss'
import Dropdown from '../../components/dropdown/Dropdown'
import burgerIcon from '../../assets/burger.svg';
import shareIcon from '../../assets/share.svg';

interface HeaderProps {
    onMenuClick: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
    return (
        <nav className={styles.navbar}>
            <div className={styles.burger} onClick={onMenuClick}>
                <img src={burgerIcon} alt="Menu" />
            </div>
            <Dropdown />
            <div className={styles.share}>
                <img src={shareIcon} alt="Share" />
            </div>
        </nav>
    )
}