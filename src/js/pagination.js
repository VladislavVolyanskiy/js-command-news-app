//Добавить в следующее поле отсыл к карточке новостей
const listElement = document.querySelector('.news_container');
const paginationElement = document.getElementById('pagination');
const arrowLeft = document.querySelector('.arrow_left');
const arrowRight = document.querySelector('.arrow_right');
const newsFetchApi = new NewsFetchApi();

let currentPage = 1;
let pageCount;
const pagesOnWindow = 3;
let rows = 8;

function resetCurrentPage() {
  currentPage = 1;
}

export function fetchDataOfPopularNews() {
  newsFetchApi
    .fetchPopularArticlesPages()
    .then(results => {
      renderPagination(results.total_pages, results.results, displayList);
    })
    }

export function fetchDataOfSearchNews(searchQuery) {
 
  newsFetchApi.query = searchQuery;

  newsFetchApi.fetchSearchArticlesPages().then(results => {
    renderPagination(
      results.total_pages,
      results.results,
      displaySearchListByPage,
      searchQuery
    );
    if (results.total_pages === 0) {
      refs.searchResField.textContent = '';
      cardFetch.fetchDataOfPopularNews();
      return;
    }
  });
}


// главная функция для рендера pagination. Callback - функция для работы с fetch (зависит от раздела, где рисуем pagination)
export function renderPagination(totalPages, listItems, callback, searchQuery) {
  paginationElement.innerHTML = '';
  resetCurrentPage();
  arrowLeft.removeEventListener('click', onArrowLeftClick);
  arrowRight.removeEventListener('click', onArrowRightClick);
  // const totalNews = 20;
  // if (innerWidth < 768) {
  //   const newsPerPage = totalNews / 4;
  // } else if (innerWidth < 1280) {
  //   const newsPerPage = totalNews / 7;
  // } else {
  //   const newsPerPage = totalNews / 8;
  // }

  // const pages = Math.ceil(totalNews / newsPerPage);

  // return newsPerPage;

  function setupPagination(items, wrapper) {
    wrapper.innerHTML = '';

    // добавляет троеточие в pagination в зависимости от текущей страницы и общего к-ва страниц
    const threeDotsEl = addThreeDotsBlock();
    wrapper.insertBefore(threeDotsEl, wrapper[wrapper.length - 2]);
    wrapper.insertBefore(threeDotsEl, wrapper[1]);

    pageCount = totalPages;
    let maxLeftPage = currentPage - Math.floor(pagesOnWindow / 2);
    let maxRightPage = currentPage + Math.floor(pagesOnWindow / 2);

    if (maxLeftPage < 1) {
      maxLeftPage = 1;
      maxRightPage = pagesOnWindow;
    }

    if (maxRightPage > totalPages) {
      maxLeftPage = totalPages - (pagesOnWindow - 1);

      if (maxLeftPage < 1) {
        maxLeftPage = 1;
      }
      maxRightPage = totalPages;
    }

    for (let i = 1; i <= totalPages; i++) {
      if (maxLeftPage !== 1 && i == 1) {
        let btn = paginationButton(i, items);
        wrapper.appendChild(btn);
      }

      if (maxRightPage !== totalPages && i == totalPages) {
        let btn = paginationButton(i, items);
        wrapper.appendChild(btn);
      }

      if (i >= maxLeftPage && i <= maxRightPage) {
        let btn = paginationButton(i, items);
        wrapper.appendChild(btn);
      }
    }
  }

  // создает троеточия для pagination
  function addThreeDotsBlock() {
    const threeDots = document.createElement('div');
    threeDots.classList.add('threeDots');
    threeDots.innerText = '...';
    return threeDots;
  }

  function paginationButton(page, items) {
    let button = document.createElement('button');
    button.innerText = page;

    if (currentPage == page) button.classList.add('active');

    button.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      currentPage = page;
      callback(listElement, currentPage, searchQuery);

      let current_btn = document.querySelector('.pagenumbers button.active');
      current_btn.classList.remove('active');

      button.classList.add('active');
      setupPagination(listItems, paginationElement, rows);
      hideExtremeButtons(totalPages);
    });

    return button;
  }

  // ф-кция для отслеживания кликов по стрелке влево
  function onArrowLeftClick() {
    if (currentPage > 1) {
      placeholder.spinner.show();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      currentPage--;
      setupPagination(listItems, paginationElement, rows);
      callback(listElement, currentPage, searchQuery);
    }

    disableArrowBtn(totalPages);
    hideExtremeButtons(totalPages);
  }

  // ф-кция для отслеживания кликов по стрелке вправо
  function onArrowRightClick() {
    if (currentPage < totalPages) {
      placeholder.spinner.show();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      currentPage++;
      setupPagination(listItems, paginationElement, rows);
      callback(listElement, currentPage, searchQuery);
    }
    disableArrowBtn(totalPages);
    hideExtremeButtons(totalPages);
  }

  setupPagination(listItems, paginationElement, rows);
  arrowLeft.onclick = onArrowLeftClick;
  arrowRight.onclick = onArrowRightClick;

  hideExtremeButtons(totalPages);
  disableArrowBtn(totalPages);
}

paginationElement.addEventListener('click', disableArrowBtnAfterPageClick);

function disableArrowBtnAfterPageClick(e) {
  if (e.target.tagName != 'BUTTON') {
    return;
  } else {
    disableArrowBtn(pageCount);
  }
}

// делает неактивными кнопки-стрелки на первой и последней  странице
function disableArrowBtn(totalPages) {
  if (currentPage === 1) {
    arrowLeft.classList.add('disabled-arrow');
  } else {
    arrowLeft.classList.remove('disabled-arrow');
  }

  if (currentPage === totalPages) {
    arrowRight.classList.add('disabled-arrow');
  } else {
    arrowRight.classList.remove('disabled-arrow');
  }
}
