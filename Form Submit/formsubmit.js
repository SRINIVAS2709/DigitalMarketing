// 1. Modal logic to open and close
function openModal(formType) {
    const modal = document.getElementById('modal');
    const scheduleForm = document.querySelector('.schedule-call-form');
    const quoteForm = document.querySelector('.quote-form');

    if (formType === 'schedule') {
        scheduleForm.style.display = 'block';
        quoteForm.style.display = 'none';
    } else {
        scheduleForm.style.display = 'none';
        quoteForm.style.display = 'block';
    }

    modal.style.display = 'flex';
}

document.addEventListener('DOMContentLoaded', function () {
    // 2. Close modal on "X" click
    const modalClose = document.querySelector('.modal .close');
    if (modalClose) {
        modalClose.addEventListener('click', () => {
            document.getElementById('modal').style.display = 'none';
        });
    }

    // 3. Close modal on outside click
    window.addEventListener('click', function (e) {
        const modal = document.getElementById('modal');
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    const scriptURL = 'https://script.google.com/macros/s/AKfycbzqb7HjEfLQAKgUBDrvAS9Z6BCzGpEwaDrpmKdIZ5R6Hb7Hx5jV9spiy0v64VXNaCXY/exec';

    document.getElementById('scheduleForm').addEventListener('submit', function (e) {
        e.preventDefault();
        const data = {
            formType: 'schedule',
            name: document.getElementById('call-name').value,
            phone: document.getElementById('call-phone').value,
            date: document.getElementById('call-date').value
        };
        sendToSheet(data, 'scheduleForm');
    });

    document.getElementById('quoteForm').addEventListener('submit', function (e) {
        e.preventDefault();
        const data = {
            formType: 'quote',
            name: document.getElementById('quote-name').value,
            email: document.getElementById('quote-email').value,
            phone: document.getElementById('quote-phone').value
        };
        sendToSheet(data, 'quoteForm');
    });

    function sendToSheet(data, formId) {
        const form = document.getElementById(formId);
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;

        submitBtn.textContent = 'Submitting...';
        submitBtn.disabled = true;

        fetch(scriptURL, {
            method: 'POST',
            body: new URLSearchParams(data)
        })
            .then(response => {
                alert('Submitted successfully!');
                form.reset();
                document.getElementById('modal').style.display = 'none';
            })
            .catch(error => {
                alert('Error: ' + error.message);
            })
            .finally(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            });
    }
});