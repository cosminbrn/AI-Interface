import styles from './Button.module.scss';

interface ButtonProps {
    onNewChat: () => void;
}

export default function Button({ onNewChat }: ButtonProps) {
    return (
        <div className={styles.newChatButton} onClick={onNewChat}>
            <div className={styles.text}>New Chat</div>
        </div>
    )
}