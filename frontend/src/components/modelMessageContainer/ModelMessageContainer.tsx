import styles from './ModelMessageContainer.module.scss';
import chatIcon from '../../assets/icons/chatIcon.svg';
import ModelTextArea from './ModelTextArea/ModelTextArea';
import copyIcon from '../../assets/icons/copyIcon.svg';
import refreshIcon from '../../assets/icons/refreshIcon.svg';
import thumbsUpIcon from '../../assets/icons/thumbsUpIcon.svg';
import thumbsDownIcon from '../../assets/icons/thumbsDownIcon.svg';

interface ModelMessageContainerProps {
    text: string;
    timestamp: Date | string;
}

export default function ModelMessageContainer({ text, timestamp  }: ModelMessageContainerProps) {

    const handleCopy = () => {
        navigator.clipboard.writeText(text);
    }

    const timeString = new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    return (
        <div className={styles.modelMessageContainer}>
            <div className={styles.icon}>
                <img src={chatIcon} alt="chat icon" />
            </div>
            <div className={styles.content}>
                <ModelTextArea text={text} />
                <div className={styles.footer}>
                    <div className={styles.actions}>
                        <div className={styles.actionButton} onClick={handleCopy} title="Copy text">
                            <img src={copyIcon} alt="Copy" />
                        </div>
                        <div className={styles.actionButton} title="Regenerate response">
                            <img src={refreshIcon} alt="Regenerate" />
                        </div>
                        <div className={styles.actionButton} title="Good response">
                            <img src={thumbsUpIcon} alt="Like" />
                        </div>
                        <div className={styles.actionButton} title="Bad response">
                            <img src={thumbsDownIcon} alt="Dislike" />
                        </div>
                    </div>
                    <div className={styles.timestamp}>{timeString}</div>
                </div>
            </div>
        </div>
    )
}