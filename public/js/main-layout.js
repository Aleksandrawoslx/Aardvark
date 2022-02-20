document.addEventListener("DOMContentLoaded", function () {
  let burger = document.querySelector(".navbar-burger");
  let burgerMenu = document.querySelector(".navbar-menu");

  burger.addEventListener("click", function () {
    burger.classList.toggle("is-active");
    burgerMenu.classList.toggle("is-active");
  });
});
