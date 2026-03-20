import styles from './Button.module.scss';

interface IButton {
    children: React.ReactNode;
    onClick?: () => void;
    disabled?: boolean;
    className?: string;
}

export default function Button({ children, onClick, disabled, className }: IButton) {
    return (
        <button
            className={`${styles.button} ${className}`}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    )
}