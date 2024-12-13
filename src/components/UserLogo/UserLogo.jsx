import { useRef, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import css from './UserLogo.module.css';
// import UserLogoModal from '../UserLogoModal/UserLogoModal';
import Icon from '../Icon/Icon';
import { selectUser } from '../../redux/auth/selectors';


const UserLogo = () => {
    const user = useSelector(selectUser);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const modalRef = useRef(null);

    const handleClickOutside = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            setIsModalOpen(false)
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside)
        };
    }, [setIsModalOpen]);

    const getAvatar = () => {
        if (user.photo) {
            return (
                <img src={user.photo} alt={user.userName} className={css.avatar} />
            );
        }
        if (user.userName) {
            return (
                <span className={css.emptyAvatar}>
                    {user.userName[0].toUpperCase()}
                </span>
            )
        }
        if (user.email) {
            return (
                <span className={css.emptyAvatar}>
                    {user.email[0].toUpperCase()}
                </span>
            );
        }
    };
    return (
        <div ref={modalRef} className={css.userLogoContainer}>
            <button
                // onClick={toggleModal}
                className={css.userLogoBtn}>
                <span className={css.userName}>{user.userName || user.email}</span>
                {getAvatar()}
                <Icon
                    id="icon-down"
                    width={16}
                    height={16}
                    className={`${isModalOpen ? css.iconRotate : ""} icon-blue`}
                />
            </button>
            {/* {isModalOpen && <UserLogoModal toggleModal={toggleModal} />} */}
        </div>
    )
};
export default UserLogo;