"use strict";

const mod = (function () {
  var input = document.querySelector(".input");

  function loadText(e) {
    e.preventDefault(); // prevent page from default refresh

    document.getElementById("loadingText").style.display = "block";

    // Wiki API
    var endpoint = `https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&srsearch=${input.value}&origin=*`

    //  Make AJAX Request
    var data = fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        document.getElementById("loadingText").style.display = "none";

        var markup = data.query.search.map(function (article) {
          var encodedTitle = encodeURIComponent(article.title)
          return `<li class="row">
            <a href=https://en.wikipedia.org/wiki/${encodedTitle} target="_blank">
              <h1 class="title">${article.title}</h1>
              <p>${article.snippet}</p>
            </a>
          </li>`
        })
          .join("");

        document.getElementById("output").innerHTML = markup;
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  return {
    loadTextListener() {
      return document
        .querySelector(".searchBtn")
        .addEventListener("click", loadText);
    }
  };
})();

mod.loadTextListener();
