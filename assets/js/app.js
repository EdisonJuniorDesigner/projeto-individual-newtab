document.querySelector("#menu").addEventListener("click", () => {
    document.querySelector("nav").classList.toggle("show-menu");
});

document.querySelector("#close").addEventListener("click", () => {
    document.querySelector("nav").classList.toggle("close-menu");
});
