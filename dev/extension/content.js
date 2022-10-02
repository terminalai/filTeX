console.log("Hello World3");

/*
const head = (document.head || document.documentElement);
const style = document.createElement('link');
style.rel = 'stylesheet';
style.type = 'text/css';
style.href = chrome.runtime.getURL('content.css');
console.log(style);
head.appendChild(style);
*/

let id = 0;

const amongus_regex = /a\W*m\W*o\W*(n\W*g\W*u\W*s|n\W*g|g\W*u\W*s|n\W*g\W*i|g\W*i)/gim;
const replacer = (match, offset, string) => {
  id++;
  return `<input type="checkbox" class="check0" id="__check${id}"/><label for="__check${id}" id="__label${id}" class="hide0">${match}</label>`;
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