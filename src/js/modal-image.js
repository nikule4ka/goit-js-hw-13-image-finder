import 'basiclightbox/dist/basicLightbox.min.css';
import * as basicLightbox from 'basiclightbox';

function clickModalImage(e) {
  if (e.target.tagName === 'IMG') {
    const modalImg = e.target.dataset.fullsize_img;
    const instance = basicLightbox.create(`<img src="${modalImg}" />`);
    instance.show();
  }
}

export default clickModalImage;
