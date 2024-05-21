document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('loginForm').addEventListener('submit', function(event) {
      event.preventDefault();
      
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;
  
      // Here you can add your authentication logic
      if (username === 'user' && password === 'password') { // example check
        setSession(username);
        window.location.href = 'movies.html';  // Redirect to the home page
      } else {
        alert('Invalid credentials');
      }
    });
  });
  
  function setSession(username) {
    sessionStorage.setItem('username', username);
  }
  
  function getSession() {
    return sessionStorage.getItem('username');
  }
  
  function clearSession() {
    sessionStorage.removeItem('username');
  }
  