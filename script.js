"use strict";

const mod = (function() {
  var input = document.querySelector(".input");

  function loadText(e) {
    e.preventDefault(); // prevent page from default refresh

    document.getElementById("loadingText").style.display = "block";

    // Wiki API
    var endpoint = `https://en.wikipedia.org/w/api.php?action=opensearch&search=${
      input.value
    }&format=json&origin=*`;

    //  Make AJAX Request
    var data = fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        document.getElementById("loadingText").style.display = "none";
        var foo = data.filter(function(item, index) {
          return index !== 0;
        });

        var titlesArr = foo[0];
        var descriptionArr = foo[1];
        var linksArr = foo[2];

        // Iterate through resultsArr. For each result, store them in an <li> tag.
        var markup = titlesArr
          .map(function(title, index) {
            return `
      <li class="row">
        <a href="${linksArr[index]}" target="_blank">
          <h1 class="title"{>${titlesArr[index]}</h1>
          <p>${descriptionArr[index]}</p>
        </a>
      </li>
    `;
          })
          .join("");

        document.getElementById("output").innerHTML = markup;
      })
      .catch(function(err) {
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
