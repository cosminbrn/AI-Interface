import styles from './Chat.module.scss';
import ModelMessageContainer from '../../components/modelMessageContainer/ModelMessageContainer';
import UserMessageContainer from '../../components/userMessageContainer/UserMessageContainer';
import type { Message } from '../../types/chatTypes';
import { useEffect, useRef } from 'react';

interface ChatProps {
    messages: Message[];
    isTyping: boolean;
}

export default function Chat({ messages, isTyping }: ChatProps) {
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isTyping]);

    return (
        <div className={styles.chat}>
            <div className={styles.limitator}>
                {messages.map((message) => {
                    if (message.sender === 'user') {
                        return <UserMessageContainer key={message.id} text={message.text} timestamp={message.timestamp} />;
                    } else {
                        return <ModelMessageContainer key={message.id} text={message.text} timestamp={message.timestamp}/>;
                    }
                })}
                {isTyping && (
                    <div className={styles.typingIndicator}>NextGen is typing...</div>
                )}
                <div id="invisible" ref={messagesEndRef} />
            </div>
        </div>
    )
}