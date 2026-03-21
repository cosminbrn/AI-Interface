import styles from './Chat.module.scss';
import ModelMessageContainer from '../../components/modelMessageContainer/ModelMessageContainer';
import UserMessageContainer from '../../components/userMessageContainer/UserMessageContainer';
import Input from '../../components/Input/Input';

export default function Chat() {
    return (
        <div className={styles.chat}>
            <ModelMessageContainer />
            <UserMessageContainer />
            <ModelMessageContainer />
            <UserMessageContainer />
        </div>
    )
}