document.addEventListener("click", function (event) {
  // detect clicked element or nearest ancestor with data-dropdown
  let dropdownElement = event.target.hasAttribute("data-dropdown")
    ? event.target
    : event.target.closest("[data-dropdown]");

  if (!dropdownElement) return;

  const dropdownValue = dropdownElement.getAttribute("data-dropdown");
  const tabElement = document.querySelector(`[data-w-tab="${dropdownValue}"]`);
  const dropdownContainer = dropdownElement.closest(".dropdown-2");

  // update label inside the same dropdown
  const dropdownText = dropdownElement.textContent.trim();
  const replaceTextElement = dropdownContainer
    ? dropdownContainer.querySelector(".replace-text")
    : null;

  if (tabElement) tabElement.click();
  if (replaceTextElement) replaceTextElement.textContent = dropdownText;

  // close only THIS dropdown instance
  setTimeout(function () {
    if (!dropdownContainer) return;

    // 1) Prefer clicking the toggle button (this mimics native Webflow behavior)
    const toggle = dropdownContainer.querySelector(".w-dropdown-toggle");
    if (toggle) {
      toggle.click();
      return;
    }

    // 2) Fallback: try to trigger the Webflow close event on the dropdown container
    try {
      $(dropdownContainer).triggerHandler("w-close.w-dropdown");
      return;
    } catch (e) {
      // continue to next fallback
    }

    // 3) Additional fallback: remove Webflow 'open' class from the container
    // This is a last-resort method and may skip animation, but closes the list.
    dropdownContainer.classList.remove("w--open");
    // Also try closing any child list variants
    const list =
      dropdownContainer.querySelector(".w-dropdown-list") ||
      dropdownContainer.querySelector(".dropdown-list") ||
      dropdownContainer.querySelector(".Dropdown.List") ||
      dropdownContainer.querySelector(".DropdownList");
    if (list) list.style.display = "none";
  }, 10);
});
