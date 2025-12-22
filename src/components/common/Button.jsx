import "./Button.css";

const Button = ({
  children,
  onClick,
  variant = "primary",
  disabled = false,
  className = "",
  ...props
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`btn ${variant} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
