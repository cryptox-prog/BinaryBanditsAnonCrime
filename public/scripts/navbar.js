// navbar.js

// Function to create and inject the navbar
function createNavbar() {
    const navbar = `
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <div class="container-fluid">
                <!-- Brand Name -->
                <a class="navbar-brand" href="index.html">Binary Bandits</a>
                <!-- Toggle Button for Mobile -->
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <!-- Nav Items -->
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav ms-auto">
                        <li class="nav-item">
                            <a class="nav-link" href="home.html">Home</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="report-form.html">Report</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="case-tracker.html">Case Tracker</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    `;

    // Inject the navbar into the body at the beginning
    document.body.insertAdjacentHTML('afterbegin', navbar);
}

// Call the function to create the navbar
createNavbar();