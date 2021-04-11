const searchParams = new URLSearchParams(window.location.search);
// console.log(searchParams);
const articleId = searchParams.get("article");

fetch(
  "https://kea2021-8b3d.restdb.io/rest/posts/" +
    articleId +
    "?fetchchildren=true",
  {
    method: "GET",
    headers: {
      "x-apikey": "606d5edcf553500431007504",
    },
  }
)
  .then((res) => res.json())
  .then((response) => {
    showPost(response);
  })
  .catch((err) => {
    console.error(err);
  });

function showPost(data) {
  console.log(data.comments);
  document.querySelector("h1").textContent = data.title;
  document.querySelector("h2 span").textContent = data.username;
  document.querySelector("p.body").textContent = data.content;

  const template = document.querySelector(".commentTemplate").content;

  data.comments.forEach((comment) => {
    console.log(comment);

    const clone = template.cloneNode(true);
    clone.querySelector(".user_comment").textContent = comment.content;
    clone.querySelector(".user_name").textContent = comment.username;
    clone.querySelector(".e-mail").textContent = comment.email;
    document.querySelector(".commentList").appendChild(clone);
  });
  if (data.comments.length === 0) {
    const clone = template.cloneNode(true);
    clone.querySelector(".user_comment").textContent =
      "No comments yet, be the first!";
    clone.querySelector(".user_name").textContent = "your name";
    clone.querySelector(".e-mail").textContent = "your email";
    document.querySelector(".commentList").appendChild(clone);
  }
}

const form = document.querySelector("#commentForm");

form.addEventListener("submit", handleSubmit);

function handleSubmit(e) {
  e.preventDefault();
  const payload = {
    username: form.elements.username.value,
    email: form.elements.email.value,
    content: form.elements.com_content.value,
    date: Date.now(),
  };
  console.log(payload);
  fetch(`https://kea2021-8b3d.restdb.io/rest/posts/${articleId}/comments`, {
    method: "POST",
    headers: {
      "x-apikey": "606d5edcf553500431007504",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })
    .then((res) => res.json())
    .then((data) => {
      const template = document.querySelector(".commentTemplate").content;
      const clone = template.cloneNode(true);
      clone.querySelector(".user_comment").textContent = data.content;
      clone.querySelector(".user_name").textContent = data.username;
      clone.querySelector(".e-mail").textContent = data.email;
      document.querySelector(".commentList").appendChild(clone);
    });
}
