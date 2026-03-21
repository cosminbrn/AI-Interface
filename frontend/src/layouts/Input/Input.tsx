import styles from './Input.module.scss';
import paperclip from '../../assets/icons/paperclipIcon.svg';
import Send from '../../assets/icons/sendIcon.svg';
import { useState } from 'react';

interface InputProps {
    onSendMessage: (text: string) => void;
}

export default function Input({ onSendMessage }: InputProps) {

    const [inputValue, setInputValue] = useState('');

    const handleSend = () => {
        if (inputValue.trim() === '') return;

        onSendMessage(inputValue);
        setInputValue('');
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className={styles.backgroundContainer}>
            <div className={styles.inputContainer}>
                <div className={styles.attach}>
                    <img src={paperclip} alt="attach icon" />
                </div>
                <textarea
                    className={styles.textarea}
                    placeholder="Message NexGen"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <div className={styles.send}>
                    <img src={Send} alt="send icon" />
                </div>
            </div>
        </div>
    )
}