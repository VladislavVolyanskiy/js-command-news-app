// треба зробити перевірку чи вибрана дата.

import NewsFetchApi from './js/newsApi';

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

// приносить дані популярних новин
function getPopularNews() {
  newsFetchApi
    .fetchPopularNews()
    .then(({ data }) => {
      //   загальна кількість знайдених новин
      const totalNews = data.num_results;
      data.results.forEach(
        //   Зверніть увагу дата публікації записана по різному
        ({ abstract, published_date, section, title, media, url }) => {
          // деструктурував необхідні данні для розмітки.
          const publishedDate = published_date;
          const sectionName = section;
          const articleTitle = title;
          const shortDescription = abstract;
          const urlOriginalArticle = url;

          //   перевіряемо чи є зображення, де помилка там є відео
          try {
            const imgUrl = media[0]['media-metadata'][2].url;
            //   якщо треба інший розмір картинки
            // console.log(media[0]['media-metadata']);
          } catch (error) {
            console.log(error);
          }
        }
      );
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
    console.log(data);
    try {
      data.results.forEach(
        //   Зверніть увагу дата публікації записана по різному
        ({ abstract, published_date, section, title, multimedia, url }) => {
          // деструктурував необхідні данні для розмітки.
          const publishedDate = published_date;
          const sectionName = section;
          const articleTitle = title;
          const shortDescription = abstract;
          const urlOriginalArticle = url;
          const imgUrl = multimedia[2].url;
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
    response.docs.forEach(
      //   Зверніть увагу дата публікації записана по різному
      ({ abstract, pub_date, section_name, headline, multimedia, web_url }) => {
        // деструктурував необхідні данні для розмітки.
        const publishedDate = pub_date;
        const sectionName = section_name;
        const articleTitle = headline.main;
        const shortDescription = abstract;
        const urlOriginalArticle = web_url;
        // Не можу знайти ссилку на зображення
        // console.log(multimedia);
      }
    );
  });
}
