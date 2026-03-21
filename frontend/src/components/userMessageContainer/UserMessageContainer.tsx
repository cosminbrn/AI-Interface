import styles from './UserMessageContainer.module.scss';
import UserTextArea from './UserTextArea/UserTextArea';
import userIcon from '../../assets/icons/userIcon.svg';

interface UserMessageContainerProps {
    text: string;
}

export default function UserMessageContainer ({ text }: UserMessageContainerProps) {
    return (
        <div className={styles.userMessageContainer}>
            <div className={styles.icon}>
                <img src={userIcon} alt="User Icon" />
            </div>
            <UserTextArea text={text} />
        </div>
    )
}