import { galleryItems } from "./gallery-items.js";
// Change code below this line

console.log(galleryItems);

const gallery = document.querySelector(".gallery");
let bigImage;
let srcBigImage;

createGalleryMarkup();

gallery.addEventListener("click", onClickShowLightBox);

function createGalleryMarkup() {
  const galleryMarkup = galleryItems
    .map(
      ({ preview, original, description }) => `<div class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</div>`
    )
    .join("");
  gallery.innerHTML = galleryMarkup;
}

function onEscapeCloseImage(e) {
  if (e.code === "Escape") {
    bigImage.close();
  }
}

function onClickShowLightBox(e) {
  e.preventDefault();

  if (e.currentTarget === e.target) {
    return;
  }

  getSrcBigImg(e);
  setBigImage();
  bigImage.show();
}

function getSrcBigImg(e) {
  srcBigImage = e.target.dataset.source;
  if (!srcBigImage) {
    srcBigImage = e.target.querySelector(".gallery__image").dataset.source;
  }
}

function setBigImage() {
  bigImage = basicLightbox.create(`<img src="${srcBigImage}">`, {
    onShow: (bigImage) => {
      document.addEventListener("keydown", onEscapeCloseImage);
    },
    onClose: (bigImage) => {
      document.removeEventListener("keydown", onEscapeCloseImage);
    },
  });
}
