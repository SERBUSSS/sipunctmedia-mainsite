// Function to initialize timers
function initializeTimers() {
    const timers = document.querySelectorAll('.timer-container');
    
    function updateTimers() {
        const endDate = new Date(2025, 1, 14, 23, 59, 59);
        const now = new Date();
        const timeDifference = endDate - now;
        
        timers.forEach(timer => {
            if (timeDifference <= 0) {
                timer.innerHTML = '<div class="text-center text-[#ff0000] text-3xl font-medium font-serif">Oferta a expirat!</div>';
                return;
            }
            
            const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
            
            timer.querySelector('.days').textContent = days;
            timer.querySelector('.hours').textContent = hours;
            timer.querySelector('.minutes').textContent = minutes;
            timer.querySelector('.seconds').textContent = seconds;
        });
    }

    if (timers.length > 0) {
        setInterval(updateTimers, 1000);
        updateTimers();
    }
}

// Check for timers periodically until found
const timerCheck = setInterval(() => {
    const timers = document.querySelectorAll('.timer-container');
    if (timers.length > 0) {
        clearInterval(timerCheck);
        initializeTimers();
    }
}, 100);
