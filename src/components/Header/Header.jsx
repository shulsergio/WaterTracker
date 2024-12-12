// import { useSelector } from 'react-redux';
import css from './Header.module.css';
import UserAuth from '../UserAuth/UserAuth';
import Logo from '../Logo/Logo';


const Header = () => {
    // const isLoggesIn = useSelector(selectisLoggedIn)
    
    return (
        <div className={css.headerContainer}>
            <header className={css.header}>
                <Logo />
                 <UserAuth/>
            </header>
        </div>
    )
};
export default Header;