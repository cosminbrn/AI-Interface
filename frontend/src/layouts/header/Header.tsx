import styles from './Header.module.scss'
import burgerIcon from '../../assets/icons/burgerIcon.svg';
import shareIcon from '../../assets/icons/shareIcon.svg';
import userSmallIcon from '../../assets/icons/userSmallWhiteIcon.svg';
import aiLogoIcon from '../../assets/icons/aiIcon.svg';

interface HeaderProps {
    onMenuClick: () => void;
    onLogoClick?: () => void;
    currentSession: string;
}

export function Header({ onMenuClick, onLogoClick, currentSession }: HeaderProps) {
    return (
        <nav className={styles.navbar}>
            <div className={styles.utilities}>
                <div className={styles.iconLogo} onClick={onLogoClick}>
                    <img src={aiLogoIcon} alt="AI Logo" />
                </div>
                <div className={styles.iconBurger} onClick={onMenuClick}>
                    <img src={burgerIcon} alt="Menu" />
                </div>
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