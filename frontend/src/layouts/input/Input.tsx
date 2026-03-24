import styles from './Input.module.scss';
import paperclip from '../../assets/icons/paperclipIcon.svg';
import Send from '../../assets/icons/sendIcon.svg';
import Loading from '../../assets/icons/loadingIcon.svg';
import { useEffect, useState } from 'react';
import Dropdown from '../../components/dropdown/Dropdown';

interface InputProps {
    onSendMessage: (text: string) => void;
    isTyping: boolean;
    clearInputTrigger: number;
}

export default function Input({ onSendMessage, isTyping, clearInputTrigger }: InputProps) {

    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        setInputValue('');
    }, [clearInputTrigger]);

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
                    aria-label="Message input"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <Dropdown />
                <div className={styles.send} onClick={handleSend} role="button" tabIndex={0} aria-label="Send message" aria-disabled={isTyping || inputValue.trim() === ''} onKeyDown={(e) => {
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