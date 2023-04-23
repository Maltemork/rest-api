"use strict";
window.addEventListener("load", start);


//--------START FUNCTION----------//
async function start() {
  updatePostsTable();
  updateUsersTable();
  signUpBtn();

  console.log("app loaded");
  document.querySelector("#signup").addEventListener("submit", submitClick);
  document
    .querySelector("#accept-checkbox")
    .addEventListener("click", acceptClick);
}

const endpoint =
  "https://first-78ee1-default-rtdb.europe-west1.firebasedatabase.app";

function submitClick(event) {
  event.preventDefault();

  console.log(event);

  const elements = document.querySelector("#signup").elements;

  const signup = {
    fullname: elements.fullname.value,
    email: elements.email.value,
    username: elements.username.value,
    password: elements.password.value,
    payment: elements.payment.value,
    paymentcycle: elements.paymentPlan.value,
    spam: elements.spam.checked,
    accept: elements.accept.checked,
  };

  console.log(signup);
}

function acceptClick(event) {
  if (event.target.checked === false) {
    document.querySelector("#form-submit-btn").disabled = true;
  } else {
    document.querySelector("#form-submit-btn").disabled = false;
  }
}

//When create post button is clicked
function createPostClicked() {
  const randomNumber = Math.floor(Math.random() * 100 + 1);
  const title = `Title Post Number ${randomNumber}`;
  const image = "image";
  const body = "new body";

  createPost(image, title, body);
}

//Creates new post from JSON.
async function createPost(image, title, body) {
  console.log("Create post");
  const newPost = { image, title, body };
  //The object gets made to a JSON-string
  const jsonString = JSON.stringify(newPost);
  //Use of fetch to POST the json string
  const response = await fetch(`${endpoint}/posts.json`, {
    method: "POST",
    body: jsonString,
  });
  //Update to get the new post shown in the table
  if (response.ok) {
    console.log("creation successful");
    updatePostsTable();
  }
}

//Delete post by id
async function deletePost(id) {
  console.log("Delete post");
  //Calling fetch to make a request with DELETE on specified object
  const response = await fetch(`${endpoint}/posts/${id}.json`, {
    method: "DELETE",
  });
  //Only updates table if the response is successful
  if (response.ok) {
    console.log("Deletion successful");
    updatePostsTable();
  }
}

//Update content of a post by id
async function updatePost(id, image, title, body) {
  const postToUpdate = { image, title, body }; //post to update
  const jsonString = JSON.stringify(postToUpdate); //Javascript object to JSON string
  //Fetch PUT request with the specified element(id)
  const response = await fetch(`${endpoint}/posts/${id}.json`, {
    method: "PUT",
    body: jsonString,
  });
  //Only updates table if response is successful
  if (response.ok) {
    console.log("Update successful");
    updatePostsTable();
  }
}


// --------------USERS SECTION---------------------//

//Update the users table
async function updateUsersTable() {
  console.log("Users has been updated");
  const users = await getUsers();
  showUsers(users);
}

//get users
async function getUsers() {
  const response = await fetch(`${endpoint}/users.json`);
  const data = await response.json();
  return prepareData(data);
}

//prepare userdata
function prepareData(dataObject) {
  let dataArray = [];
  for (const key in dataObject) {
    const data = dataObject[key];
    data.id = key;
    dataArray.push(data);
  }
  return dataArray;
}

// show users
function showUsers(user) {
  console.log("Show users");
  //Deletes content in table before adding new content to make sure it updates correctly
  document.querySelector(".user-table").innerHTML = "";

  const htmlUserHeader = /*html*/ `
    <tr>
      <th id="user_image">Image</th>
      <th id="user_mail">Mail</th>
      <th id="user_name">Name</th>
      <th id="user_phone">Phone</th>
      <th id="user_title">Title</th>
    </tr>
  `;
  document
    .querySelector(".user-table")
    .insertAdjacentHTML("beforeend", htmlUserHeader);

  //Shows data in html
  function showUser(user) {
    const htmlUserData = /*html*/ `
  <tr>
    <td><image src=${user.image}></td>
    <td>${user.mail}</td>
    <td>${user.name}</td>
    <td>${user.phone}</td>
    <td>${user.title}</td>
  </tr>
  `;
    document
      .querySelector(".user-table")
      .insertAdjacentHTML("beforeend", htmlUserData);
  }
  user.forEach(showUser);
}

//------------------POSTS SECTION------------------//

//update the posts table
async function updatePostsTable() {
  const posts = await getPosts();
  showPosts(posts);
}

//get posts
async function getPosts() {
  console.log("Get the posts");
  const response = await fetch(`${endpoint}/posts.json`);
  const data = await response.json();
  return prepareData(data);
}

//update the posts section
async function updatePost(id, image, title, body) {
  const postToUpdate = { image, title, body }
  const jsonString = JSON.stringify(postToUpdate);
  const response = await fetch(`${endpoint}/posts/${id}.json`, {
    method: "PUT",
    body: jsonString,
  });
  // Updates table if response is successful
  if (response.ok) {
    console.log("Posts updated");
    updatePostsTable();
  }
}

//Show posts in html
function showPosts(posts) {
  document.querySelector(".post-item-card").innerHTML = "";

      //Show individual post in HTML
      function showPost(post) {
      const htmlPostData = /*html*/ 
          `
          <div class="post-item">
            <div><image src=${post.image}></>
            <div id="post_title">${post.title}</div>
            <div id="post_body">${post.body}</div>
            <button class="delete-btn">Delete</button>
            <button class="update-btn">Update</button>
          </div>
          `;

      document.querySelector(".grid-item-card").insertAdjacentHTML("beforeend", htmlPostData);
    }

  posts.forEach(showPost);
}

//misc eventlisteners


//signup form only shows when pressed.
function signUpBtn() {
  document.querySelector("#signup-btn").addEventListener("click", signupClicked);
  function signupClicked() {
    if (document.querySelector("#form-section").hidden === true) {
      document.querySelector("#form-section").hidden = false;
    } else {
      document.querySelector("#form-section").hidden = true;
    }
  }
}