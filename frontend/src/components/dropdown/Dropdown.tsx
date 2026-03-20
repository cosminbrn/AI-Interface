import styles from './Dropdown.module.scss';
import arrow from '../../assets/arrow.svg'
import { useState } from 'react';

export default function Dropdown() {
    const [isOpen, setOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState('GPT-4o');

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
                    <div className={styles.menuItem} onClick={() => handleOptionClick('GPT-4o')}>GPT-4o</div>
                    <div className={styles.menuItem} onClick={() => handleOptionClick('GPT-3.5')}>GPT-3.5</div>
                </div>
            )}
        </div>
    )
}