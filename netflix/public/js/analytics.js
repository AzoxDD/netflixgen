// Legitimate-looking analytics script
console.log('Netflix Account Generator loaded');

// Fake analytics function
function trackPageView() {
    console.log('Page viewed: Netflix Generator');
}

// Fake user interaction tracking
document.addEventListener('DOMContentLoaded', function() {
    trackPageView();
    
    // Fake engagement tracking
    let timeOnPage = 0;
    setInterval(() => {
        timeOnPage++;
        if (timeOnPage === 5) {
            console.log('User engaged with page');
        }
    }, 1000);
});

// Fake account generator (frontend only)
window.startGenerator = function() {
    document.getElementById('loading').style.display = 'block';
    document.querySelector('.btn').style.display = 'none';
    
    setTimeout(() => {
        document.querySelector('.container').innerHTML = `
            <h2>❌ All Accounts Claimed</h2>
            <p>All free accounts in your region have been taken.</p>
            <p>Check back in 24 hours for new accounts!</p>
            <button class="btn" onclick="location.reload()">TRY AGAIN LATER</button>
        `;
    }, 3000);
};