const sizePopup = document.getElementById("size-popup");
const popupOverlay = document.getElementById("popup-overlay");
const chooseSizeButton = document.getElementById("choose-size-btn");
const popupCloseButton = document.getElementById("popup-close-btn");
const doneButton = document.getElementById("popup-done-btn");

const STORAGE_KEYS = {
  size: "selectedSize",
  width: "selectedWidth",
  calf: "selectedCalf",
};

const DEFAULT_VALUES = {
  size: "6",
  width: "B",
  calf: "Regular",
};

const selectedValues = {
  size: localStorage.getItem(STORAGE_KEYS.size) || DEFAULT_VALUES.size,
  width: localStorage.getItem(STORAGE_KEYS.width) || DEFAULT_VALUES.width,
  calf: localStorage.getItem(STORAGE_KEYS.calf) || DEFAULT_VALUES.calf,
};

let tempValues = { ...selectedValues };

if (sizePopup && popupOverlay && chooseSizeButton && popupCloseButton && doneButton) {
  chooseSizeButton.addEventListener("click", openPopup);
  popupCloseButton.addEventListener("click", closePopup);
  popupOverlay.addEventListener("click", closePopup);
  doneButton.addEventListener("click", handleDoneButtonClick);

  function openPopup() {
    tempValues = { ...selectedValues };
    highlightSelectedOptions();
    sizePopup.classList.add("active");
    popupOverlay.classList.add("active");
  }

  function closePopup() {
    sizePopup.classList.remove("active");
    popupOverlay.classList.remove("active");
  }

  function handleDoneButtonClick() {
    Object.assign(selectedValues, tempValues);
    saveAllToLocalStorage();
    updateSelectedValues();
    closePopup();
  }

  function highlightSelectedOptions() {
    const optionsMap = {
      size: "#size-options button",
      width: "#width-options button",
      calf: "#calf-options button",
    };

    Object.entries(optionsMap).forEach(([type, selector]) => {
      const options = document.querySelectorAll(selector);
      options.forEach((option) => {
        option.classList.toggle("selected", option.dataset[type] === tempValues[type]);
      });
    });
  }

  function saveAllToLocalStorage() {
    Object.entries(selectedValues).forEach(([key, value]) => {
      localStorage.setItem(STORAGE_KEYS[key], value);
    });
  }

  function updateSelectedValues() {
    const sizeField = document.querySelector(".pricing__sizeValues");
    if (sizeField) {
      sizeField.innerHTML = `Size: <span>${selectedValues.size}</span>, Width: <span>${selectedValues.width}</span>, Calf Width: <span>${selectedValues.calf}</span>`;
    }
  }

  function addSelectionListeners(type) {
    const options = document.querySelectorAll(`#${type}-options button`);
    options.forEach((option) => {
      option.addEventListener("click", () => {
        options.forEach((btn) => btn.classList.remove("selected"));
        option.classList.add("selected");
        tempValues[type] = option.dataset[type];
      });
    });
  }

  ["size", "width", "calf"].forEach(addSelectionListeners);
  highlightSelectedOptions();
  updateSelectedValues();
} else {
  console.error("Some required DOM elements were not found.");
}
