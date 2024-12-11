import './Icon.css';
import icons from '../../images/icons/icons.svg';

const Icon = ({ id, width, height, className = "" }) => {
    return (
        <svg
            className={`${className}`}
            width={width}
            height={height}
            aria-hidden="true"
        >
            <use href={`${icons}#icon-${id}`}></use>
        </svg >
    )
};
export default Icon;