const button = document.querySelector(".heart-like-button");
console.log("button : ", button);
button.addEventListener("click", () => {
  if (button.classList.contains("liked")) {
    button.classList.remove("liked");
  } else {
    button.classList.add("liked");
  }
});
