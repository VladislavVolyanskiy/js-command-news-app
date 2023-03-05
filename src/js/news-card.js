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

  return `
      <article class="card" id="${articleId}">
        <div class="card__img-container">
          <img class="card__img" src="${imgUrl}" alt="${articleTitle}">
          <p class="card__section-name">
            ${sectionName}
          </p>
          <button class="card__btn" type="button">
            Add to favorite
          </button>
        </div>
        <h2 class="card__title">
          ${articleTitle}
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
  

// export default function createmarkup({
//   publishedDate,
//   sectionName,
//   articleTitle,
//   shortDescription,
//   urlOriginalArticle,
//   imgUrl,
//   articleId
// }) {
//   // const cardItems = data.map(({ publishedDate, sectionName, articleTitle, urlOriginalArticle, imgUrl }) => {
//     let textLength = shortDescription;
//     if (shortDescription.length > 110) {
//         const spaceIndex = shortDescription.indexOf(" ", 110);
//         if (spaceIndex > 0) {
//             textLength = shortDescription.slice(0, spaceIndex) + "...";
//         }
//     }
//     console.log("publishedDate", publishedDate);
//   return (`
//         <div class="card__search">
//             <div>
//             <img class="card__image" src="${imgUrl}" alt="${articleTitle}" />
//             <p class="card__job"><span>${sectionName} searchig</span></p>
//             <button class="card__favorite" data-id=${articleId}>
//                 <span>Add to favorite</span>
//             </button>
//             </div>
//             <div class="card__header">
//             <h2>
//                 <span>${articleTitle}</span>
//             </h2>
//             </div>
//             <div>
//             <p class="card__text">
//                 <span>${textLength}</span>
//             </p>
//             </div>
            
//             <div>
//             <p class="card__data">
//                 <span>${publishedDate}</span>
//             </p>
//             <a href="${urlOriginalArticle}" class="card__more" rel="stylesheet" target="_blank">
//                 <span>Read more</span>
//             </a>
//             </div>
//         </div>
//     `);
// }

