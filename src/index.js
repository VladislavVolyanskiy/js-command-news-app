// треба зробити перевірку чи вибрана дата.
import createmarkup from './js/news-card';
import NewsFetchApi from './js/newsApi';
import onSearchClick from './js/header';
import { ThemeSwitcher } from './js/themeSwitcher';

const body = document.querySelector('body');
const searchInput = document.querySelector('.search_form');
const newsFetchApi = new NewsFetchApi();

const STORAGE_FAVORITES_KEY = 'favorites';

let markupAll = '';

let articleId = '';
let publishedDate = '';
let sectionName = '';
let articleTitle = '';
let shortDescription = '';
let urlOriginalArticle = '';
let imgUrl = '';
let totalNews = '';

// приносить список тем
function getSectionList(e) {
  e.preventDefault();
  newsFetchApi.fetchSectionList().then(({ data: { results } }) => {
    console.log(results);
    results.forEach(({ section, display_name }) => {
      // деструктурував необхідні данні для розмітки.
      const sectionName = section;
      const displayName = display_name;
    });
  });
}

getPopularNews();

// приносить дані популярних новин
function getPopularNews() {
  newsFetchApi
    .fetchPopularNews()
    .then(({ data }) => {
      //   загальна кількість знайдених новин
      totalNews = data.num_results;
      const resultsArr = data.results;

      data.results.forEach(
        //   Зверніть увагу дата публікації записана по різному
        ({ abstract, published_date, section, title, media, url, id }) => {
          // деструктурував необхідні данні для розмітки
          articleId = id;
          publishedDate = publishedDateFormatter(published_date);
          sectionName = section;
          articleTitle = title;
          shortDescription = abstract;
          urlOriginalArticle = url;

          //   перевіряемо чи є зображення, де помилка там є відео
          try {
            imgUrl = media[0]['media-metadata'][2].url;

            //   якщо треба інший розмір картинки
            // console.log(media[0]['media-metadata']);
          } catch (error) {
            imgUrl = 'Тут ссылку на заглушку';
          }

          markupAll += createmarkup({
            publishedDate,
            sectionName,
            articleTitle,
            shortDescription,
            urlOriginalArticle,
            imgUrl,
            articleId,
          });
        }
      );
      body.insertAdjacentHTML('beforeend', markupAll);

      // Начало. Проверка на клик по Добавить в избранное
      body.addEventListener('click', onAddToFavoritesClick);

      function onAddToFavoritesClick(evt) {
        if (
          evt.target.nodeName === 'SPAN' ||
          evt.target.className === 'card__favorite'
        ) {
          const clickedArticleId = evt.target.closest('.card__search')?.id;
          setFavoritesInLocalStor({
            resultsArr,
            clickedArticleId,
          });
        }
      }
      // Конец. Проверка на клик по Добавить в избранное
    })
    .catch(error => console.log(error));
}

// приносить дані новиин по категоріям

function onCategoryClick(evt) {
  evt.preventDefault();
  // тут треба записати значення обраної категорії з події на яку кнопку клацнули
  newsFetchApi.searchSection = 'business';

  newsFetchApi.fetchBySection().then(({ data }) => {
    //   загальна кількість знайдених новин
    totalNews = data.num_results;

    try {
      data.results.forEach(
        ({ abstract, published_date, section, title, multimedia, url }) => {
          // деструктурував необхідні данні для розмітки.
          publishedDate = publishedDateFormatter(published_date);
          sectionName = section;
          articleTitle = title;
          shortDescription = abstract;
          urlOriginalArticle = url;
          imgUrl = '';
          try {
            imgUrl = multimedia[2].url;
            //   якщо треба інший розмір картинки
            // console.log(media[0]['media-metadata']);
          } catch (error) {
            imgUrl = 'Тут ссылку на заглушку';
          }
          //  {
          //     publishedDate,
          //     sectionName,
          //     articleTitle,
          //     shortDescription,
          //     urlOriginalArticle,
          //     imgUrl
          //   };

          //   якщо треба інший розмір картинки
          // console.log(multimedia);
        }
      );
      // помилка - нема новин в данній категорії
    } catch (error) {
      console.log('No news in this category');
    }
  });
}

searchInput.addEventListener('submit', onSearchInputClick);

// приносить дані за пошуковим запитом
function onSearchInputClick(evt) {
  evt.preventDefault();
  // тут треба записати значення пошукового запиту
  newsFetchApi.searchQuery = evt.target.elements.searchQuery.value;
  newsFetchApi.fetchBySearchQuery().then(({ data: { response } }) => {
    //   загальна кількість знайдених новин
    totalNews = response.meta.hits;
    console.log(response);
    response.docs.forEach(
      //   Зверніть увагу дата публікації записана по різному
      ({ abstract, pub_date, section_name, headline, multimedia, web_url }) => {
        // деструктурував необхідні данні для розмітки.
        publishedDate = publishedDateFormatter(pub_date);
        sectionName = section_name;
        articleTitle = headline.main;
        shortDescription = abstract;
        urlOriginalArticle = web_url;
        imgUrl = '';
        //   перевіряемо чи є зображення, де помилка там є відео
        try {
          imgUrl = imgUrl = 'https://www.nytimes.com/' + multimedia[0].url;
        } catch (error) {
          imgUrl = 'Тут ссылку на заглушку';
        }
        //  {
        //     publishedDate,
        //     sectionName,
        //     articleTitle,
        //     shortDescription,
        //     urlOriginalArticle,
        //     imgUrl
        //   };
      }
    );
  });
}

function publishedDateFormatter(date) {
  return new Date(date).toDateString();
}

//===добавляет избранное в локальное хранилище ==========
function setFavoritesInLocalStor({ resultsArr, clickedArticleId }) {
  resultsArr.forEach(article => {
    if (article.id == clickedArticleId) {
      let savedData = localStorage.getItem(STORAGE_FAVORITES_KEY);
      // проверка или есть уже обьект
      savedData = savedData ? JSON.parse(savedData) : {};

      if (savedData[clickedArticleId]) {
        delete savedData[`${clickedArticleId}`];

        localStorage.setItem(STORAGE_FAVORITES_KEY, JSON.stringify(savedData));
        console.log(savedData);
        return;
      } else {
        savedData[clickedArticleId] = article;

        localStorage.setItem(STORAGE_FAVORITES_KEY, JSON.stringify(savedData));
        console.log(savedData);
      }
    }

  });
}
//== добавляет избранное в локальное хранилище. конец ==========

//============= перемикач теми початок ==========

const themeSwitcherEl = document.querySelector('.switch_input');
const themeSwitcher = new ThemeSwitcher(themeSwitcherEl);

themeSwitcherEl.addEventListener('change', themeSwitcher.onThemeToggle);

themeSwitcher.renderTheme();
//============= перемикач теми кінець ============
