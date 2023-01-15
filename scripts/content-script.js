function cloneAttributes(element, sourceNode) {
  let attr;
  let attributes = Array.prototype.slice.call(sourceNode.attributes);
  while ((attr = attributes.pop())) {
    element.setAttribute(attr.nodeName, attr.nodeValue);
  }
}

function mutateComposeForm() {
  let form = document.getElementsByClassName("bAs")[0];
  const subjectField = document.getElementsByClassName("aoD az6")[0];
  const contextField = subjectField.cloneNode(true);
  const ctxInput = contextField.children[2];
  let textarea = document.createElement("textarea");
  cloneAttributes(textarea, ctxInput);
  textarea.placeholder = "Provide context for this email";
  textarea.ariaLabel = "Context";
  contextField.replaceChild(textarea, ctxInput);
  form.insertAdjacentHTML("beforeend", contextField.outerHTML);
  const editableArea = document.getElementsByClassName("editable")[0];
  editableArea.innerHTML = "Hello World";
}

window.onload = () => {
  document
    .getElementsByClassName("T-I T-I-KE L3")[0] // Compose button
    .addEventListener("click", (e) => {
      e.preventDefault();
      setTimeout(mutateComposeForm, 1000);
    });
};
