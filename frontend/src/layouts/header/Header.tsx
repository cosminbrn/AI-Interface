import styles from './Header.module.scss'
import burgerIcon from '../../assets/burger.svg';
import shareIcon from '../../assets/share.svg';

interface HeaderProps {
    onMenuClick: () => void;
    currentSession: string;
}

export function Header({ onMenuClick, currentSession }: HeaderProps) {
    return (
        <nav className={styles.navbar}>
            <div className={styles.burger} onClick={onMenuClick}>
                <img src={burgerIcon} alt="Menu" />
            </div>
            <div className={styles.sessionName}>
                {currentSession}
            </div>
            <div className={styles.share}>
                <img src={shareIcon} alt="Share" />
            </div>
        </nav>
    )
}