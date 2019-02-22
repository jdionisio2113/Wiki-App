// "use strict";

// var mod = (function() {
var input = document.querySelector(".input");
// const loader = document.querySelector(".loader");
// loader.className += " hidden"; //class hidden

document.querySelector(".searchBtn").addEventListener("click", loadText);

// function preLoadText() {
//   if ( )
// }

function loadText(e) {
  e.preventDefault();

  document.getElementById("loadingText").style.display = "block";

  // document.createElement(p)
  // document.innerHTML
  var data = fetch(
    `https://en.wikipedia.org/w/api.php?action=opensearch&search=${
      input.value
    }&format=json&origin=*`
  )
    .then(res => res.json())
    .then(data => {
      document.getElementById("loadingText").style.display = "none";
      var foo = data.filter(function(item, index) {
        return index !== 0;
      });

      var titlesArr = foo[0];
      var descriptionArr = foo[1];
      var linksArr = foo[2];

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
    .catch(function() {
      // document.getElementById("loadingText").style.display = "none";
    });
}
