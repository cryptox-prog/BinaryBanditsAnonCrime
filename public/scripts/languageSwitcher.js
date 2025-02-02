document.addEventListener('DOMContentLoaded', function() {
  // If no language cookie exists, create and show the modal
  const lang = getCookie('selectedLanguage');
  if (!lang) {
    createLanguageModal();
    populateLanguageDropdown();
    attachSubmitHandler();
    const languageModal = new bootstrap.Modal(document.getElementById('languagePopup'));
    languageModal.show();
  } else {
    applyTranslations(lang);
  }
});

// Dynamically create the modal HTML and append to document body
function createLanguageModal() {
  const modalHTML = `
    <div class="modal fade" id="languagePopup" tabindex="-1" aria-labelledby="languageModalLabel" aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content bg-dark text-white">
          <div class="modal-header">
            <h5 class="modal-title" id="languageModalLabel" data-translate-key="select-language-header">Select Language</h5>
          </div>
          <div class="modal-body">
            <select class="form-select bg-dark text-white" id="languageSelect">
              <!-- Options will be populated dynamically -->
            </select>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" id="languageSubmit">Submit</button>
          </div>
        </div>
      </div>
    </div>`;
  document.body.insertAdjacentHTML('beforeend', modalHTML);
}

// Attach the click event listener to the dynamically added submit button
function attachSubmitHandler() {
  document.getElementById('languageSubmit').addEventListener('click', function() {
    const lang = document.getElementById('languageSelect').value.split(' ')[0].toLowerCase();
    setLanguage(lang);
  });
}

// Function to get cookie value by name
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop().split(';').shift();
  }
  return null;
}

// Save the selected language in a cookie, hide the modal, and apply translations
function setLanguage(lang) {
  const date = new Date();
  date.setFullYear(date.getFullYear() + 1);
  document.cookie = `selectedLanguage=${lang}; expires=${date.toUTCString()}; path=/`;
  
  const modalElement = document.getElementById('languagePopup');
  const modalInstance = bootstrap.Modal.getInstance(modalElement);
  if (modalInstance) modalInstance.hide();
  
  applyTranslations(lang);
}

// Load translation JSON based on language and update all elements with a data-translate-key attribute
async function applyTranslations(lang) {
  try {
    const response = await fetch(`../lang/${lang}.json`);
    const translations = await response.json();
    document.querySelectorAll('[data-translate-key]').forEach(el => {
      const key = el.getAttribute('data-translate-key');
      if (translations[key]) {
        el.textContent = translations[key];
      }
    });
  } catch (error) {
    console.error('Error loading translations:', error);
  }
}

// Populate the language dropdown by fetching the JSON file and adding dark mode classes
function populateLanguageDropdown() {
  fetch('../lang/languageList.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      const languageSelect = document.getElementById('languageSelect');
      // Clear any existing options
      languageSelect.innerHTML = '';

      // Loop through the JSON object and create dark-mode styled option elements
      Object.keys(data).forEach(key => {
        const language = data[key];
        const option = document.createElement('option');
        option.value = language;
        // Capitalize the first letter
        option.textContent = language.charAt(0).toUpperCase() + language.slice(1);
        // Add dark mode classes to option
        option.classList.add('bg-dark', 'text-white');
        languageSelect.appendChild(option);
      });
    })
    .catch(error => console.error('Error fetching language list:', error));
}
