const heroImage = document.querySelector(".hero-image img");
const heroImageDiv = document.querySelector(".hero-image");
const imagePath = "images/";
let imageIndex = 0;
const images = [
  "hero-image-1.jpg",
  "hero-image-2.jpg",
  "hero-image-3.jpg",
  "hero-image-4.jpg",
  "hero-image-5.jpg",
  "hero-image-6.jpg",
  "hero-image-7.jpg",
]; // List your images here

// Initial animation: image comes in from the right
gsap.from(heroImageDiv, {
  opacity: 0,
  x: 100,
  duration: 2,
  delay: 1,
  ease: "elastic.out(1, 0.3)",
});

function changeImage() {
  imageIndex = (imageIndex + 1) % images.length;

  // GSAP fade-out animation
  gsap.to(heroImage, {
    opacity: 0,
    duration: 0.5,
    onComplete: () => {
      heroImage.src = imagePath + images[imageIndex];
      gsap.to(heroImage, { opacity: 1, duration: 0.5 });
    },
  });
}

if (images.length > 0) {
  setInterval(changeImage, 3000);
}

const heroText = document.querySelectorAll(".hero-text > *");

gsap.from(heroText, {
  opacity: 0,
  x: -100,
  duration: 2,
  delay: 1,
  ease: "elastic.out(1, 0.3)",
  stagger: 0.2,
});

const buttons = gsap.utils.toArray(".btn");
buttons.forEach((item) => {
  let span = item.querySelector("span");
  let tl = gsap.timeline({ paused: true });

  tl.to(span, { duration: 0.2, yPercent: -150, ease: "power2.in" });
  tl.set(span, { yPercent: 150 });
  tl.to(span, { duration: 0.2, yPercent: 0 });

  item.addEventListener("mouseenter", () => tl.play(0));
});
