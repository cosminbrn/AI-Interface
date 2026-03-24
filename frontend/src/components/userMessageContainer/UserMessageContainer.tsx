import styles from './UserMessageContainer.module.scss';
import UserTextArea from './UserTextArea/UserTextArea';
import userIcon from '../../assets/icons/userIcon.svg';

interface UserMessageContainerProps {
    text: string;
    timestamp: Date | string;
}

export default function UserMessageContainer ({ text, timestamp }: UserMessageContainerProps) {

    const timeString = new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    return (
        <div className={styles.userMessageContainer}>
            <div className={styles.icon}>
                <img src={userIcon} alt="User Icon" />
            </div>
            
            <div className={styles.content}>
                <div className={styles.timestamp}>{timeString}</div>
                <UserTextArea text={text} />
            </div>
        </div>
    )
}