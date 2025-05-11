const swiperTestimonial = new Swiper(".swiperTestimonial", {
  spaceBetween: 30,
  slidesPerView: 2,
  autoplay: {
    delay: 8000,
    disableOnInteraction: false,
  },
  speed: 1200,
  pagination: {
    el: ".swiper-pagination-testimonial",
    clickable: true,
  },

  breakpoints: {
    0: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 2,
    },
  },
});

const swiperBlog = new Swiper(".swiperBlog", {
  spaceBetween: 30,
  slidesPerView: 2,
  autoplay: {
    delay: 10000,
    disableOnInteraction: false,
  },
  speed: 1200,
  pagination: {
    el: ".swiper-pagination-blog",
    clickable: true,
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 1,
    },
    1024: {
      slidesPerView: 2,
    },
  },
});

const swiperFounders = new Swiper(".swiperFounders", {
  spaceBetween: 30,
  slidesPerView: 2,
  autoplay: {
    delay: 8000,
    disableOnInteraction: false,
  },
  speed: 1200,
  pagination: {
    el: ".swiper-pagination-founders",
    clickable: true,
  },

  breakpoints: {
    0: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 1,
    },
    1024: {
      slidesPerView: 2,
    },
  },
});
