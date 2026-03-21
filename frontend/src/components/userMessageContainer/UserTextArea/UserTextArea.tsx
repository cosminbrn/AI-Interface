import styles from './UserTextArea.module.scss';

interface UserTextAreaProps {
    text: string;
}

export default function UserTextArea({ text }: UserTextAreaProps) {
    return (
        <div className={styles.userText}>
            <p>{text}</p>
        </div>
    )
}