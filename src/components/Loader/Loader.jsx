import { RotatingLines } from 'react-loader-spinner';
import css from './Loader.module.css';
export default function Loader() {
  return (
    <div className={css.loaderOverlay}>
      <RotatingLines
        visible={true}
        height='96'
        width='96'
        color='Blue'
        strokeWidth='5'
        animationDuration='0.75'
        ariaLabel='rotating-lines-loading'
        wrapperStyle={{}}
        wrapperClass=''
      />
    </div>
  );
}
