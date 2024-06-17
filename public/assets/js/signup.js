const signupFormHandler = async (event) => {
    event.preventDefault();
  
    // Collect values from the signup form
    const name = document.querySelector('#name-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
  
    if (name && email && password) {
      try {
        // Send a POST request to the API endpoint
        const response = await fetch('/api/users/signup', {
          method: 'POST',
          body: JSON.stringify({ name, email, password }),
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
        console.error('Error during signup:', error);
        alert('An error occurred while trying to sign up.');
      }
    } else {
      alert('Please enter your name, email, and password.');
    }
  };
  
  document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);
  