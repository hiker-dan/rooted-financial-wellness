/*
 * Contact Form Handling
 *
 * Client-side validation and Formspree integration.
 * Validates required fields, shows error messages,
 * and handles form submission with loading/success/error states.
 */

document.addEventListener('DOMContentLoaded', function() {
  var form = document.getElementById('contact-form');
  if (!form) return;

  var submitBtn = document.getElementById('submit-btn');
  var formStatus = document.getElementById('form-status');

  form.addEventListener('submit', function(event) {
    // Clear previous status
    formStatus.className = 'form-status';
    formStatus.style.display = 'none';
    formStatus.textContent = '';

    // Validate
    var isValid = validateForm(form);
    if (!isValid) {
      event.preventDefault();
      return;
    }

    // If using Formspree, let the form submit naturally
    // For AJAX submission (better UX), uncomment below:

    event.preventDefault();

    // Show loading state
    submitBtn.classList.add('loading');
    submitBtn.textContent = 'Sending...';

    // Submit via fetch
    var formData = new FormData(form);

    fetch(form.action, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    })
    .then(function(response) {
      submitBtn.classList.remove('loading');
      submitBtn.textContent = 'Send Message';

      if (response.ok) {
        formStatus.className = 'form-status success';
        formStatus.style.display = 'block';
        formStatus.textContent = 'Thank you! Your message has been sent. I\'ll get back to you within 1-2 business days.';
        form.reset();
        clearErrors(form);
      } else {
        formStatus.className = 'form-status error';
        formStatus.style.display = 'block';
        formStatus.textContent = 'Something went wrong. Please try again or email me directly.';
      }
    })
    .catch(function() {
      submitBtn.classList.remove('loading');
      submitBtn.textContent = 'Send Message';
      formStatus.className = 'form-status error';
      formStatus.style.display = 'block';
      formStatus.textContent = 'Something went wrong. Please try again or email me directly.';
    });
  });

  // Real-time validation on blur
  var requiredFields = form.querySelectorAll('[required]');
  requiredFields.forEach(function(field) {
    field.addEventListener('blur', function() {
      validateField(field);
    });

    // Clear error on input
    field.addEventListener('input', function() {
      if (field.classList.contains('error')) {
        field.classList.remove('error');
        var errorMsg = field.parentElement.querySelector('.error-message');
        if (errorMsg) {
          errorMsg.textContent = '';
          errorMsg.style.display = 'none';
        }
      }
    });
  });
});

function validateForm(form) {
  var isValid = true;
  var requiredFields = form.querySelectorAll('[required]');

  requiredFields.forEach(function(field) {
    if (!validateField(field)) {
      isValid = false;
    }
  });

  // Focus first error field
  if (!isValid) {
    var firstError = form.querySelector('.error');
    if (firstError) {
      firstError.focus();
    }
  }

  return isValid;
}

function validateField(field) {
  var errorMsg = field.parentElement.querySelector('.error-message');
  var value = field.value.trim();

  // Check empty
  if (!value) {
    showError(field, errorMsg, 'This field is required.');
    return false;
  }

  // Check email format
  if (field.type === 'email') {
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      showError(field, errorMsg, 'Please enter a valid email address.');
      return false;
    }
  }

  // Valid
  clearFieldError(field, errorMsg);
  return true;
}

function showError(field, errorMsg, message) {
  field.classList.add('error');
  if (errorMsg) {
    errorMsg.textContent = message;
    errorMsg.style.display = 'block';
  }
}

function clearFieldError(field, errorMsg) {
  field.classList.remove('error');
  if (errorMsg) {
    errorMsg.textContent = '';
    errorMsg.style.display = 'none';
  }
}

function clearErrors(form) {
  var errorFields = form.querySelectorAll('.error');
  errorFields.forEach(function(field) {
    field.classList.remove('error');
  });
  var errorMsgs = form.querySelectorAll('.error-message');
  errorMsgs.forEach(function(msg) {
    msg.textContent = '';
    msg.style.display = 'none';
  });
}
