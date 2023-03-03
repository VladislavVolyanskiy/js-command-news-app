import axios from 'axios';

const URL = 'https://api.nytimes.com/svc/';
const KEY = 'u4NcxmWo2uFBK0OuatwBNClB29lN33d8';

export default class NewsFetchApi {
  constructor() {
    this.searchQuery = '';
    this.searchSection = '';
    // період популярних новин можна вибрати 1, 7 або 30 днів
    this.popularPeriod = 30;
    //   для пагінації за пошуковим словом
    this.page = 0;
    //   для пагінації пошуку за категоріями,  0,20,40,...,500
    this.offset = 0;
  }

  fetchSectionList() {
    try {
      return axios.get(
        `${URL}news/v3/content/section-list.json?api-key=${KEY}`
      );
    } catch (error) {
      console.log(error);
    }
  }

  fetchPopularNews() {
    try {
      return axios.get(
        `${URL}mostpopular/v2/viewed/${this.popularPeriod}.json?api-key=${KEY}`
      );
    } catch (error) {
      console.log(error);
    }
  }

  fetchBySection() {
    try {
      return axios.get(
        `${URL}news/v3/content/inyt/${this.searchSection}.json?offset=${this.offset}&api-key=${KEY}`
      );
    } catch (error) {
      console.log(error);
    }
  }

  fetchBySearchQuery() {
    try {
      return axios.get(
        `${URL}/search/v2/articlesearch.json?q=${this.searchQuery}&page=${this.page}&api-key=${KEY}`
      );
    } catch (error) {
      console.log(error);
    }
  }
}
