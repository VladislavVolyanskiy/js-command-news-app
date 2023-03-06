export default function createmarkup({
  publishedDate,
  sectionName,
  articleTitle,
  shortDescription,
  urlOriginalArticle,
  imgUrl,
  articleId,
}) {
  let textLength = shortDescription;
      if (shortDescription.length > 110) {
          const spaceIndex = shortDescription.indexOf(" ", 110);
          if (spaceIndex > 0) {
              textLength = shortDescription.slice(0, spaceIndex) + "...";
          }
      }
  let titleLength = articleTitle;
      if (articleTitle.length > 58) {
        const spaceIndex = articleTitle.indexOf(' ', 44);
        if (spaceIndex > 0) {
          titleLength = articleTitle.slice(0, spaceIndex) + '...';
        }
      }

  return `
      <article class="card" id="${articleId}">
        <div class="card__img-container">
          <img class="card__img" src="${imgUrl}" alt="${articleTitle}">
          <p class="card__section-name">
            ${sectionName}
          </p>
          <button class="card__btn" type="button">
            Add to favorite <span class="card__btn-heart">&#9825;</span>
          </button>
        </div>
        <h2 class="card__title">
          ${titleLength}
        </h2>
        <p class="card__text">${textLength}</p>
        <div class="card__bottom">
          <span class="card__date">
            ${publishedDate}
          </span>
          <a class="card__read-more-search"
            href="${urlOriginalArticle}" target="_blank"
          >
            Read more
          </a>
        </div>
      </article>
    `;
};
  
