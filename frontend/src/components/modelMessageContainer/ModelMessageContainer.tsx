import styles from './ModelMessageContainer.module.scss';
import chatIcon from '../../assets/icons/chatIcon.svg';
import ModelTextArea from './ModelTextArea/ModelTextArea';

interface ModelMessageContainerProps {
    text: string;
    timestamp: Date | string;
}

export default function ModelMessageContainer({ text, timestamp  }: ModelMessageContainerProps) {

    const timeString = new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    return (
        <div className={styles.modelMessageContainer}>
            <div className={styles.icon}>
                <img src={chatIcon} alt="chat icon" />
            </div>
            <div className={styles.content}>
                <ModelTextArea text={text} />
                <div className={styles.timestamp}>{timeString}</div>
            </div>
        </div>
    )
}