async function checkEmail(email) {
  const apiKey = process.env.HIBP_API_KEY;
  const url = `https://haveibeenpwned.com/api/v3/breachedaccount/${encodeURIComponent(email)}`;

  const headers = {
    'hibp-api-key': apiKey,
    'user-agent': 'LeakMonitor MVP'
  };

  const domain = email.split('@')[1];

  try {
    const response = await axios.get(url, { headers });
    return {
      breached: true,
      breaches: response.data,
      domain: domain
    };
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return {
        breached: false,
        breaches: [],
        domain: domain
      };
    }
    throw error;
  }
}

module.exports = { checkEmail };
