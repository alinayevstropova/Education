function activateBlogItemOnHover() {
  const items = document.querySelectorAll(".our-blog-item");

  items.forEach((item) => {
    item.addEventListener("mouseenter", () => {
      document
        .querySelector(".our-blog-item-active")
        ?.classList.remove("our-blog-item-active");
      item.classList.add("our-blog-item-active");
    });
  });
}

activateBlogItemOnHover();
