document.addEventListener("click", function (event) {
  // Find clicked element or nearest ancestor with data-dropdown
  let dropdownElement = event.target.hasAttribute("data-dropdown")
    ? event.target
    : event.target.closest("[data-dropdown]");

  if (!dropdownElement) return;

  // Get the data-dropdown value
  const dropdownValue = dropdownElement.getAttribute("data-dropdown");

  // Find the matching tab element using the data-w-tab attribute
  const tabElement = document.querySelector(`[data-w-tab="${dropdownValue}"]`);

  // Find the dropdown container (your required class)
  const dropdownContainer = dropdownElement.closest(".dropdown-2");

  // Extract text from the clicked dropdown link
  const dropdownText = dropdownElement.textContent.trim();

  // Find the replace-text element inside this same dropdown component
  const replaceTextElement = dropdownContainer
    ? dropdownContainer.querySelector(".replace-text")
    : null;

  // Trigger the tab click
  if (tabElement) {
    tabElement.click();
  }

  // Update the local replace-text
  if (replaceTextElement) {
    replaceTextElement.textContent = dropdownText;
  }

  // Close dropdown AFTER the tab click + text update (important)
  setTimeout(function () {
    $(".dropdown").triggerHandler("w-close.w-dropdown");
  }, 40);
});
