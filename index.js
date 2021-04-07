function getdata() {
  fetch("https://kea2021-8b3d.restdb.io/rest/posts", {
    method: "GET",
    headers: {
      "x-apikey": "606d5edcf553500431007504",
    },
  })
    .then((res) => res.json())
    .then((response) => {
      showPosts(response);
    })
    .catch((err) => {
      console.error(err);
    });
}
getdata();

function showPosts(posts) {
  console.log(posts);
  //grab template
  const template = document.querySelector("template.frontpage").content;

  posts.forEach((post) => {
    //clone it
    const copy = template.cloneNode(true);
    //adjust stuff
    copy.querySelector("h2").textContent = post.title;
    copy.querySelector("h3 span").textContent = post.username;

    //append it
    document.querySelector("main").appendChild(copy);
  });
}
