import clsx from 'clsx';
import styles from './Button.module.css';

const Button = ({
  type = 'primary',
  children,
  onClick,
  className,
  icon,
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
          [styles.text]: type === 'text',
        },
        className
      )}
      onClick={onClick}
      {...props}
    >
      {icon && <span className={styles.svgIcon}>{icon}</span>}
      {children}
    </button>
  );
};

export default Button;
