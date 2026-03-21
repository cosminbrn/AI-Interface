import styles from './ModelTextArea.module.scss';
import ReactMarkdown from 'react-markdown'

interface ModelTextAreaProps {
    text: string;
}

export default function ModelTextArea({ text }: ModelTextAreaProps) {
    return (
        <div className={styles.modelText}>
            <ReactMarkdown>{text}</ReactMarkdown>
        </div>
    )
}