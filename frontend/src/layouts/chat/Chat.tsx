import styles from './Chat.module.scss';
import ModelMessageContainer from '../../components/modelMessageContainer/ModelMessageContainer';
import UserMessageContainer from '../../components/userMessageContainer/UserMessageContainer';
import type { Message } from '../../features/page/Page';

interface ChatProps {
    messages: Message[];
}

export default function Chat({ messages }: ChatProps) {
    return (
        <div className={styles.chat}>
            {messages.map((message) => {
                if (message.sender === 'user') {
                    return <UserMessageContainer key={message.id} text={message.text} />;
                } else {
                    return <ModelMessageContainer key={message.id} text={message.text} />;
                }
            })}
        </div>
    )
}