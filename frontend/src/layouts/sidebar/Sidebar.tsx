import styles from './Sidebar.module.scss';
import messageIcon from '../../assets/icons/chatIcon.svg'; 
import userAvatar from '../../assets/icons/userIcon.svg'; 
import closeIcon from '../../assets/icons/closeIcon.svg';
import plusIcon from '../../assets/icons/paperclipIcon.svg';
import gearIcon from '../../assets/icons/gearIcon.svg';

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
    return (
        <>
            {isOpen && <div className={styles.overlay} onClick={onClose}></div>}

            <aside className={`${styles.sidebar} ${isOpen ? styles.sidebarOpen : ''}`}>
                <div className={styles.topSection}>
                    <div className={styles.newChatButton}>
                        <div className={styles.text}>New Chat</div>
                    </div>
                    <div className={styles.closeBtn} onClick={onClose}>
                        <img src={closeIcon} alt="Close Menu" />
                    </div>
                </div>
            </aside>
        </>
    );
}