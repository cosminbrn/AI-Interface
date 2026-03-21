import styles from './Sidebar.module.scss';
import messageIcon from '../../assets/icons/clockIcon.svg'; 
import userAvatar from '../../assets/icons/userIcon.svg'; 
import closeIcon from '../../assets/icons/closeIcon.svg';
import plusIcon from '../../assets/icons/paperclipIcon.svg';
import gearIcon from '../../assets/icons/gearIcon.svg';
import type { ChatSession } from '../../features/page/Page';

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
    sessions: ChatSession[];
    currentSessionId: string;
    onSessionSelect: (sessionId: string) => void;
    onNewChat: () => void;
}

export default function Sidebar({ isOpen, onClose, sessions, currentSessionId, onSessionSelect, onNewChat }: SidebarProps) {
    return (
        <>
            {isOpen && <div className={styles.overlay} onClick={onClose}></div>}

            <aside className={`${styles.sidebar} ${isOpen ? styles.sidebarOpen : ''}`}>
                <div className={styles.topSection}>
                    <div className={styles.newChatButton} onClick={onNewChat}>
                        <div className={styles.text}>New Chat</div>
                    </div>
                    <div className={styles.closeBtn} onClick={onClose}>
                        <img src={closeIcon} alt="Close Menu" />
                    </div>
                </div>

                <div className={styles.historyList}>
                    <div className={styles.historyGroup}>
                        <div className={styles.historyTitle}>Today</div>
                        {sessions.map((session) => (
                            <div
                                key={session.id}
                                className={`${styles.historyItem} ${session.id === currentSessionId ? styles.active : ''}`}
                                onClick={() => onSessionSelect(session.id)}
                            >
                                <img src={messageIcon} alt="" />
                                <div className={styles.itemText}>{session.title}</div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className={styles.bottomSection}>
                    <div className={styles.userProfile}>
                        <img src={userAvatar} alt="User" className={styles.avatar} />
                        <div className={styles.userName}>Cosmin-George Baroana</div>
                        <img src={gearIcon} alt="Settings" className={styles.optionsIcon} />
                    </div>
                </div>
            </aside>
        </>
    );
}