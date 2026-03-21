import styles from './Input.module.scss';
import paperclip from '../../assets/icons/paperclipIcon.svg';
import Send from '../../assets/icons/sendIcon.svg';
import Loading from '../../assets/icons/loadingIcon.svg';
import { useState } from 'react';

interface InputProps {
    onSendMessage: (text: string) => void;
    isTyping: boolean;
}

export default function Input({ onSendMessage, isTyping }: InputProps) {

    const [inputValue, setInputValue] = useState('');

    const handleSend = () => {
        if (inputValue.trim() === '' || isTyping) return;

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
                <div className={styles.send} onClick={handleSend} role="button" tabIndex={0} onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleSend();
                    }
                }}>
                    <img src={isTyping ? Loading : Send} alt="send icon" />
                </div>
            </div>
        </div>
    )
}