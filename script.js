// get slider items // Array.form() es6
var sliderItems = Array.from(
  document.querySelectorAll(".slider-container img")
);
var sliderItemsLength = sliderItems.length;

// set current slide
var currentSlide = 1;

var slideNumberElement = document.getElementById("slide-number");
// controls
var prevBtn = document.getElementById("prev");
var nextBtn = document.getElementById("next");

// handle button clicks
prevBtn.onclick = prev;
nextBtn.onclick = next;

// create ul
var pagination = document.createElement("ul");

// set id on created ul
pagination.setAttribute("id", "pagination");

// li loop
for (var i = 1; i <= sliderItemsLength; i++) {
  var paginationItem = document.createElement("li");
  paginationItem.setAttribute("data-slide-number", i);
  // set item content
  paginationItem.appendChild(document.createTextNode(i));
  // append li to ul
  pagination.appendChild(paginationItem);
}

// APPEND pagination to page
document.getElementById("indicators").appendChild(pagination);

// get the  new created ul
var paginationUl = document.getElementById("pagination");
var paginationBtn = Array.from(document.querySelectorAll("#pagination li"));

paginationBtn.forEach(
  (element) =>
    (element.onclick = () => {
      currentSlide = parseInt(element.getAttribute("data-slide-number"));
      createChecker();
    })
);

// trigger check
createChecker();

// next slide
function next() {
  // console.log("next");
  if (nextBtn.classList.contains("disabled")) {
    return false;
  } else {
    currentSlide++;
    // loop
    if (currentSlide > sliderItemsLength) {
      currentSlide = 1;
    }
    createChecker();
  }
}
// prev slide
function prev() {
  // console.log("prev");
  if (prevBtn.classList.contains("disabled")) {
    return false;
  } else {
    currentSlide--;
    // loop
    if (currentSlide === 0) {
      currentSlide = sliderItemsLength;
    }
    createChecker();
  }
}
// create the checker functionality
function createChecker() {
  slideNumberElement.textContent =
    "Slide number: " + currentSlide + " of " + sliderItemsLength;
  // /removed all active class from slide
  sliderItems.forEach((element) => element.classList.remove("active"));
  paginationBtn.forEach((element) => element.classList.remove("active"));
  // set active class to current slide
  sliderItems[currentSlide - 1].classList.add("active");
  paginationUl.children[currentSlide - 1].classList.add("active");

  // check disabled buttons
  checkDisabled();
}

function checkDisabled() {
  // check if the current slide is first slide
  if (currentSlide === 1) {
    prevBtn.classList.add("disabled");
  } else {
    prevBtn.classList.remove("disabled");
  }
  // check if the current slide is last slide
  if (currentSlide === sliderItemsLength) {
    nextBtn.classList.add("disabled");
  } else {
    nextBtn.classList.remove("disabled");
  }
}
