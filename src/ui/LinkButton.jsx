import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
const LinkButton = ({ children, to }) => {
  const navegate = useNavigate();
  const className = "text-blue-500 hover:underline hover:text-blue-600";

  if (to === -1) {
    return (
      <button className={className} onClick={() => navegate(-1)}>
        {children}
      </button>
    );
  }
  return (
    <Link to={to} className={className}>
      {children}
    </Link>
  );
};

LinkButton.propTypes = {
  children: PropTypes.node,
  to: PropTypes.string,
};
export default LinkButton;
