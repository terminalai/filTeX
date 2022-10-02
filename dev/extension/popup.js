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

function insertCSS(css) {
  let head = document.head || document.getElementsByTagName('head')[0],
      style = document.createElement('style');

  head.appendChild(style);

  style.type = 'text/css';
  if (style.styleSheet){
    // This is required for IE8 and below.
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

// The body of this function will be executed as a content script inside the current page
function setPageBackgroundColor() {
  if (window.__once) return;
  chrome.storage.sync.get("color", ({ color }) => {
    // insert css
    /*
    const head = (document.head || document.documentElement);
    const style = document.createElement('link');
    style.rel = 'stylesheet';
    style.type = 'text/css';
    style.href = chrome.runtime.getURL("/content.css");
    head.appendChild(style);
    */

    let id = 0;

    const amongus_regex = /a\W*m\W*o\W*(n\W*g\W*u\W*s|n\W*g|g\W*u\W*s|n\W*g\W*i|g\W*i)/gim;
    const replacer = (match, offset, string) => {
      id++;
      return `<input type="checkbox" class="check0" id="__check${id}"/><label for="__check${id}" id="__label${id}" style="border-color: ${color};" class="hide0">${match}</label>`;
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
  window.__once = true;
}
