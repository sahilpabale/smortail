document.getElementById("summarizeBtn").addEventListener("click", summarize);

function summarize() {
  // Get the current tab
  // Do an api call with the url to https://sumrz-api.onrender.com/api/summarize
  // Display the summary in the popup

  document.getElementById("summarizeBtn").innerHTML = "thinking...";

  document.getElementById("summarizeBtn").disabled = true;
  document.getElementById("summarizeBtn").style.backgroundColor = "#7e7a7a";
  document.getElementById("summarizeBtn").style.color = "white";

  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    let activeTab = tabs[0];
    let url = activeTab.url;
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "https://sumrz-api.onrender.com/api/summarize", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify({ url: url }));
    xhr.onload = function () {
      if (xhr.status === 200) {
        let summary = JSON.parse(xhr.responseText).summary;
        chrome.tabs.create({
          url: `summary.html?summary=${summary}`,
        });
      } else if (xhr.status === 500) {
        // remove the summarizeBtn button and insert a meaningfull error message in the p tag of id error

        document.getElementById("error").innerHTML =
          "🚨 I am sorry, I could not summarize this page.";
        document.getElementById("summarizeBtn").style.display = "none";
      }
    };
  });
}
