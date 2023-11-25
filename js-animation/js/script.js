// загрузка
let tl = gsap.timeline();
tl.from(".hero__title", {duration: 2, opacity: 0, y: 150, ease: "expo.out"})
  .from(".hero__btn", {duration: 2, opacity: 0, y: 150, ease: "expo.out"}, "-=2")
  .from(".hero__descr", {duration: 10, opacity: 0, ease: "expo.out"}, "-=1")
  .from(".photos-wrap-1", {duration: 2, opacity: 0, scale: 0, ease: "expo.out"}, "-=9")
  .from(".photos-wrap-2", {duration: 1, opacity: 0, scale: 0, ease: "expo.out"}, "-=8.5")
  .from(".photos-wrap-3", {duration: 1, opacity: 0, scale: 0, ease: "expo.out"}, "-=8")
  .from(".photos__author", {duration: 1, opacity: 0, ease: "expo.out"}, "-=7.5");

// бургер
let burger = document.querySelector('.burger');
let close = document.querySelector('.close');
let menu = document.querySelector('.menu');

let tl1 = gsap.timeline({paused: true});

  tl1.fromTo(".menu", 3, {display: "none", opacity: 0}, {display: "block", opacity: 1})
     .from(".menu__nav", {duration: 3, opacity: 0, y: 70, ease: "expo.out"}, "-=1")
     .from(".sub-menu", {duration: 3, opacity: 0, y: 70, ease: "expo.out"}, "-=1")
     .from(".social", {duration: 3, opacity: 0, y: 70, ease: "expo.out"}, "-=3");

burger.addEventListener('click',
  function() {
    tl1.play();
  });

close.addEventListener('click',
  function() {
    tl1.reverse();
  });
