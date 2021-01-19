import './styles.css';
import errorsNotifications from './js/notifications';
import refs from './js/refs';
import apiService from './js/apiService';
import images from './tepmlates/image.hbs';
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
  apiService
    .getFetch()
    .then(({ hits }) => images(hits))
    .then(markup => {
      markupGallery(markup, gallery);
      if (apiService.page > 2) {
        window.scrollBy(0, -window.innerHeight);
      }
      loadMoreBtn.enable();
    });
}

function markupGallery(markup, place) {
  place.insertAdjacentHTML('beforeend', markup);
}

function imageSearch(e) {
  e.preventDefault();

  apiService.queryValue = form.elements.query.value;
  if (apiService.queryValue === '') {
    loadMoreBtn.hide();
    return errorsNotifications('Nothing to found', 'Please enter a some word');
  }

  loadMoreBtn.show();
  fetchArticles();
  apiService.resetPage();
  clearArticleContainer();
  form.reset();
}

function fetchArticles() {
  loadMoreBtn.disable();
  allResultSearch();
}

function clearArticleContainer() {
  gallery.innerHTML = '';
}
