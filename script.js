const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let photosArray = [];

// Unsplash API
const count = 10;
const apiKey = "UC4fRvsNFHRQZgBNiPCBLECPu9dyQC18KpH5MytsTmw";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Get photos
const getPhotos = async () => {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    console.log(photosArray);
    displayPhotos();
  } catch (error) {}
};

// Create element that will show photos
const displayPhotos = () => {
  photosArray.forEach((photo) => {
    const imgBox = document.createElement("div");

    const item = document.createElement("a");
    item.setAttribute("href", photo.links.html);
    item.setAttribute("target", "blank");

    const img = document.createElement("img");
    img.setAttribute("src", photo.urls.regular);
    img.setAttribute("alt", photo.alt_description);

    const button = document.createElement("button");
    button.textContent = "download me";
    //button.setAttribute("onclick", window.open(photo.links.download));

    item.appendChild(img);
    imgBox.appendChild(item);
    imgBox.appendChild(button);
    imageContainer.appendChild(imgBox);
  });
};

getPhotos();
