import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from './Searchbar';
import api from '../services/image-api';
import Loader from './Loader';
import ImageGallery from './ImageGallery';
import Button from './Button';
import Modal from './Modal';
import css from './App.module.css';

export class App extends Component {
  state = {
    searchQuery: '',
    images: [],
    page: 1,
    showModal: false,
    urlModal: '',
    isLoading: false,
    error: '',
    showLoadMore: false,
    isEmpty: false,
  };

  handleGetImages(searchQuery, page) {
    this.setState({ isLoading: true });
    api
      .getImg(searchQuery, page)
      .then(({ hits, totalHits }) => {
        if (!hits.length) {
          this.setState({
            isEmpty: true,
          });
          return;
        }
        this.setState({
          images: [...this.state.images, ...hits],
          showLoadMore: this.state.page < Math.ceil(totalHits / 12),
        });
      })
      .catch(error => {
        this.setState({ error: `${error}` });
      })
      .finally(() => this.setState({ isLoading: false }));
  }

  componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevState.searchQuery;
    const newQuery = this.state.searchQuery;
    const prevPage = prevState.page;
    const newPage = this.state.page;

    if (prevQuery !== newQuery || prevPage !== newPage) {
      this.handleGetImages(newQuery, newPage);
    }
  }

  openModal = url => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
      urlModal: url,
    }));
  };

  closeModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
      urlModal: '',
    }));
  };

  toggleOnLoading = () => {
    this.setState(({ isLoading }) => ({ isLoading: !isLoading }));
  };

  handleFormSubmit = query => {
    this.setState({
      searchQuery: query,
      images: [],
      page: 1,
      showLoadMore: false,
      status: 'loading',
      isEmpty: false,
      error: '',
    });
  };

  onLoadMore = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
  };

  render() {
    const {
      searchQuery,
      images,
      showModal,
      error,
      isLoading,
      urlModal,
      showLoadMore,
      isEmpty,
    } = this.state;

    return (
      <div className={css.container}>
        <ToastContainer autoClose={2000} />
        <Searchbar onSubmit={this.handleFormSubmit} />

        {isEmpty && (
          <h2 className={css.errorMsg}>
            Sorry, there is no images for {searchQuery}
          </h2>
        )}
        {error && <h2 className={css.errorMsg}>{error}</h2>}
        <ImageGallery
          images={images}
          openModal={this.openModal}
          toggleOnLoading={this.toggleOnLoading}
        />
        {showLoadMore && <Button onLoadMore={this.onLoadMore} />}
        {isLoading && <Loader />}

        {showModal && (
          <Modal onClose={this.closeModal}>
            {isLoading && <Loader />}
            <img
              onLoad={this.toggleOnLoading}
              src={urlModal}
              alt=""
              className={css.modalImg}
            />
          </Modal>
        )}
      </div>
    );
  }
}
