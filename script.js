const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let isInitialLoad = true;
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API
const count = 5;
const apiKey = "UC4fRvsNFHRQZgBNiPCBLECPu9dyQC18KpH5MytsTmw";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

function updateAPIURLWithNewCount(picCount) {
  apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${picCount}`;
}

//Check if the images is loaded
function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
  }
}

// Get photos
const getPhotos = async () => {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
    if (isInitialLoad) {
      // NEW LINE ****
      updateAPIURLWithNewCount(30); // NEW LINE ****
      isInitialLoad = false; // NEW LINE ****
    }
  } catch (error) {}
};

// Helper functio to set attributes on DOM elements
const setAttributes = (element, attributes) => {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
};

// Create element that will show photos
const displayPhotos = () => {
  totalImages = photosArray.length;
  photosArray.forEach((photo) => {
    const i = 0;
    const imgBox = document.createElement("div");
    imgBox.classList.add("imgBox");
    const item = document.createElement("a");

    setAttributes(item, {
      href: photo.links.html,
      target: "_blank",
    });

    const img = document.createElement("img");

    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });

    img.addEventListener("load", imageLoaded);

    const button = document.createElement("button");
    button.textContent = "download me";
    button.addEventListener("click", () => {
      window.open(photo.links.download);
    });

    item.appendChild(img);
    imgBox.appendChild(item);
    imgBox.appendChild(button);
    imageContainer.appendChild(imgBox);
  });
};

//Download Button
// const downloadImage = () => {
//   window.open(photosArray[0].links.download);
// };

//Check to see if scrolling near bottom of page, load more photos
window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    imagesLoaded = 0;
    getPhotos();
  }
});

getPhotos();
