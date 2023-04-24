import PropTypes from 'prop-types';
import css from './Button.module.css';

const Button = ({ onLoadMore }) => {
  return (
    <button type="button" className={css['load-more']} onClick={onLoadMore}>
      <span className="label">Load more</span>
    </button>
  );
};
export default Button;

Button.propTypes = {
  onLoadMore: PropTypes.func.isRequired,
};
