function toggleMenu() {
    const menu = document.querySelector('.navbar .menu');
    menu.classList.toggle('active');
}

const readMoreBtn = document.getElementById('read-more-btn');
const shortText = document.getElementById('short-text');
const fullText = document.getElementById('full-text');

readMoreBtn.addEventListener('click', function () {
    if (fullText.style.display === 'none') {
        fullText.style.display = 'block';
        shortText.style.display = 'none';
        readMoreBtn.textContent = 'Read Less';
    } else {
        fullText.style.display = 'none';
        shortText.style.display = 'block';
        readMoreBtn.textContent = 'Read More';
    }
});

