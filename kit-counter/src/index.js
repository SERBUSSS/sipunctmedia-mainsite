/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export default {
	async fetch(request, env) {
	  const url = new URL(request.url);
  
	  // 📌 GET Request: Retrieve available slots
	  if (request.method === "GET") {
		let slots = await env.KIT_COUNTDOWN.get("availableSlots");
		return new Response(JSON.stringify({ availableSlots: slots || 10 }), {
		  headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
		});
	  }
  
	  // 📌 POST Request: Update slots when a purchase happens
	  if (request.method === "POST") {
		const { event } = await request.json();
		let slots = await env.KIT_COUNTDOWN.get("availableSlots");
		slots = slots ? parseInt(slots) : 10;
  
		if (event === "order.created" && slots > 0) {
		  slots -= 1;
		} else if (event === "order.refunded") {
		  slots += 1;
		}
  
		await env.KIT_COUNTDOWN.put("availableSlots", slots);
		return new Response(`✅ Slots remaining: ${slots}`);
	  }
  
	  return new Response("Method Not Allowed", { status: 405 });
	}
  };
  
