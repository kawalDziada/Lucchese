const popupCloseButton = document.getElementById("popup-close-btn");
const sizePopup = document.getElementById("size-popup");
const popupOverlay = document.getElementById("popup-overlay");

if (popupCloseButton && sizePopup && popupOverlay) {
  popupCloseButton.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      closePopup();
    }
  });

  function closePopup() {
    sizePopup.classList.remove("active");
    popupOverlay.classList.remove("active");
    popupCloseButton.setAttribute("aria-expanded", "false");
  }
} else {
  console.error("Popup elements are missing in the DOM.");
}
