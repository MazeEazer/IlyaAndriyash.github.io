// script.js

document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('modal');
    const openModalButton = document.getElementById('open-modal');
    const closeModalButton = document.getElementById('close-modal');
    const feedbackForm = document.getElementById('feedback-form');
    const successMessage = document.getElementById('success-message');
    const errorMessage = document.getElementById('error-message');

    // Восстановление данных из LocalStorage
    const restoreFormData = () => {
        document.getElementById('name').value = localStorage.getItem('name') || '';
        document.getElementById('email').value = localStorage.getItem('email') || '';
        document.getElementById('phone').value = localStorage.getItem('phone') || '';
        document.getElementById('organization').value = localStorage.getItem('organization') || '';
        document.getElementById('message').value = localStorage.getItem('message') || '';
        document.getElementById('consent').checked = localStorage.getItem('consent') === 'true';
    };

    restoreFormData();
    const saveFormData = () => {
        const fields = ['name', 'email', 'phone', 'organization', 'message', 'consent'];
        fields.forEach(field => {
            const element = document.getElementById(field);
            if (element) {
                if (field === 'consent') {
                    localStorage.setItem(field, element.checked);
                } else {
                    localStorage.setItem(field, element.value);
                }
            }
        });
    };

    const formElements = feedbackForm.querySelectorAll('input, textarea');
    formElements.forEach(element => {
        element.addEventListener('input', saveFormData);
    });

    // Открытие попапа
    openModalButton.addEventListener('click', () => {
        modal.classList.add('active');
        history.pushState(null, '', '#feedback');
    });

    // Закрытие попапа
    closeModalButton.addEventListener('click', closeModal);
    window.addEventListener('popstate', closeModal);

    function closeModal() {
        modal.classList.remove('active');
        history.back();
    }
    
    feedbackForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            organization: document.getElementById('organization').value,
            message: document.getElementById('message').value,
            consent: document.getElementById('consent').checked,
        };

        // Отправка данных на сервер
        fetch('https://formcarry.com/s/m1h-mKEGfLX', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
        .then(response => {
            if (response.ok) {
                successMessage.style.display = 'block';
                errorMessage.style.display = 'none';
                // Очистка данных
                feedbackForm.reset();
                localStorage.clear();
            } else {
                errorMessage.style.display = 'block';
                successMessage.style.display = 'none';
            }
        })
        .catch(error => {
            errorMessage.style.display = 'block';
            successMessage.style.display = 'none';
            console.error('Ошибка:', error);
        });
    });
});
