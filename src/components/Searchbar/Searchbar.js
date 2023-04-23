import { Component } from 'react';
import { toast } from 'react-toastify';
import PropTypes from "prop-types";
import css from './Searchbar.module.css';

class Searchbar extends Component {
state = {
    searchQuery: '',
}

handleQueryChange = event => {
    this.setState({searchQuery: event.currentTarget.value.toLowerCase()})
}

handleSubmit = event => {
    event.preventDefault();

    if(this.state.searchQuery.trim() === '') {
        toast.warn("Please enter search query");
        return;
    }

    this.props.onSubmit(this.state.searchQuery)
    this.setState({searchQuery: ''})
}

render() {
    return (
        <header className={css.searchbar}>
         <form onSubmit={this.handleSubmit} className={css.form}>
         
           <input
             className={css.input}
             type="text"
             autoComplete="off"
             autoFocus
             placeholder="Search images and photos"
             onChange={this.handleQueryChange}
             value={this.state.searchQuery}
           />
             <button type="submit" className={css.button}>
             <span className={css['button-label']}>Search</span>
           </button>
         </form>
       </header>
           )
}

}

export default Searchbar;

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};