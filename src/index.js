// треба зробити перевірку чи вибрана дата.
import createmarkup from './js/news-card';
import NewsFetchApi from './js/newsApi';
import onSearchClick from './js/header';
import { ThemeSwitcher } from './js/themeSwitcher';
import createWidget from './js/weatherApi';

const newsContainerRef = document.querySelector('.news_container');
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
let resultsArr = '';
let numberOfCard = 0;

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
      resultsArr = data.results;
      // проверка если нету новостей.
      if (resultsArr.length === 0) {
        document.querySelector('.without-news_container').style.display =
          'block';
      } else {
        resultsArr.forEach(
          //   Зверніть увагу дата публікації записана по різному
          ({ abstract, published_date, section, title, media, url, id }) => {
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

            // проверяем ширину экрана для расположения погоды
            
            if (numberOfCard === 0) {
              markupAll += '<div class="weatherWidget"></div>';
            }
            // деструктурував необхідні данні для розмітки

            markupAll += createmarkup({
              publishedDate,
              sectionName,
              articleTitle,
              shortDescription,
              urlOriginalArticle,
              imgUrl,
              articleId,
            });
            numberOfCard += 1;
          }
        );
        newsContainerRef.innerHTML = markupAll;
        markupAll = '';

        // Блок добавления погоды
        const weatherWidgetContainer = document.querySelector('.weatherWidget');

        createWidget(weatherWidgetContainer);
        // Конец. Блок добавления погоды

        // Слушатель на клик по Добавить в избранное
        body.addEventListener('click', onAddToFavoritesClick);
        // после отрисовки всех новостей, этот счётчик обнуляем так как если после вызывать другие новости счётчик сохраняет значение, так как не перезапускается его инициализация изначальная.
        numberOfCard = 0;
      }
    })
    .catch(error => console.log(error));
}

// приносить дані новин по категоріям
function onCategoryClick(evt) {
  // evt.preventDefault();
  // тут треба записати значення обраної категорії з події на яку кнопку клацнули
  newsFetchApi.searchSection = 'business';

  newsFetchApi
    .fetchBySection()
    .then(({ data }) => {
      //   загальна кількість знайдених новин
      totalNews = data.num_results;
      resultsArr = data.results;

      // проверка если нету новостей.
      if (resultsArr.length === 0) {
        document.querySelector('.without-news_container').style.display =
          'block';
      } else {
        resultsArr.forEach(
          ({
            abstract,
            published_date,
            section,
            title,
            multimedia,
            url,
            slug_name,
          }) => {
            // деструктурував необхідні данні для розмітки.
            articleId = slug_name;
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
            if (numberOfCard === 0) {
              markupAll += '<div class="weatherWidget"></div>';
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
            numberOfCard += 1;

            //   якщо треба інший розмір картинки
            // console.log(multimedia);
          }
        );
        newsContainerRef.innerHTML = markupAll;
        markupAll = '';

        // Блок добавления погоды
        const weatherWidgetContainer = document.querySelector('.weatherWidget');
        console.log({ weatherWidgetContainer });
        createWidget(weatherWidgetContainer);
        // Конец. Блок добавления погоды

        // Слушатель на клик по Добавить в избранное
        body.addEventListener('click', onAddToFavoritesClick);
        // после отрисовки всех новостей, этот счётчик обнуляем так как если после вызывать другие новости счётчик сохраняет значение, так как не перезапускается его инициализация изначальная.
        numberOfCard = 0;
      }
    })
    .catch(error => console.log(error));
}

searchInput.addEventListener('submit', onSearchInputClick);

// приносить дані за пошуковим запитом
function onSearchInputClick(evt) {
  evt.preventDefault();
  //  значення пошукового запиту
  newsFetchApi.searchQuery = evt.target.elements.searchQuery.value;

  newsFetchApi
    .fetchBySearchQuery()
    .then(({ data: { response } }) => {
      //   загальна кількість знайдених новин
      totalNews = response.meta.hits;
      resultsArr = response.docs;

      // проверка если нету новостей.
      if (resultsArr.length === 0) {
        document.querySelector('.without-news_container').style.display =
          'block';
      } else {
        resultsArr.forEach(
          ({
            abstract,
            pub_date,
            section_name,
            title,
            multimedia,
            web_url,
            _id,
          }) => {
            // деструктурував необхідні данні для розмітки.
            articleId = _id;
            publishedDate = publishedDateFormatter(pub_date);
            sectionName = section_name;
            articleTitle = title;
            shortDescription = abstract;
            urlOriginalArticle = web_url;
            imgUrl = '';
            try {
              imgUrl = imgUrl = 'https://www.nytimes.com/' + multimedia[0].url;
              //   якщо треба інший розмір картинки
              // console.log(media[0]['media-metadata']);
            } catch (error) {
              imgUrl = 'Тут ссылку на заглушку';
            }
            if (numberOfCard === 0) {
              markupAll += '<div class="weatherWidget"></div>';
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
            numberOfCard += 1;
          }
        );
        newsContainerRef.innerHTML = markupAll;
        markupAll = '';

        // Блок добавления погоды
        const weatherWidgetContainer = document.querySelector('.weatherWidget');

        createWidget(weatherWidgetContainer);
        // Конец. Блок добавления погоды

        // Слушатель на клик по Добавить в избранное
        body.addEventListener('click', onAddToFavoritesClick);
        // после отрисовки всех новостей, этот счётчик обнуляем так как если после вызывать другие новости счётчик сохраняет значение, так как не перезапускается его инициализация изначальная.
        numberOfCard = 0;
      }
    })
    .catch(error => console.log(error));
}

function publishedDateFormatter(date) {
  return new Date(date).toDateString();
}

//===добавляет избранное в локальное хранилище ==========
function setFavoritesInLocalStor({ resultsArr, clickedArticleId }) {
  resultsArr.forEach(article => {
    if (
      article.id == clickedArticleId ||
      article.slug_name == clickedArticleId ||
      article._id == clickedArticleId
    ) {
      let savedData = localStorage.getItem(STORAGE_FAVORITES_KEY);
      // проверка или есть уже обьект
      savedData = savedData ? JSON.parse(savedData) : {};

      if (savedData[clickedArticleId]) {
        delete savedData[`${clickedArticleId}`];

        localStorage.setItem(STORAGE_FAVORITES_KEY, JSON.stringify(savedData));
        // console.log(savedData);
        return;
      } else {
        savedData[clickedArticleId] = article;

        localStorage.setItem(STORAGE_FAVORITES_KEY, JSON.stringify(savedData));
        // console.log(savedData);
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

// Начало. Проверка на клик по Добавить в избранное
function onAddToFavoritesClick(evt) {
  if (
    evt.target.nodeName === 'SPAN' ||
    evt.target.className === 'card__favorite'
  ) {
    const clickedArticleId =
      evt.target.closest('.card__search')?.id ||
      evt.target.closest('.card__search')?.slug_name ||
      evt.target.closest('.card__search')?._id;
    setFavoritesInLocalStor({
      resultsArr,
      clickedArticleId,
    });
  }
}

// Конец. Проверка на клик по Добавить в избранное
