// Arrow animation controllers
var ctaArrowLine = document.querySelector("#cta-arrow-line");
var ctaArrowChevron = document.querySelector("#cta-arrow-chevron");
var ctaArrowContainer = document.querySelector("#cta");

var taglineArrowLine = document.querySelector("#tagline-arrow-line");
var taglineArrowChevron = document.querySelector("#tagline-arrow-chevron");
var taglineArrowContainer = document.querySelector("#tagline-cta");

var tinyTaglineArrowLine = document.querySelector("#tiny-tagline-arrow-line");
var tinyTaglineArrowChevron = document.querySelector("#tiny-tagline-arrow-chevron");
var tinyTaglineArrowContainer = document.querySelector("#tiny-tagline-cta");

var voteDayCardArrowLine = document.querySelector("#vote-day-card-arrow-line");
var voteDayCardArrowChevron = document.querySelector("#vote-day-card-arrow-chevron");
var voteDayCardArrowContainer = document.querySelector("#vote-day-card-cta");

// CTA arrow
ctaArrowContainer.onmouseover = function () {
  ctaArrowChevron.classList.remove("anim-chevron--out");
  ctaArrowLine.classList.remove("anim-line--out");
  ctaArrowChevron.classList.add("anim-chevron--in");
  ctaArrowLine.classList.add("anim-line--in");
};

ctaArrowContainer.onmouseout = function () {
  ctaArrowChevron.classList.remove("anim-chevron--in");
  ctaArrowLine.classList.remove("anim-line--in");
  ctaArrowChevron.classList.add("anim-chevron--out");
  ctaArrowLine.classList.add("anim-line--out");
};

//Tagline Arrow
taglineArrowContainer.onmouseover = function () {
  taglineArrowChevron.classList.remove("anim-chevron--out");
  taglineArrowLine.classList.remove("anim-line--out");
  taglineArrowChevron.classList.add("anim-chevron--in");
  taglineArrowLine.classList.add("anim-line--in");
};

taglineArrowContainer.onmouseout = function () {
  taglineArrowChevron.classList.remove("anim-chevron--in");
  taglineArrowLine.classList.remove("anim-line--in");
  taglineArrowChevron.classList.add("anim-chevron--out");
  taglineArrowLine.classList.add("anim-line--out");
};

//Tiny Tagline Arrow
tinyTaglineArrowContainer.onmouseover = function () {
  tinyTaglineArrowChevron.classList.remove("anim-chevron--out");
  tinyTaglineArrowLine.classList.remove("anim-line--out");
  tinyTaglineArrowChevron.classList.add("anim-chevron--in");
  tinyTaglineArrowLine.classList.add("anim-line--in");
};

tinyTaglineArrowContainer.onmouseout = function () {
  tinyTaglineArrowChevron.classList.remove("anim-chevron--in");
  tinyTaglineArrowLine.classList.remove("anim-line--in");
  tinyTaglineArrowChevron.classList.add("anim-chevron--out");
  tinyTaglineArrowLine.classList.add("anim-line--out");
};

//Vote day card arrow
voteDayCardArrowContainer.onmouseover = function () {
  voteDayCardArrowChevron.classList.remove("anim-chevron--out");
  voteDayCardArrowLine.classList.remove("anim-line--out");
  voteDayCardArrowChevron.classList.add("anim-chevron--in");
  voteDayCardArrowLine.classList.add("anim-line--in");
};

voteDayCardArrowContainer.onmouseout = function () {
  voteDayCardArrowChevron.classList.remove("anim-chevron--in");
  voteDayCardArrowLine.classList.remove("anim-line--in");
  voteDayCardArrowChevron.classList.add("anim-chevron--out");
  voteDayCardArrowLine.classList.add("anim-line--out");
};
