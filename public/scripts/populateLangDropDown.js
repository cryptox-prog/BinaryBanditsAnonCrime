document.addEventListener('DOMContentLoaded', function() {
    const dropdownMenu = document.querySelector('.dropdown-menu');
    const currentLanguageBtn = document.querySelector('#dropdownMenuButton');

    // Fetch language data from JSON file
    fetch('../lang/languageList.json')
        .then(response => response.json())
        .then(languages => {
        // Populate dropdown items
        Object.entries(languages).forEach(([key, value]) => {
            const dropdownItem = document.createElement('a');
            dropdownItem.className = 'dropdown-item text-light';
            dropdownItem.href = '#';
            dropdownItem.textContent = value.charAt(0).toUpperCase() + value.slice(1);
            dropdownItem.dataset.languageId = key;
            
            dropdownItem.addEventListener('click', function(e) {
            e.preventDefault();
            currentLanguageBtn.textContent = this.textContent;
            });

            dropdownMenu.appendChild(dropdownItem);
        });})
        .catch(error => {
        console.error('Error loading language data:', error);
        // Optional: Add fallback content or error message
    });
});