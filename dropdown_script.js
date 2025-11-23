document.addEventListener("click", function (event) {
  // Find clicked element or nearest ancestor with data-dropdown
  let dropdownElement = event.target.hasAttribute("data-dropdown")
    ? event.target
    : event.target.closest("[data-dropdown]");

  if (!dropdownElement) return;

  // Get the data-dropdown value
  const dropdownValue = dropdownElement.getAttribute("data-dropdown");

  // Match tab element
  const tabElement = document.querySelector(`[data-w-tab="${dropdownValue}"]`);

  // The specific dropdown component (your class)
  const dropdownContainer = dropdownElement.closest(".dropdown-2");

  // Update text
  const dropdownText = dropdownElement.textContent.trim();
  const replaceTextElement = dropdownContainer
    ? dropdownContainer.querySelector(".replace-text")
    : null;

  if (tabElement) tabElement.click();
  if (replaceTextElement) replaceTextElement.textContent = dropdownText;

setTimeout(function () {
  const dropdownInstance = dropdownElement.closest(".dropdown-2");
  if (dropdownInstance) {
    $(dropdownInstance).triggerHandler("w-close.w-dropdown");
  }
}, 10);
});

