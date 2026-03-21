import styles from './ModelTextArea.module.scss';

interface ModelTextAreaProps {
    text: string;
}

export default function ModelTextArea({ text }: ModelTextAreaProps) {
    return (
        <div className={styles.modelText}>
            <p>{text}</p>
        </div>
    )
}