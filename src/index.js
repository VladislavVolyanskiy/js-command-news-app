// треба зробити перевірку чи вибрана дата.
import createmarkup from './js/news-card';
import NewsFetchApi from './js/newsApi';
import onSearchClick from './js/header';


const newsFetchApi = new NewsFetchApi();

// приносить список тем
function getSectionList() {
  newsFetchApi.fetchSectionList().then(({ data: { results } }) => {
    results.forEach(({ section, display_name }) => {
      // деструктурував необхідні данні для розмітки.
      const sectionName = section;
      const displayName = display_name;
    });
  });
}
getPopularNews()
// приносить дані популярних новин
function getPopularNews() {
  newsFetchApi
    .fetchPopularNews()
    .then(({ data }) => {
      //   загальна кількість знайдених новин
      const totalNews = data.num_results;
      let markupAll = "";
      data.results.forEach(
        //   Зверніть увагу дата публікації записана по різному
        ({ abstract, published_date, section, title, media, url }) => {
          // деструктурував необхідні данні для розмітки
          const publishedDate = publishedDateFormatter(published_date);
          const sectionName = section;
          const articleTitle = title;
          const shortDescription = abstract;
          const urlOriginalArticle = url;
          let imgUrl = '0';
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
              imgUrl
          })
          
        }
      );
      console.log("markupAll", markupAll);
      const body = document.querySelector("body");
    body.insertAdjacentHTML("beforeend", markupAll);
    })
    .catch(error => console.log(error));
}

// приносить дані новиин по категоріям

function onCategoryClick(evt) {
  // тут треба записати значення обраної категорії з події на яку кнопку клацнули
  newsFetchApi.searchSection = 'business';

  newsFetchApi.fetchBySection().then(({ data }) => {
    //   загальна кількість знайдених новин
    const totalNews = data.num_results;
    try {
      data.results.forEach(
        ({ abstract, published_date, section, title, multimedia, url }) => {
          // деструктурував необхідні данні для розмітки.
          const publishedDate = publishedDateFormatter(published_date);
          const sectionName = section;
          const articleTitle = title;
          const shortDescription = abstract;
          const urlOriginalArticle = url;
          let imgUrl = '';
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

// приносить дані за пошуковим запитом
function onSearchInputClick(evt) {
  // тут треба записати значення пошукового запиту
  newsFetchApi.searchQuery = 'GPT';

newsFetchApi.fetchBySearchQuery().then(({ data: { response } }) => {
    //   загальна кількість знайдених новин
    const totalNews = response.meta.hits;
    console.log(response);
    response.docs.forEach(
      //   Зверніть увагу дата публікації записана по різному
      ({ abstract, pub_date, section_name, headline, multimedia, web_url }) => {
        // деструктурував необхідні данні для розмітки.
        const publishedDate = publishedDateFormatter(pub_date);
        const sectionName = section_name;
        const articleTitle = headline.main;
        const shortDescription = abstract;
        const urlOriginalArticle = web_url;
        let imgUrl = '';
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

//============= перемикач теми початок ==========
import { ThemeSwitcher } from './js/themeSwitcher';

const themeSwitcherEl = document.querySelector('.switch_input');
const themeSwitcher = new ThemeSwitcher(themeSwitcherEl);

themeSwitcherEl.addEventListener('change', themeSwitcher.onThemeToggle);

themeSwitcher.renderTheme();
//============= перемикач теми кінець ============


