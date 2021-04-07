const searchParams = new URLSearchParams(window.location.search);
// console.log(searchParams);
const articleId = searchParams.get("article");

fetch("https://kea2021-8b3d.restdb.io/rest/posts/" + articleId, {
  method: "GET",
  headers: {
    "x-apikey": "606d5edcf553500431007504",
  },
})
  .then((res) => res.json())
  .then((response) => {
    showPost(response);
  })
  .catch((err) => {
    console.error(err);
  });

function showPost(data) {
  console.log(data);
  document.querySelector("h1").textContent = data.title;
  document.querySelector("h2 span").textContent = data.username;
  document.querySelector("p.body").textContent = data.content;
  document.querySelector("p.date").textContent = data.date;
}
