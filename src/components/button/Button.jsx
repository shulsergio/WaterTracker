import clsx from 'clsx';
import styles from './Button.module.css';

const Button = ({
  type = 'primary',
  children,
  onClick,
  className,
  ...props
}) => {
  return (
    <button
      className={clsx(
        styles.button,
        {
          [styles.primary]: type === 'primary',
          [styles.secondary]: type === 'secondary',
          [styles.warning]: type === 'warning',
        },
        className
      )}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
