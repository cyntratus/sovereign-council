export async function onRequest(context) {
  const url = new URL(context.request.url);
  const q = url.searchParams.get('q');
  const apiKey = url.searchParams.get('apiKey');

  if (!q || !apiKey) {
    return new Response(JSON.stringify({ error: 'Missing query or API key' }), { status: 400 });
  }

  // Construct the target URL for NewsAPI
  const targetUrl = `https://newsapi.org/v2/everything?q=${encodeURIComponent(q)}&sortBy=publishedAt&pageSize=3&apiKey=${apiKey}`;

  try {
    // Fetch from NewsAPI using a backend server request
    const response = await fetch(targetUrl, {
      headers: {
        'User-Agent': 'SovereignCouncil/1.0', // NewsAPI prefers a User-Agent header
        'Accept': 'application/json'
      }
    });
    
    const data = await response.json();
    
    // Return the data to your frontend
    return new Response(JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
