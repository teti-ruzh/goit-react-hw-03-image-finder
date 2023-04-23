import { Component } from 'react';
import { createPortal } from 'react-dom';
import {MdOutlineClose} from 'react-icons/md';
import css from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');
class Modal extends Component {

  componentDidMount() {
    window.addEventListener("keydown", this.onKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.onKeyDown);
  }

  onKeyDown = (event) => {
    if (event.code === "Escape") {
      this.props.onClose();
    }
  };

  onBackdropClick = (event) => {
    if (event.currentTarget === event.target) {
      this.props.onClose();
    }
  };

  render() {
    return createPortal(
      <div className={css.overlay} onClick={this.onBackdropClick}>
        <div className={css.modal}>
        <button
            type="button"
            className={css.button}
            onClick={this.props.onClose}
          >
            <MdOutlineClose fill="#140539"/>
          </button>
          {this.props.children}
        </div>
      </div>,
      modalRoot
    );
  }
}

export default Modal;
