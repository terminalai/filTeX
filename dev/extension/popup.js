// Initialize button with users's preferred color
let changeColor = document.getElementById("changeColor");

chrome.storage.sync.get("color", ({ color }) => {
  changeColor.style.backgroundColor = color;
});

// When the button is clicked, inject setPageBackgroundColor into current page
changeColor.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: setPageBackgroundColor,
  });
});

// The body of this function will be executed as a content script inside the
// current page
function setPageBackgroundColor() {
  chrome.storage.sync.get("color", ({ color }) => {

    const amongus_regex = /a\W*m\W*o\W*(n\W*g\W*u\W*s|n\W*g|g\W*u\W*s|n\W*g\W*i|g\W*i)/gim;
    const replacer = (match, offset, string) => {
      return `<span style="border-style: solid; border-width: 3px; border-color: ${color}; border-radius: 2px;">${match}</span>`;
    }
    
    // check function, returns new text
    function filter_text(text) {
      return text.replace(amongus_regex, replacer);
    }

    // create a treewalker to get all text in document
    const tree = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    while (tree.nextNode()) {
      const node = tree.currentNode;
      const text = node.nodeValue;
      node.parentElement.innerHTML = filter_text(node.parentElement.innerHTML);
    }
  });
}
