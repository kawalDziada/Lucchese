const swiper = new Swiper(".mySwiper", {
  direction: "vertical",
  slidesPerView: 5,
  freeMode: true,
    loop: true,
    slideToClickedSlide: false
});

const swiper2 = new Swiper(".mySwiper2", {
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  thumbs: {
    swiper: swiper,
  },
    loop: true,
});
  