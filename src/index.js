import './styles.css';
import errorsNotifications from './js/notifications';
import refs from './js/refs';
import apiService from './js/apiService';
import imagesTml from './tepmlates/image.hbs';
import LoadMoreBtn from './js/load-more-btn.js';
import clickModalImage from './js/modal-image.js';

const { gallery, form } = refs;

const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});
// console.log(loadMoreBtn);
// apiService.getFetch();

form.addEventListener('submit', imageSearch);
loadMoreBtn.refs.button.addEventListener('click', fetchArticles);
gallery.addEventListener('click', clickModalImage);

function allResultSearch() {
  loadMoreBtn.disable();
  apiService.getFetch().then(hits => {
    markupGallery(hits);
    if (hits.length < 12) {
      loadMoreBtn.hide();
    } else {
      loadMoreBtn.enable();
    }
  });
}

function markupGallery(hits) {
  gallery.insertAdjacentHTML('beforeend', imagesTml(hits));
  window.scrollTo({
    top: document.documentElement.scrollHeight,
    behavior: 'smooth',
  });
}

function imageSearch(e) {
  e.preventDefault();

  clearArticleContainer();
  apiService.queryValue = form.elements.query.value;
  if (apiService.queryValue === '') {
    loadMoreBtn.hide();
    return errorsNotifications('Nothing to found', 'Please enter a some word');
  }

  apiService.resetPage();
  loadMoreBtn.show();
  fetchArticles();
  form.reset();
}

function fetchArticles() {
  loadMoreBtn.disable();
  allResultSearch();
}

function clearArticleContainer() {
  gallery.innerHTML = '';
}
