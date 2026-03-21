import styles from './ModelMessageContainer.module.scss';
import chatIcon from '../../assets/icons/chatIcon.svg';
import ModelTextArea from './ModelTextArea/ModelTextArea';

interface ModelMessageContainerProps {
    text: string;
}

export default function ModelMessageContainer({ text }: ModelMessageContainerProps) {
    return (
        <div className={styles.modelMessageContainer}>
            <div className={styles.icon}>
                <img src={chatIcon} alt="chat icon" />
            </div>
            <ModelTextArea text={text}/>
        </div>
    )
}