import styles from './Chat.module.scss';
import ModelMessageContainer from '../../components/modelMessageContainer/ModelMessageContainer';
import UserMessageContainer from '../../components/userMessageContainer/UserMessageContainer';

export default function Chat() {
    return (
        <div className={styles.chat}>
            <ModelMessageContainer />
            <UserMessageContainer />
        </div>
    )
}