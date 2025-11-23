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

  // Find the dropdown container (use the class you have in Webflow)
  // in your screenshot the wrapper is called "dropdown-2"; alternatively use '.w-dropdown'
  const dropdownContainer = dropdownElement.closest(".dropdown-2") || dropdownElement.closest(".w-dropdown");

  // Extract text from the clicked dropdown link
  const dropdownText = dropdownElement.textContent.trim();

  // Find the replace-text element inside the same dropdown container
  const replaceTextElement = dropdownContainer ? dropdownContainer.querySelector(".replace-text") : document.querySelector(".replace-text");

  // Trigger the tab click first
  if (tabElement) {
    tabElement.click();
  }

  // Update the local replace-text (inside same dropdown)
  if (replaceTextElement) {
    replaceTextElement.textContent = dropdownText;
  }

  // Close the dropdown after a short delay so the tab action can complete
  setTimeout(function () {
    // Prefer triggering Webflow's close event (keeps consistent behavior)
    // This uses the global trigger example you already use; it will close dropdowns.
    $(".dropdown").triggerHandler("w-close.w-dropdown");

    // If you want to close only this specific dropdown instance, you can try:
    // if (dropdownContainer) {
    //   const toggle = dropdownContainer.querySelector(".w-dropdown-toggle");
    //   if (toggle) toggle.click(); // toggles the dropdown
    // }
  }, 40); // 40ms is enough; bump to 100 if needed
});

// If you still want the jQuery click handler, remove closing logic there to avoid double-closing.
// Or replace it with a no-op. Example: (optional)
$("[data-dropdown]").off("click"); // remove any previous handlers to avoid conflicts
