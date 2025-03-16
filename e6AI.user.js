// ==UserScript==
// @name         e6AI
// @namespace    http://tampermonkey.net/
// @version      1.3
// @description  Functions for e6AI / e621
// @author       Seni
// @match        https://e6ai.net/posts/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=e6ai.net
// @grant        none
// ==/UserScript==
let version = "1.3";
let ignoreKeyPress = false;

function favoritePost(shiftKey) {
  try {
    ignoreKeyPress = true;
  let favButton = document.querySelector("#add-fav-button");
  let removeFavButton = document.querySelector("#remove-fav-button");

  let isFav = document.querySelector(".fav-buttons").classList[1].split('-')[2] == "true";

  addFavButton.removeEventListener("click", voteUp);
  if (shiftKey)
  {
    if (!isFav)
      return;

    console.log("Removing favorite.");
    removeFavButton.click();
  }
  else
  {
    if (isFav)
      return;

    console.log("Adding favorite.");
    favButton.click();
  }
  
  voteUp();
  }
  finally {
    ignoreKeyPress = false;
    setTimeout(() => addFavButton.addEventListener("click", voteUp), 1000);
  }
}

function voteUp() {
  document.querySelectorAll(".post-vote-up-link")[1].children[0].click();
}

function voteDown() {
  document.querySelectorAll(".post-vote-down-link")[1].children[0].click();
}

function nextPost() {
  document.querySelector(".nav-link.next").click();
}

function previousPost() {
  document.querySelector(".nav-link.prev").click();
}

function handleKeyPress(event) {
  if (ignoreKeyPress)
    return;

  const activeElement = document.activeElement;
    
  // Check whether the active element is an input field or a text area
  if (activeElement.tagName === "INPUT" || activeElement.tagName === "TEXTAREA" || activeElement.isContentEditable) {
    console.log("Active element is text input. No Key evaluated.");  
    return; // Function ends early when a text field is active
  }

  let keyPressed = event.key.toLowerCase();
  switch(keyPressed)
  {
    case "w":
      voteUp();
      break;
    case "s":
      voteDown();
      break;
    case "f":
      favoritePost(event.shiftKey);
      break;
    case "d":
      nextPost();
      break;
    case "a":
      previousPost();
      break;
    default:
      console.log("(" + keyPressed + ") Key not registered");
  }
}

function setAutoplay() {
  const video = document.querySelector("video");
  if (video == null)
    return;

  video.autoplay = true;
  video.muted = true;
  video.loop = true;
  video.play();
}

// Event Listener
setAutoplay();
let addFavButton = document.getElementById("add-fav-button");
addFavButton.addEventListener("click", voteUp);


document.addEventListener("keydown", handleKeyPress);
//document.getElementById("add-fav-button")?.addEventListener("click", voteUp);
//document.getElementById("add-fav-button")?.removeEventListener("click", voteUp);

console.log("Seni's e6 scripts loaded. Version: " + version);