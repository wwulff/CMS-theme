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
    //clone
    const copy = template.cloneNode(true);
    //adjust and change as I like
    copy.querySelector("h2").textContent = post.title;
    copy.querySelector("h3 span").textContent = post.username;
    copy.querySelector(
      "a.expand_comment"
    ).href = `subpage.html?article=${post._id}`;

    //append
    document.querySelector("main").appendChild(copy);
  });
}
