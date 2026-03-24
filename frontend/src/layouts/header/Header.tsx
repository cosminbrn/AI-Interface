import styles from './Header.module.scss'
import burgerIcon from '../../assets/burger.svg';
import shareIcon from '../../assets/share.svg';
import userSmallIcon from '../../assets/icons/userSmallWhiteIcon.svg';

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
            <div className={styles.links}>
                <div className={styles.iconShare}>
                    <img src={shareIcon} alt="Share" />
                </div>
                <div className={styles.iconProfile}>
                    <img src={userSmallIcon} alt="Profile" />
                </div>
            </div>
        </nav>
    )
}