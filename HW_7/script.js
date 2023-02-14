let POST_URL = "https://jsonplaceholder.typicode.com/posts";
let COMMENTS_URL = "https://jsonplaceholder.typicode.com/comments";

let template = document.querySelector("#template");

function getPost() {
  return axios.get(POST_URL, {
    params: {
      _limit: 20,
    },
  });
}

function getComments() {
  return axios.get(COMMENTS_URL, {
    params: {
      _limit: 100,
    },
  });
}

let data = Promise.all([getPost(), getComments()])
  .then(function (result) {
    let [...postData] = result[0].data;
    let [...commentsData] = result[1].data;
    let counter = 1;
    console.log(postData.length);
    console.log(commentsData);

    if (postData.length <= 0 && commentsData.length <= 0) {
      let div = document.createElement("div");
      let title = document.createElement("h1");
      title.textContent = "Loading";
      template.appendChild(div);
      div.appendChild(title);
    }

    postData.map((post) => {
      let div = document.createElement("div");
      let title = document.createElement("h3");
      let par = document.createElement("p");
      div.classList = "post-templ";
      title.textContent = post.title;
      title.classList = "title";
      par.textContent = post.body;
      par.classList = "paragraph";

      template.appendChild(div);
      div.appendChild(title);
      div.appendChild(par);
      let commentTitle = document.createElement("h4");
      commentTitle.textContent = "Comments";
      div.appendChild(commentTitle);

      commentsData.map((comment) => {
        if (comment.postId === post.id) {
          let comments = document.createElement("p");
          let userName = document.createElement("p");
          let userEmail = document.createElement("p");
          comments.textContent = `${comment.id}. ${comment.body}`;
          comments.classList = "comments";
          userName.classList = "userData";
          userEmail.classList = "userData";

          userName.textContent = `Name: ${comment.name}`;
          userEmail.textContent = `Email: ${comment.email}`;
          div.appendChild(comments);
          div.append(userName);
          div.append(userEmail);
        }
      });
    });
  })
  .catch((err) => {
    const div = document.createElement("div");
    const title = document.createElement("h3");
    const par = document.createElement("p");

    title.textContent = err.message;
    par.textContent = err.code;
    template.appendChild(div);
    div.appendChild(title);
    div.appendChild(par);
  });
console.log();
