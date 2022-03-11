import { useState, useEffect } from 'react';
import styles from '../styles/Nav.module.scss';

type Props = {
    className?: string;
};

export const Nav = (props: Props) => {
    const [show, setShow] = useState(false);
    useEffect(() => {
        const handleShow = () => {
            if (window.scrollY > 100) {
                setShow(true);
            } else {
                setShow(false);
            }
        };

        window.addEventListener('scroll', handleShow);
        // 副作用クリーンアップ
        return () => {
            window.removeEventListener('scroll', handleShow);
        };
    }, []);

    return (
        <div className={`${styles.Nav} ${show && styles['Nav-black']}`}>
            <a href='https://www.youtube.com/watch?v=m8gpzke_BTE' target='_blank' rel='noreferrer'>
                <img
                    className={styles['Nav-logo']}
                    src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1920px-Netflix_2015_logo.svg.png'
                    alt='Netflix Logo'
                />
            </a>
            <a href='https://www.netflix.com/title/80201866' target='_blank' rel='noreferrer'>
                <img
                    className={styles['Nav-avater']}
                    src='https://i.pinimg.com/originals/0d/dc/ca/0ddccae723d85a703b798a5e682c23c1.png'
                    alt='Avatar'
                />
            </a>
        </div>
    );
};
