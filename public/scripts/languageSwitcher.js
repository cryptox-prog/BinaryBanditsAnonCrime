document.addEventListener('DOMContentLoaded', function() {
  const dropdownMenu = document.querySelector('.dropdown-menu');
  const currentLanguageBtn = document.querySelector('#dropdownMenuButton');

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

      // Initialize language
      const savedLang = localStorage.getItem('selectedLanguage') || '1';
      const initialLang = languages[savedLang];
      currentLanguageBtn.textContent = initialLang.charAt(0).toUpperCase() + initialLang.slice(1);
      loadLanguage(initialLang);

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
        });

        dropdownMenu.appendChild(dropdownItem);
      });
    })
    .catch(error => {
      console.error('Error loading language list:', error);
      // Optional: Handle error (show default language, error message, etc.)
    });
});