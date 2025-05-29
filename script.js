// Hamburger Menu
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when clicking a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Modal for coming soon
function showComingSoonModal() {
    document.getElementById('comingSoonModal').style.display = 'block';
}

function closeComingSoonModal() {
    document.getElementById('comingSoonModal').style.display = 'none';
}

// Close modal when clicking outside the modal content
window.onclick = function(event) {
    var modal = document.getElementById('comingSoonModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
} 