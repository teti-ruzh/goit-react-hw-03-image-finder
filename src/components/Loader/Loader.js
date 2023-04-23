import { Circles } from 'react-loader-spinner';
import css from './Loader.module.css'

const Loader = () => {
return <Circles
height="100"
width="100"
color="#8F81F8"
ariaLabel="circles-loading"
wrapperClass={css.loading}
/>
}

export default Loader;