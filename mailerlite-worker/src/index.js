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
  
		const API_KEY = env.MAILERLITE_API_KEY; // API Key este protejat în variabile de mediu
		const GROUP_ID = env.MAILERLITE_GROUP_ID;
  
		const response = await fetch("https://connect.mailerlite.com/api/subscribers", {
		  method: "POST",
		  headers: {
			"Content-Type": "application/json",
			"Authorization": `Bearer ${API_KEY}`
		  },
		  body: JSON.stringify({
			email: email,
			groups: [GROUP_ID]
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
  