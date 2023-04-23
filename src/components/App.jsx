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
    total: null,
    showModal: false,
    urlModal: '',
    loading: false,
    error: '',
    status: 'idle',
  };

  handleGetImages(searchQuery, page) {
    api
      .getImg(searchQuery, page)
      .then(({hits, totalHits})=> {
        this.setState({
          images: [...this.state.images, ...hits],
          total: totalHits / 12 > 500 ? 500 : totalHits / 12,
        });

        hits[0]
          ? this.setState({ status: 'resolved' })
          : this.setState({
              status: 'rejected',
              error: `No images for query ${searchQuery}`,
            });
      })
      .catch(error => {
        this.setState({ status: 'rejected', error: `${error.message}` });
      });
  }

  componentDidUpdate(prevProps, prevState) {
    const newQuery = this.state.searchQuery;
    const newPage = this.state.page;

    if (this.state.status === 'loading') {
      this.setState({ error: '', status: 'pending' });
      this.handleGetImages(newQuery, newPage);
    }

    if (this.state.status !== 'loading' && prevState.page !== newPage) {
      this.setState({ error: '' });
      this.handleGetImages(newQuery, newPage);
    }
  }

  
  openModal = (url) => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
      urlModal: url,
    }));
  };

  closeModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
      urlModal: "",
    }));
  };

  toggleOnLoading = () => {
    this.setState(({ loading }) => ({ loading: !loading }));
  };
  
  handleFormSubmit = (query) => {
    this.setState({
      searchQuery: query,
      images: [],
      page: 1,
      total: "null",
      status: 'loading',
    });
  };

  handleIncrement = () => {
    this.setState({ page: this.state.page + 1 });
  };


  render() {
    const { images, showModal, status, page, total, loading,
      urlModal} = this.state;
    const { nextQuery } = this.props;
    return (
      <div className={css.container}>
        <ToastContainer autoClose={2000} />
        <Searchbar onSubmit={this.handleFormSubmit} />

        {status === 'rejected' && <p>No images for query ${nextQuery} </p>}
        {status === 'resolved' && (
          <>
            <ImageGallery images={images}
              openModal={this.openModal}
              toggleOnLoading={this.toggleOnLoading}
            />
            {page < total && <Button handleIncrement={this.handleIncrement} />}
          </>)
        }
        {status === 'pending' && <Loader />}
             
        {showModal && (<Modal onClose={this.closeModal}>
            {loading && <Loader />}
            <img
              onLoad={this.toggleOnLoading}
              src={urlModal}
              alt=""
              className={css.modalImg}
            />
          </Modal>)}
      </div>
    );
  }
}
