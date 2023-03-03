export default function createmarkup({
  publishedDate,
  sectionName,
  articleTitle,
  shortDescription,
  urlOriginalArticle,
  imgUrl,
}) {
  // const cardItems = data.map(({ publishedDate, sectionName, articleTitle, urlOriginalArticle, imgUrl }) => {
  let cardItems = '';
  return (cardItems = `
        <div class="card__search">
            <div>
            <img class="card__image" src="${imgUrl}" alt="${articleTitle}" />
            <p class="card__job"><span>card job</span></p>
            <button class="card__favorite">
                <span>Add to favorite</span>
            </button>
            </div>
            <div class="card__header">
            <h2>
                <span>${sectionName}</span>
            </h2>
            </div>
            <div>
            <p class="card__text">
                <span>${articleTitle}</span>
            </p>
            </div>
            
            <div>
            <p class="card__data">
                <span>${publishedDate}</span>
            </p>
            <a href="${urlOriginalArticle}" class="card__more" rel="stylesheet">
                <span>Read more</span>
            </a>
            </div>
        </div>
    `);
}