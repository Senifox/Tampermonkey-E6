// ==UserScript==
// @name         e6AI
// @namespace    http://tampermonkey.net/
// @version      2025-03-15 21:59
// @description  Functions for e6AI / e621
// @author       Seni
// @match        https://e6ai.net/posts/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=e6ai.net
// @grant        none
// ==/UserScript==

function clickAddFavButton() {
  const button = document.getElementById("add-fav-button");
  if (button)
    button.click();
  else
    console.error("Button with ID 'add-fav-button' not found");
}

function clickVoteUpButton() {
  const voteButtons = document.querySelectorAll(".post-vote-up-link span");
  for (const voteButton of voteButtons) {
    if (voteButton.classList.contains("score-neutral") && !voteButton.classList.contains("score-positive")) {
      voteButton.click();
      return; // Exit function after the first click
    }
  }
}

function handleKeyPress(event) {
  if (event.key.toLowerCase() === "f") {
    //clickAddFavButton();
    clickVoteUpButton();
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
document.addEventListener("keydown", handleKeyPress);
document.getElementById("add-fav-button")?.addEventListener("click", clickVoteUpButton);