const observer = new MutationObserver(() => {
    let form = document.getElementById("emailForm");
    if (form) {
        setupForm(form);
        observer.disconnect();
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
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: email })
            });

            const data = await response.json();

            if (response.ok) {
                // Show success modal
                const modal = document.getElementById('success-modal');
                modal.classList.remove('hidden');
                modal.classList.add('flex');
                
                // Clear form
                document.getElementById('email').value = '';
            } else {
                message.innerText = "Eroare: " + (data.error || "Încercați din nou");
                message.style.color = "red";
            }
        } catch (error) {
            message.innerText = "Eroare la conexiune!";
            message.style.color = "red";
        }
    });

    // Close modal functionality
    document.querySelectorAll('[data-modal-hide="success-modal"]').forEach(button => {
        button.addEventListener('click', () => {
            const modal = document.getElementById('success-modal');
            modal.classList.add('hidden');
            modal.classList.remove('flex');
        });
    });
}
