const form = document.getElementById('signupForm');
const fullName = document.getElementById('fullName');
const email = document.getElementById('email');
const phone = document.getElementById('phone');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmPassword');
const successMessage = document.getElementById('successMessage');

// Real-time validation
fullName.addEventListener('input', () => {
    validateField(fullName, fullName.value.trim().length > 0);
});

email.addEventListener('input', () => {
    validateField(email, validateEmail(email.value));
});

phone.addEventListener('input', () => {
    validateField(phone, phone.value.trim().length > 0);
});

password.addEventListener('input', () => {
    validateField(password, password.value.length >= 6);
    if (confirmPassword.value) {
        validateField(confirmPassword, password.value === confirmPassword.value);
    }
});

confirmPassword.addEventListener('input', () => {
    validateField(confirmPassword, password.value === confirmPassword.value);
});

// Validate single field
function validateField(field, isValid) {
    if (field.value === '') {
        field.classList.remove('valid', 'invalid'); // reset if empty
    } else if (isValid) {
        field.classList.remove('invalid');
        field.classList.add('valid');
    } else {
        field.classList.remove('valid');
        field.classList.add('invalid');
    }
}

// Validate email
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Handle form submission
form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Check all fields
    const isFullNameValid = fullName.value.trim().length > 0;
    const isEmailValid = validateEmail(email.value);
    const isPhoneValid = phone.value.trim().length > 0;
    const isPasswordValid = password.value.length >= 6;
    const isConfirmPasswordValid = password.value === confirmPassword.value;

    // Apply validation styles (this ensures borders show up even without typing)
    validateField(fullName, isFullNameValid);
    validateField(email, isEmailValid);
    validateField(phone, isPhoneValid);
    validateField(password, isPasswordValid);
    validateField(confirmPassword, isConfirmPasswordValid);

    // Success if all are valid
    if (isFullNameValid && isEmailValid && isPhoneValid && isPasswordValid && isConfirmPasswordValid) {
        successMessage.classList.add('show');

        // Reset form
        form.reset();

        // Remove validation colors
        document.querySelectorAll('input').forEach(input => {
            input.classList.remove('valid', 'invalid');
        });
    }
});

// Close success message
function closeMessage() {
    successMessage.classList.remove('show');
}
