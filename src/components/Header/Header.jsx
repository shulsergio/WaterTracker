// import { useSelector } from 'react-redux';
import css from './Header.module.css';
// import UserAuth from '../UserAuth/UserAuth';
// import UserLogo from '../UserLogo/UserLogo';
import Logo from '../Logo/Logo';


const Header = () => {
    // const isLoggesIn = useSelector(selectisLoggedIn)
    
    return (
        <div className={css.headerContainer}>
            <header className={css.header}>
                <Logo />
                {/* {isLoggedIn ? <UserLogo /> : <UserAuth />} */}
            </header>
        </div>
    )
};
export default Header;