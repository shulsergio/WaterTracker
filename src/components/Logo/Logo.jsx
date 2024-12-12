import { useNavigate } from 'react-router-dom';
import css from './Logo.module.css';

const Logo = () => {
    const navigate = useNavigate();

    const handleLogoClick = () => {
        navigate('/');
    }
    return (
      <div
        className={css.logo}
        onClick={handleLogoClick}
        aria-label="Go to Home Page"
      ></div>
    );
};

export default Logo;