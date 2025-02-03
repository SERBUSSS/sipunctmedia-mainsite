document.getElementById("emailForm").addEventListener("submit", async function(e) {
    e.preventDefault(); // 🔹 Oprește reîncărcarea paginii

    let email = document.getElementById("email").value;
    let message = document.getElementById("message");

    try {
        let response = await fetch("https://mailerlite-worker.s1-bustiuc.workers.dev", { // 🔹 Pune URL-ul real
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: email })
        });

        if (response.ok) {
            message.innerText = "Te-ai abonat cu succes!";
            message.style.color = "green";
        } else {
            let errorData = await response.json();
            message.innerText = "Eroare: " + errorData.message;
            message.style.color = "red";
        }
    } catch (error) {
        message.innerText = "Eroare la conexiune!";
        message.style.color = "red";
    }
});