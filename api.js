// load all data

const loadAllData = async () => {
    const url = 'https://openapi.programming-hero.com/api/news/categories'
    try {
        const res = await fetch(url);
        const data = await res.json();
        return data.data.news_category;
    } catch (error) {
        console.log(error);
    }

}

//items button 

const setDataCategorey = async () => {
    const data = await loadAllData();
    const categoryAll = document.getElementById('all-menu-items');
    const selectedArray = [];
    for (const perCategory of data) {
        if (selectedArray.indexOf(perCategory.category_name) === -1) {
            selectedArray.push(perCategory.category_name);


            const li = document.createElement('li');
            li.innerHTML = `
            <a onclick="loadAllNews('${perCategory.category_id}')" class="nav-link border border-primary rounded-3 p-2 text-dark my-3">${perCategory.category_name}</a>
            `;
            categoryAll.appendChild(li);
        }
    }

}

setDataCategorey();

// is there any items or not

const loadingSpinner = isLoading => {
    const spinnerSection = document.getElementById('empty-news');
    if (isLoading) {
        spinnerSection.classList.remove('d-none')
    } else {
        spinnerSection.classList.add('d-none')
    }
}
// spinner works

const loadAllNews = async (category_id) => {

    loadingSpinner(true);

    const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`;

    const res = await fetch(url);
    const data = await res.json();

    showNewItems(data.data);

}

const showNewItems = newsAll => {

    // item-counter

    newsAll.sort((a, b) => {
        return b.total_view - a.total_view;
    });

    const newsCount = document.getElementById('data-counter').innerHTML = `${newsAll.length} Items Are In This Categorey`;

    // if there is nop data or news

    const emptyNews = document.getElementById('empty-news');
    if (newsAll.length === 0) {
        emptyNews.classList.remove('d-none');
    }
    else {
        emptyNews.classList.add('d-none');
    }

    // add per items container

    const newsItem = document.getElementById('new-per-item');
    newsItem.textContent = '';
    newsAll.forEach(news => {


        const div = document.createElement('div');
        div.innerHTML = `
        <div class="container card mb-3 border border-primary">
        <div class="row g-0">
        <div class="col-md-4">
         <img src=${news.thumbnail_url}" class="img-fluid rounded-start" alt="...">
        </div>
        <div class="col-md-8">
         <div class="card-body">
         <h5 class="card-title  pt-2">${news.title ? news.title : 'Title is not found'}</h5>
         <p class="card-text">${news.details.length > 300 ? news.details.slice(0, 200) + '...' : news.details}</p>


        
         <div class="mb-3 mt-5" >
            <div class="d-flex justify-content-between row g-0">
                <div class="col-md-2">
                    <img src="${news.author.img ? news.author.img : 'The Author Image Is Not Founded'}" style="width: 50px; height: 50px;" class="rounded-circle" alt="...">
                </div>
                <div class="col-md-4">
                    <h5 class="title">${news.author.name ? news.author.name : 'The Author Name Is Not Founded'}</h5>
                    <p class="text">${news.author.published_date ? news.author.published_date : 'Author Publishing Date Is Not Founded'}</p>

                </div>

                <div class="col-md-4">
                    <h5 class="title"><i class="fa-solid fa-eye"></i> ${news.total_view ? news.total_view : 'Total View Is Not Founded'}</h5>
                </div>
                <div class="col-md-2">
                    <h5 onclick="loadNewsDetails('${news._id}')" class="title" data-bs-toggle="modal" data-bs-target="#detailsModal"><i class="fa-sharp fa-solid fa-arrow-right"></i></h5>
                </div>
            </div>
        </div>
        

      </div>
    </div>
  </div>
</div> `;
        newsItem.appendChild(div);
    })


    loadingSpinner(false);