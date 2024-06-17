const loginFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (email && password) {
    try {
      // Send a POST request to the API endpoint
      const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        // If successful, redirect the browser to the profile page
        document.location.replace('/profile');
      } else {
        // Extract error message from the response
        const result = await response.json();
        alert(result.message || response.statusText);
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('An error occurred while trying to log in.');
    }
  } else {
    alert('Please enter both email and password.');
  }
};

document.querySelector('.login-form').addEventListener('submit', loginFormHandler);
