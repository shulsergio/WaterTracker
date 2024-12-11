import { useNavigate } from 'react-router-dom';

import Icon from '../Icon/Icon'
import css from './UserAuth.module.css';


const UserAuth = () => {
    const navigate = useNavigate();

    const handleSignInClick = () => {
        navigate('/signin');
    };

    return (
        <nav className={css.authNav}>
            <button
                onClick={handleSignInClick}
                className={css.authBtn}
                type='button'
                aria-label='open-modal'
            >
                Sign In
                <Icon id="icon-outline" width={28} height={28} className={css.icon}/>
            </button>
        </nav>

    )
}
export default UserAuth;