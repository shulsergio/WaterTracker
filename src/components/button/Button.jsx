import clsx from "clsx";
import styles from "./Button.module.css";

const Button = ({
  types = "primary",
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
          [styles.primary]: types === "primary",
          [styles.secondary]: types === "secondary",
          [styles.warning]: types === "warning",
          [styles.text]: types === "text",
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
