// Get the query string from the URL
const queryString = window.location.search;

// Create a URLSearchParams object from the query string
const params = new URLSearchParams(queryString);

// Get the value of the "summary" parameter
const summary = params.get("summary");

// Display the summary in the page
document.getElementById("summary").innerHTML = summary;
