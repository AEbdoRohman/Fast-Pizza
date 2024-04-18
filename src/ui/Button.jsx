import PropTypes from "prop-types";
import { Link } from "react-router-dom";
const Button = ({ children, disabled, to, type, onClick }) => {
  const base =
    "px-3 py-2 inline-block rounded-full bg-yellow-400 font-semibold uppercase text-stone-600 transition-all duration-300 hover:bg-yellow-300";

  const styles = {
    primary: base + ` text-lg`,
    small: base + " text-sm",
    round: base + " text-sm px-2.5 py-1 md:px-3.5 md:py-2",
    secondary:
      "inline-block text-sm rounded-full border-2 border-stone-300 font-semibold uppercase tracking-wide text-stone-400 transition-colors duration-300 hover:bg-stone-300 hover:text-stone-800 focus:bg-stone-300 focus:text-stone-800 focus:outline-none focus:ring focus:ring-stone-200 focus:ring-offset-2 disabled:cursor-not-allowed px-4 py-2.5 md:px-6 md:py-3.5",
  };
  if (to) {
    return (
      <Link to={to} disabled={disabled} className={styles[type]}>
        {children}
      </Link>
    );
  }
  if (onClick) {
    return (
      <button className={styles[type]} onClick={onClick}>
        {children}
      </button>
    );
  }

  return <button className={styles[type]}>{children}</button>;
};

Button.propTypes = {
  children: PropTypes.node,
  to: PropTypes.string,
  type: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
};

export default Button;
