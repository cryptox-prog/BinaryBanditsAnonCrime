document.addEventListener('DOMContentLoaded', function() {
  const dropdownMenu = document.querySelector('.dropdown-menu');
  const currentLanguageBtn = document.querySelector('#dropdownMenuButton');

  // Function to get cookie value by name
  

  // Fetch languages list from JSON
  fetch('../lang/languageList.json')
    .then(response => response.json())
    .then(languages => {
      // Load translations function
      function loadLanguage(language) {
        fetch(`../lang/${language}.json`)
          .then(response => response.json())
          .then(translations => {
            document.querySelectorAll('[data-i18n]').forEach(element => {
              const key = element.getAttribute('data-i18n');
              element.textContent = translations[key];
            });
          })
          .catch(error => console.error('Error loading translations:', error));
      }

      // Get the selected language from the cookie
      const selectedLanguage = getCookie('selectedLanguage');

      // Set the initial language based on the cookie
      if (selectedLanguage) {
        const initialLang = languages[selectedLanguage];
        currentLanguageBtn.textContent = initialLang.charAt(0).toUpperCase() + initialLang.slice(1);
        loadLanguage(initialLang);
      } else {
        // Default to English if no cookie is found
        const defaultLang = languages['1'];
        currentLanguageBtn.textContent = defaultLang.charAt(0).toUpperCase() + defaultLang.slice(1);
        loadLanguage(defaultLang);
      }

      // Populate dropdown items
      Object.entries(languages).forEach(([key, value]) => {
        const dropdownItem = document.createElement('a');
        dropdownItem.className = 'dropdown-item text-light';
        dropdownItem.href = '#'; 
        dropdownItem.textContent = value.charAt(0).toUpperCase() + value.slice(1);
        dropdownItem.dataset.languageId = key;

        dropdownItem.addEventListener('click', function(e) {
          e.preventDefault();
          const langId = this.dataset.languageId;
          const langName = languages[langId];

          currentLanguageBtn.textContent = this.textContent;
          localStorage.setItem('selectedLanguage', langId);
          loadLanguage(langName);

          // Send request to set language cookie
          fetch('/set-language', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ language: langName })
          })
          .then(response => response.json())
          .then(data => console.log(data.message))
          .catch(error => console.error('Error setting language cookie:', error));
        });

        dropdownMenu.appendChild(dropdownItem);
      });
    })
    .catch(error => {
      console.error('Error loading language list:', error);
      // Optional: Handle error (show default language, error message, etc.)
    });
});

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    console.log(`Cookie ${name} : ${parts.pop().split(';').shift()}`);
    return parts.pop().split(';').shift();}
  console.log(`Cookie ${name} not found`);
}