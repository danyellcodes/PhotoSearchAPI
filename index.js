"use strict";

// tasks:
// 👉 Connect to Pexels "Search" API                    X
// 👉 Create an AJAX request to fetch data              X
// 👉 Render JSON data on the page with dynamic HTML    X
// 👉 Allow user to search (event listener)             X

var API_KEY = "563492ad6f91700001000001c6b8ed582a4d4fc3b77a8ead427b187b";
var searchForm = document.querySelector("#search-form");

searchForm.addEventListener("submit", function (e) {
  e.preventDefault();

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var res = JSON.parse(xhttp.responseText);
      var photoArray = [];
      for (let i = 0; i < res.photos.length; i++) {
        photoArray.push(res.photos[i]);
      }

      var container = document.querySelector("#photo-divs");
      container.innerHTML = "";

      photoArray.forEach(function (photo) {
        console.log(photo.src);
        var photoDiv = document.createElement("div");
        photoDiv.classList.add("photo-div");
        photoDiv.innerHTML = `
<img src=${photo.src.medium}>
      `;
        container.appendChild(photoDiv);
      });
    }
  };

  var textValue = document.querySelector("#search-bar").value;

  xhttp.open(
    "GET",
    `https://api.pexels.com/v1/search?query=${textValue}&key=563492ad6f91700001000001c6b8ed582a4d4fc3b77a8ead427b187b`,
    true
  );
  xhttp.setRequestHeader("Authorization", API_KEY);
  xhttp.send();
});

var xhttp = new XMLHttpRequest();

function setNewActive(el) {
  var contentBodies = document.getElementsByClassName("content-body");
  for (var contentBody of contentBodies) {
    contentBody.classList.remove("show-active");
  }
  console.log(el.textContent);
  document.getElementById(el.textContent).classList.add("show-active");

  var tabs = document.getElementsByClassName("tab");
  for (var tab of tabs) {
    tab.classList.remove("tab-active");
  }
  el.classList.add("tab-active");
}

var tabs = document.getElementsByClassName("tab");
for (var tab of tabs) {
  //add click listener to each tab
  tab.addEventListener("click", function (e) {
    console.log(e.currentTarget);
    setNewActive(e.currentTarget);
  });
}
