import styles from './Input.module.scss';
import paperclip from '../../assets/icons/paperclipIcon.svg';
import Send from '../../assets/icons/sendIcon.svg';

export default function Input() {
    return (
        <div className={styles.backgroundContainer}>
            <div className={styles.inputContainer}>
                <div className={styles.attach}>
                    <img src={paperclip} alt="attach icon" />
                </div>
                <textarea
                    className={styles.textarea}
                    placeholder="Message NexGen"
                />
                <div className={styles.send}>
                    <img src={Send} alt="send icon" />
                </div>
            </div>
        </div>
    )
}