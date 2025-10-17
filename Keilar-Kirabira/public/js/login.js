// Get form and input elements
const loginForm = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

// Function to validate email
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/; // Basic phone number validation
    
    // Check if it's an email or phone number
    return emailRegex.test(email) || phoneRegex.test(email.replace(/\D/g, ''));
}

// Function to validate password (at least 6 characters)
function validatePassword(password) {
    return password.length >= 6;
}

// Function to update input border color
function updateInputBorder(input, isValid) {
    if (isValid) {
        input.style.borderColor = '#4CAF50'; // Green for valid
    } else {
        input.style.borderColor = '#f44336'; // Red for invalid
    }
}

// Real-time validation for email/phone input
emailInput.addEventListener('input', function() {
    const isValid = this.value.trim() !== '' && validateEmail(this.value.trim());
    updateInputBorder(this, isValid);
});

// Real-time validation for password input
passwordInput.addEventListener('input', function() {
    const isValid = this.value.trim() !== '' && validatePassword(this.value.trim());
    updateInputBorder(this, isValid);
});

// Form submission handler
loginForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission
    
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    
    let isFormValid = true;
    
    // Validate email/phone
    if (email === '' || !validateEmail(email)) {
        updateInputBorder(emailInput, false);
        isFormValid = false;
    } else {
        updateInputBorder(emailInput, true);
    }
    
    // Validate password
    if (password === '' || !validatePassword(password)) {
        updateInputBorder(passwordInput, false);
        isFormValid = false;
    } else {
        updateInputBorder(passwordInput, true);
    }
    
    // If form is valid, you can submit it
    if (isFormValid) {
        // Here you would typically send the data to your server
        console.log('Form is valid!');
        console.log('Email/Phone:', email);
        console.log('Password:', password);
        
        // Uncomment the line below to actually submit the form
        // this.submit();
        
        // Show success message or redirect
        alert('Login successful!');
    } else {
        console.log('Form has errors!');
    }
});

// Optional: Add focus and blur event listeners for better UX
emailInput.addEventListener('focus', function() {
    this.style.borderColor = '#2196F3'; // Blue when focused
});

emailInput.addEventListener('blur', function() {
    const isValid = this.value.trim() !== '' && validateEmail(this.value.trim());
    updateInputBorder(this, isValid);
});

passwordInput.addEventListener('focus', function() {
    this.style.borderColor = '#2196F3'; // Blue when focused
});

passwordInput.addEventListener('blur', function() {
    const isValid = this.value.trim() !== '' && validatePassword(this.value.trim());
    updateInputBorder(this, isValid);
});