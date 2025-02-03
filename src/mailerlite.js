const observer = new MutationObserver(() => {
    let form = document.getElementById("emailForm");
    if (form) {
        console.log("Formularul a fost găsit!");
        setupForm(form);
        observer.disconnect(); // Oprire observare după ce a fost găsit
    }
});

observer.observe(document.body, { childList: true, subtree: true });

function setupForm(form) {
    form.addEventListener("submit", async function(e) {
        e.preventDefault();
        let email = document.getElementById("email").value;
        let message = document.getElementById("message");

        try {
            let response = await fetch("https://mailerlite-worker.s1-bustiuc.workers.dev", {
                method: "POST",
                mode: "cors", // 🔹 Adaugă această opțiune
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
}
