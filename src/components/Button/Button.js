import PropTypes from "prop-types";
import css from './Button.module.css';

const Button = ({ handleIncrement }) => {
return (
    <button type="button" className={css['load-more']} onClick={handleIncrement}>
    <span className="label">Load more</span>
  </button>
)
}
export default Button;

Button.propTypes = {
  handleIncrement: PropTypes.func.isRequired,
};