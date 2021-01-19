const baseUrl = `https://pixabay.com/api/`;
const apiKey = `19649885-84cc8a7bfeabe0e9969e6732d`;

export default {
  query: '',
  page: 1,
  perPage: 12,

  getFetch() {
    // console.log(this.page);
    const url = `${baseUrl}?image_type=photo&orientation=horizontal&q=${this.query}&page=${this.page}&per_page=${this.perPage}&key=${apiKey}`;

    return fetch(url)
      .then(responce => responce.json())
      .then(({ hits }) => {
        this.incrementPage();
        return hits;
      })
      .catch(error => {
        loadMoreBtn.hide();
        return errorsNotifications('Oh, no!', 'Something terrible happened.');
      });
  },

  incrementPage() {
    this.page += 1;
  },

  resetPage() {
    this.page = 1;
  },

  get queryValue() {
    return this.query;
  },

  set queryValue(newQueryValue) {
    return (this.query = newQueryValue);
  },
};

// export default {
//   getFetch() {
//     const url = `https://pixabay.com/api/?image_type=photo&q=cat&page=1&per_page=12&key=19649885-84cc8a7bfeabe0e9969e6732d`;

//     return fetch(url)
//       .then(res => res.json)
//       .then(({ hits }) => {
//         console.log(hits);
//       });
//   },
// };
