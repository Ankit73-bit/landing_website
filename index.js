document.addEventListener("DOMContentLoaded", async function () {
  const heroImage = document.querySelector(".hero-image img");
  const imagePath = "images/hero-image-";
  const imageExtension = ".jpg";
  let imageIndex = 0;
  let validImages = [];

  async function findValidImages() {
    for (let i = 1; i <= 20; i++) {
      // Check up to 20 images
      try {
        const response = await fetch(`${imagePath}${i}${imageExtension}`, {
          method: "HEAD",
        });
        if (response.ok) {
          validImages.push(`${imagePath}${i}${imageExtension}`);
        }
      } catch (error) {
        console.error("Error checking image:", error);
      }
    }
  }

  await findValidImages();

  function changeImage() {
    if (validImages.length === 0) return;
    imageIndex = (imageIndex + 1) % validImages.length;

    // GSAP fade-out animation
    gsap.to(heroImage, {
      opacity: 0,
      duration: 0.5,
      onComplete: () => {
        heroImage.src = validImages[imageIndex];
        gsap.to(heroImage, { opacity: 1, duration: 0.5 });
      },
    });
  }

  if (validImages.length > 0) {
    setInterval(changeImage, 3000);
  }
});
