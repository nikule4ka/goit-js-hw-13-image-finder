import './styles.css';
import refs from './js/refs';
import apiService from './js/apiService';
import images from './tepmlates/image.hbs';

const { gallery, form } = refs;

form.addEventListener('submit', imageSearch);

function imageSearch(e) {
  e.preventDefault();

  apiService.queryValue = form.elements.query.value;
}
