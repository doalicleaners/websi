document.addEventListener('DOMContentLoaded', () => {
    const tabLinks = document.querySelectorAll('.nav-tab-link');
    const tabContents = document.querySelectorAll('.tab-content');

    // Tab switching logic
    tabLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            // Remove active class from all links and content
            tabLinks.forEach(l => l.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            // Add active class to the clicked link
            link.classList.add('active');

            // Show the corresponding tab content
            const targetTabId = link.dataset.tab;
            document.getElementById(targetTabId).classList.add('active');

            // Scroll to the top of the newly activated tab content, or just scroll to top of viewport
            document.getElementById(targetTabId).scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });

    // Testimonial related elements
    const testimonialForm = document.getElementById('testimonialForm');
    const testimonialGrid = document.getElementById('testimonialGrid');

    // --- Testimonial Persistence Logic ---

    // 1. Initialize testimonials array from localStorage or as an empty array
    // We use JSON.parse to convert the string back into a JavaScript array.
    // If 'testimonials' isn't in localStorage, it will be null, so we default to an empty array.
    let testimonials = JSON.parse(localStorage.getItem('doaliTestimonials')) || [];

    // 2. Function to render all testimonials from the 'testimonials' array
    function renderTestimonials() {
        testimonialGrid.innerHTML = ''; // Clear existing testimonials to prevent duplicates on re-render

        // Loop through the testimonials array and create DOM elements for each
        testimonials.forEach(testimonial => {
            const newTestimonial = document.createElement('div');
            newTestimonial.classList.add('testimonial-item');

            let starHtml = '';
            // Generate star images based on the testimonial's rating
            for (let i = 0; i < testimonial.rating; i++) {
                starHtml += '<img src="https://img.icons8.com/emoji/24/star-emoji.png" alt="Star">';
            }

            // Populate the new testimonial item's HTML
            newTestimonial.innerHTML = `
                <p class="quote">"${testimonial.quote}"</p>
                <div class="rating">
                    ${starHtml}
                </div>
                <p class="author">- ${testimonial.name}</p>
            `;

            // Add the new testimonial to the grid, prepending it to show newest first
            testimonialGrid.prepend(newTestimonial);
        });
    }

    // 3. Call renderTestimonials when the page loads to display existing testimonials
    renderTestimonials();

    // 4. Event listener for submitting a new testimonial
    testimonialForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent default form submission

        const name = document.getElementById('testimonialName').value.trim(); // .trim() removes leading/trailing whitespace
        const rating = parseInt(document.getElementById('testimonialRating').value);
        const quote = document.getElementById('testimonialQuote').value.trim();

        // Simple validation
        if (name && quote && rating) {
            // Create a new testimonial object with the submitted data
            const newTestimonialData = {
                name: name,
                rating: rating,
                quote: quote
            };

            // Add the new testimonial to the beginning of our 'testimonials' array
            testimonials.unshift(newTestimonialData);

            // Save the updated array back to localStorage
            // We use JSON.stringify to convert the JavaScript array into a JSON string for storage.
            localStorage.setItem('doaliTestimonials', JSON.stringify(testimonials));

            // Re-render all testimonials to include the newly added one
            renderTestimonials();

            // Clear the form fields
            testimonialForm.reset();
            alert('Thank you for your testimonial! It has been added.');
        } else {
            alert('Please fill in all fields to submit your testimonial.');
        }
    });
}); 