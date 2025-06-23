document.getElementById('checkForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value.trim();
  const resultDiv = document.getElementById('result');
  resultDiv.innerHTML = '';

  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!emailPattern.test(email)) {
    resultDiv.innerHTML = `<p style="color: orange;">Please enter a valid email address.</p>`;
    return;
  }

  resultDiv.innerHTML = `<div class="spinner"></div><p>Checking...</p>`;

  try {
    const response = await fetch('/check', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });
    const data = await response.json();

    if (data.breached) {
      resultDiv.innerHTML = `
        <p style="color:red;">Your email was found in breaches for domain <strong>${data.domain}</strong>:</p>
        <ul>${data.breaches.map(b => `<li>${b.Name} (${b.BreachDate})</li>`).join('')}</ul>`;
    } else {
      resultDiv.innerHTML = `<p style="color:green;">Your email with domain <strong>${data.domain}</strong> was NOT found in known breaches.</p>`;
    }
  } catch (err) {
    console.error('Error:', err);
    resultDiv.textContent = 'Error checking email.';
  }
});
