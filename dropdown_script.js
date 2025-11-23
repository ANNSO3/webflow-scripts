// jQuery-only handler that mirrors the original snippet but scoped to the clicked dropdown instance
$("[data-dropdown]").on("click", function (e) {
  e.preventDefault(); // prevent default link behavior if these are anchors

  var $link = $(this); // clicked dropdown link
  var dropdownValue = $link.attr("data-dropdown"); // the tab name
  var $tab = $('[data-w-tab="' + dropdownValue + '"]'); // matching tab
  var $dropdownInstance = $link.closest(".dropdown-2"); // your required wrapper

  // Update tab (if found)
  if ($tab.length) {
    $tab.get(0).click();
  }

  // Update the replace-text inside the same dropdown
  var newText = $link.text().trim();
  if ($dropdownInstance.length) {
    var $replace = $dropdownInstance.find(".replace-text");
    if ($replace.length) $replace.text(newText);
  }

  // Close only THIS dropdown instance (preferred: trigger Webflow close handler on instance)
  if ($dropdownInstance.length) {
    $dropdownInstance.triggerHandler("w-close.w-dropdown");
  } else {
    // fallback to original global close if instance not found
    $(".dropdown").triggerHandler("w-close.w-dropdown");
  }

  // Extra fallback: if still open, click the toggle to force-close (mimics native behavior)
  setTimeout(function () {
    if ($dropdownInstance.length && $dropdownInstance.hasClass("w--open")) {
      var $toggle = $dropdownInstance.find(".w-dropdown-toggle");
      if ($toggle.length) $toggle.get(0).click();
    }
  }, 10);
});
