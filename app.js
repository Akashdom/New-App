const API_KEY = "1c6b8baa20c948a7992b15b2f89b2d05";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => fetchNews("India"));

async function fetchNews(query) {
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await res.json();
    bindData(data.articles);
}

// function bindData(articles) {
    // const cardsContainer = document.getElementById('cards-container');
    // const newsCardTemplate = document.getElementById('template-news-card');
    // cardsContainer.innerHTML = '';
// 
    // articles.forEach((article) => {
        // if (!article.urlToImage) return;
        // const cardClone = newsCardTemplate.content.cloneNode(true);
        // fillDataInCard(cardClone, article);
        // cardsContainer.appendChild(cardClone);
    // });
// }
const fillDataInCard = (cardClone, article) => {
    // Assuming 'fillDataInCard' function populates various fields in the card
    // Including the image field, let's say it's an <img> tag with id 'card-image'
    const imageElement = cardClone.getElementById('card-image');

    // Replace 'article.urlToImage' with the actual image URL property from your article object
    const imageUrl = article.urlToImage;

    // Here, you can handle the deflated image
    // For example, you can inflate or process it in some way
    // Let's say we're just setting the src attribute for simplicity
    imageElement.src = processDeflatedImage(imageUrl);
};

const processDeflatedImage = (imageUrl) => {
    // Here, you would implement the logic to process or inflate the deflated image
    // This could involve decompression, resizing, or any other necessary processing
    // For the sake of this example, let's just return the original URL
    return imageUrl;
};

const bindData = articles => {
    const cardsContainer = document.getElementById('cards-container');
    const { content: newsCardTemplate } = document.getElementById('template-news-card');
    cardsContainer.innerHTML = '';

    articles.forEach(article => {
        if (!article.urlToImage) return;
        const cardClone = newsCardTemplate.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    });
};



function fillDataInCard(cardClone, article) {
    const newsImg = cardClone.querySelector('#news-img');
    const newsTitle = cardClone.querySelector('#news-title');
    const newsSource = cardClone.querySelector('#news-source');
    const newsDesc = cardClone.querySelector('#news-desc');

    if (newsImg) {
        newsImg.src = article.urlToImage;
    } else {
        // Handle the case where newsImg is null
        console.error("Image element not found in card clone:", cardClone);
    }

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US", { timeZone: "Asia/Jakarta" });

    newsSource.innerHTML = `${article.source.name} . ${date}`;

    cardClone.firstElementChild.addEventListener('click',()=>{
        window.open(article.url, "_blank");
    });
};

let curSelectedNav = null;
function onNavItemClick(id){
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = navItem;
    curSelectedNav.classList.add("active");
}

const searchButton = document.getElementById("search-button");
const searchText = document.getElementById('search-text');

searchButton.addEventListener("click",()=>{
    const query = searchText.value;
    if(!query) return;
    fetchNews(query);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = null;
});
