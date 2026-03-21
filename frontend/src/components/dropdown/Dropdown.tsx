import styles from './Dropdown.module.scss';
import arrow from '../../assets/arrow.svg'
import { useState } from 'react';

export default function Dropdown() {
    const [isOpen, setOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState('NewGen AI 4.0');

    const toggleDropdown = () => {
        setOpen(!isOpen);
    }

    const handleOptionClick = (option: string) => {
        setSelectedOption(option);
        setOpen(false);
    }

    return (
        <div className={styles.dropdown}>
                <div className={styles.text} onClick={toggleDropdown}>
                    {selectedOption}
                </div>
                <img src={arrow} alt="Dropdown Arrow" className={styles.arrow} onClick={toggleDropdown} />
            {isOpen && (
                <div className={styles.menu}>
                    <div className={styles.menuItem} onClick={() => handleOptionClick('NewGen AI 4.0')}>NexGen AI 4.0</div>
                    <div className={styles.menuItem} onClick={() => handleOptionClick('NewGen AI 3.5')}>NexGen AI 3.5</div>
                </div>
            )}
        </div>
    )
}