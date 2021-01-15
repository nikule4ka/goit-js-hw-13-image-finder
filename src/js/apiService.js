const baseUrl = `https://pixabay.com/api/`;
const apiKey = `19649885-84cc8a7bfeabe0e9969e6732d`;

export default {
    query: '',
    page: 1,
    perPage: 12,
    totalPage: 0,

    getFetch() {
        const url = `${baseUrl}?image_type=photo&orientation=horizontal&q=${this.query}&page=${this.page}&per_page=${this.perPage}&key=${apiKey}`;
        return fetch(url)
            .then(responce => responce.json())
            .then((({ hits, totalHits }) => {
                this.totalPage = totalHits;
                if (hits.length === 0) {
                    return new Error('Error fetching data');
                }
                return { hits, page: this.page };
            })
  }

};