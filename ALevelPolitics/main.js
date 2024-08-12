const ArticleData = "https://raw.githubusercontent.com/thomaspemby/RevisionServer/main/data.json";

async function fetchData() {
    try {
        const response = await fetch(ArticleData);
        const data = await response.json();
        return data['Articles'];
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

function convertUnixTimestamp(unixTimestamp) {
    const date = new Date(unixTimestamp * 1000);
  
    // Get the day, month, and year components
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    const formattedDate = `${day}-${month}-${year}`;
  
    return formattedDate;
}

document.addEventListener('DOMContentLoaded', async function() {

    if (document.title !== "Politics Article | Article") {
        return;
    }

    const urlParams = new URLSearchParams(window.location.search);
    const articleId = urlParams.get('article');

    if (!articleId) {
        window.location.replace("./articles.html");
    }

    try {
        var dataToFind = await fetchData();
        console.log(dataToFind);

        var articleIdToFind = (parseInt(articleId) - 1).toString();
        var articleData = dataToFind[articleIdToFind];

        if (!articleData) {
            window.location.replace("./articles.html");
        }

        var Title = articleData['Title'];
        var Content = articleData['Content'].toString();
        var Author = articleData['Creator'];
        var Date = articleData['Date'];
        var ShortDesc = articleData['ShortDescription'];

        document.getElementById("articleTitle").innerHTML = Title;
        const formattedDate = convertUnixTimestamp(Date);    
        document.getElementById("articleMetadata").innerHTML = "Author: " + Author + " | Date: " + formattedDate;

        stringWithBreaks = Content.replace(/\n/g, '<br><br>')

        stringWithBreaks = stringWithBreaks.replace(/<1l>/g, '<br>');

        

        document.getElementById("articleContent").innerHTML = stringWithBreaks;

    } catch (error) {
        console.error('Error:', error);
    }

});

/* Creating the articles page */

document.addEventListener('DOMContentLoaded', async function() {
    if (document.title !== "Politics Article | Articles") {
        return;
    }

    try {
        var dataToFind = await fetchData();
        console.log(dataToFind);

        /* Loop through all of the articles in dataToFind and create an article element. The href will be ?article=[id] */

        var articleList = document.getElementById("article-grid");

        for (var i = 0; i < dataToFind.length; i++) {
            var articleData = dataToFind[i];

            var Title = articleData['Title'];
            var Author = articleData['Creator'];
            var Date = articleData['Date'];
            var ShortDesc = articleData['ShortDescription'];
            var Thumbnail = articleData['Thumbnail'];

            var articleElement = document.createElement("div");
            articleElement.className = "article-card";

            var articleImage = document.createElement("img");
            articleImage.src = Thumbnail;
            
            var articleTitle = document.createElement("h3");
            articleTitle.innerHTML = Title;

            var articleDesc = document.createElement("p");
            articleDesc.innerHTML = ShortDesc;

            var articleLink = document.createElement("a");
            articleLink.href = "./article.html?article=" + (i + 1);
            articleLink.innerHTML = "Read More";

            articleElement.appendChild(articleImage);
            articleElement.appendChild(articleTitle);
            articleElement.appendChild(articleDesc);
            articleElement.appendChild(articleLink);

            articleList.appendChild(articleElement);
        }


    } catch (error) {
        console.error('Error:', error);
    }
});


document.addEventListener('DOMContentLoaded', async function() {
    if (document.title !== "Politics Article | Home") {
        return;
    }

    /* Get the latest 3 articles */

    try {
        var dataToFind = await fetchData();
        var articleList = document.getElementById("articles-container");

        /* Find the last 3 articles */

        var lastThreeArticles = dataToFind.slice(Math.max(dataToFind.length - 3, 1));

        for (var i = 0; i < lastThreeArticles.length; i++) {
            var articleData = lastThreeArticles[i];

            var Title = articleData['Title'];
            var Author = articleData['Creator'];
            var Date = articleData['Date'];
            var ShortDesc = articleData['ShortDescription'];
            var Thumbnail = articleData['Thumbnail'];

            var articleElement = document.createElement("div");
            articleElement.className = "article-card";

            var articleImage = document.createElement("img");
            articleImage.src = Thumbnail;
            
            var articleTitle = document.createElement("h3");
            articleTitle.innerHTML = Title;

            var articleDesc = document.createElement("p");
            articleDesc.innerHTML = ShortDesc;

            var articleLink = document.createElement("a");
            articleLink.href = "./article.html?article=" + (articleData["Id"]);
            articleLink.innerHTML = "Read More";

            articleElement.appendChild(articleImage);
            articleElement.appendChild(articleTitle);
            articleElement.appendChild(articleDesc);
            articleElement.appendChild(articleLink);

            articleList.appendChild(articleElement);
        }
    } catch (error) {
        console.error('Error:', error);
    }
    
});

function SwitchPageCreate()
{
    window.location.replace("./create.html");
}