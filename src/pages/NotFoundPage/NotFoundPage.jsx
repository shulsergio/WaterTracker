import css from './NotFoundPage.module.css';
import Icon from '../../components/Icon/Icon';


const NotFoundPage = () => {
  return (
    <>
      <div className={css.container}>
        <div className={css.errCont}>
          <span className={css.errNum}>4</span>
          <Icon id="icon-Logo" width={50} height={50} className={css.icon} />
          <span className={css.errNum}>4</span>
        </div>
        <p className={css.text}>
          Sorry, the page you are looking for doesn't exist.
        </p>
      </div>
    </>
  );
};
export default NotFoundPage;
