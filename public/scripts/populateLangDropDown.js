// Script to load and populate the dropdown from languageList.json
$(document).ready(function() {
    $.getJSON("../lang/languageList.json", function(data) {
      var dropdownMenu = $('.dropdown-menu');
      $.each(data, function(key, value) {
        dropdownMenu.append(
          '<a class="dropdown-item bg-dark text-light" href="#">' +
            value.charAt(0).toUpperCase() + value.slice(1) +
          '</a>'
        );
      });
    }).fail(function() {
      console.error("An error occurred while fetching languageList.json");
    });
  });
  