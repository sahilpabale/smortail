// Options for the observer (which mutations to observe)
let config = { childList: true, characterData: true, subtree: true };

// Callback function to execute when mutations are observed
let callback = function (mutationsList) {
  for (var mutation of mutationsList) {
    if (mutation.type === "characterData") {
      console.log("changed:", mutation.target);
      // your function call here
    }
  }
};

// Create an observer instance linked to the callback function
let observer = new MutationObserver(callback);

function cloneAttributes(element, sourceNode) {
  let attr;
  let attributes = Array.prototype.slice.call(sourceNode.attributes);
  while ((attr = attributes.pop())) {
    element.setAttribute(attr.nodeName, attr.nodeValue);
  }
}

function randomEmailContext() {
  const context = [
    "email prime minister to remove crypto taxes",
    "email to get a job at google",
    "email to quit my job",
    "email for some advice",
    "cold email to a content creator",
    "email to a friend",
    "formal email to a professor",
    "apology email to a professor",
    "cold email to a recruiter",
    "business email to a client",
  ];
  return context[Math.floor(Math.random() * context.length)];
}

function mutateComposeForm() {
  let form = document.getElementsByClassName("bAs")[0];
  const subjectField = document.getElementsByClassName("aoD az6")[0];
  const contextField = subjectField.cloneNode(true);
  const editableArea = document.getElementsByClassName("editable")[0];

  contextField.id = "ctx-div";
  contextField.style.display = "flex";
  contextField.style.flexDirection = "row";

  let ctxButton = document.createElement("button");
  ctxButton.id = "ctx-btn";
  ctxButton.innerText = "🚀";
  ctxButton.style.background = "transparent";
  ctxButton.style.border = "transparent";
  ctxButton.style.cursor = "pointer";
  ctxButton.style.fontSize = "x-large";

  [...contextField.children[3].attributes].forEach((attr) =>
    contextField.children[3].removeAttribute(attr.name),
  );
  contextField.children[3].appendChild(ctxButton);

  const ctxInput = contextField.children[2];

  ctxInput.placeholder = randomEmailContext();
  ctxInput.ariaLabel = "Context";

  form.insertAdjacentHTML("beforeend", contextField.outerHTML);
  // observer.observe(textarea, config);
}

window.onload = () => {
  if (document.getElementsByClassName("editable")[0]) {
    mutateComposeForm();
  }
  document
    .getElementsByClassName("T-I T-I-KE L3")[0] // Compose button
    .addEventListener("click", (e) => {
      e.preventDefault();
      setTimeout(mutateComposeForm, 1000);
    });
};

document.addEventListener(
  "click",
  async function (event) {
    // Check if the clicked element is the button
    if (event.target && event.target.id === "ctx-btn") {
      let ctx = document.getElementById("ctx-div").children[2].value;

      if (ctx === "") {
        ctx = randomEmailContext();
      }

      let editableArea = document.getElementsByClassName("editable")[0];

      // send the ctx to backend
      // host the api and then fetch it
      let resp = await (
        await fetch("http://localhost:3000/completion", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: {
            prompt: ctx,
          },
        })
      ).json();

      let data = resp.message;
      // editableArea.innerHTML = message.trim().replace(/\r?\n|\r/g, "<br>");
      editableArea.innerHTML = data;
    }
  },
  false,
);
