import PropTypes from "prop-types";
import css from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({
  webformatURL,
  largeImageURL,
  tags,
  openModal,
  toggleOnLoading,
}) => {
  return (
    <li className={css['gallery-item']}>
      <img
        className={css['gallery-item-img']}
        src={webformatURL}
        data-large={largeImageURL}
        alt={tags}
        onClick={event => {
          openModal(event.target.dataset.large);
          toggleOnLoading();
        }}
      />
    </li>
  );
};

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  toggleOnLoading: PropTypes.func.isRequired,
  openModal: PropTypes.func.isRequired,
};