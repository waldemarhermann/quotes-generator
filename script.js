// Create const variable for DOM-Manipulation
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const quoteAuthor = document.getElementById('author');
const quoteBtnTwitter = document.getElementById('twitter');
const quoteBtn = document.getElementById('quoteBtn');
const loader = document.getElementById('loader');

// Create array to store quotes from API
let apiQuotes = [];

// Show loading animation
function showLoading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide loading animation
function completeLoading() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}

// Show new quote
function newQuote() {
    showLoading();
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

    // Check if author field is empty an replacing it with "Unknown"
    if (!quote.author) {
        quoteAuthor.textContent = 'Unknown';
    } else {
        quoteAuthor.textContent = quote.author;
    }

    // Check text-length and add classlist: "long-quote" if necessary
    if (quote.text.length > 80) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-list');
    }

    // Set quote
    quoteText.textContent = quote.text;

    // Hide loader
    completeLoading();
}

// Get quotes from API
async function getQuotes() {
    showLoading();
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch (error) {

    }
}

// Tweet quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${quoteAuthor.textContent}`;
    window.open(twitterUrl, '-blank');
}

// Event listener
quoteBtn.addEventListener('click', newQuote);
quoteBtnTwitter.addEventListener('click', tweetQuote);

// On load
getQuotes();
