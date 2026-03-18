import styles from './UserMessageContainer.module.scss';
import UserTextArea from './UserTextArea/UserTextArea';
import userIcon from '../../assets/userIcon.svg';

export default function UserMessageContainer () {
    return (
        <div className={styles.userMessageContainer}>
            <div className={styles.icon}>
                <img src={userIcon} alt="User Icon" />
            </div>
            <UserTextArea />
        </div>
    )
}