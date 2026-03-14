import styles from './Chat.module.scss';
import ModelMessageContainer from '../../components/modelMessageContainer/ModelMessageContainer';

export default function Chat() {
    return (
        <div className={styles.chat}>
            <ModelMessageContainer />
        </div>
    )
}