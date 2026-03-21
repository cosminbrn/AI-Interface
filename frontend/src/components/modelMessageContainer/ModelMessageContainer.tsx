import styles from './ModelMessageContainer.module.scss';
import chatIcon from '../../assets/icons/chatIcon.svg';
import ModelTextArea from './ModelTextArea/ModelTextArea';

export default function ModelMessageContainer() {
    return (
        <div className={styles.modelMessageContainer}>
            <div className={styles.icon}>
                <img src={chatIcon} alt="chat icon" />
            </div>
            <ModelTextArea />
        </div>
    )
}