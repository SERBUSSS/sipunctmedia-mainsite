export default {
	async fetch(request, env, ctx) {
	  if (request.method !== "POST") {
		return new Response("Use POST method", { status: 405 });
	  }
  
	  try {
		const { email } = await request.json();
		if (!email) {
		  return new Response("Email is required", { status: 400 });
		}
  
		const response = await fetch("https://connect.mailerlite.com/api/subscribers", {
		  method: "POST",
		  headers: {
			"Content-Type": "application/json",
			"Authorization": `Bearer ${env.MAILERLITE_API_KEY}`
		  },
		  body: JSON.stringify({
			email: email,
			groups: [env.MAILERLITE_GROUP_ID]
		  })
		});
  
		if (response.ok) {
		  return new Response("Success", { status: 200 });
		} else {
		  const error = await response.json();
		  return new Response(`Error: ${error.message}`, { status: response.status });
		}
  
	  } catch (error) {
		return new Response(`Server error: ${error.message}`, { status: 500 });
	  }
	}
};
  
