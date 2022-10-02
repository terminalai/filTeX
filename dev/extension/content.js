console.log("FilTeX is working...");

/*
const head = (document.head || document.documentElement);
const style = document.createElement('link');
style.rel = 'stylesheet';
style.type = 'text/css';
style.href = chrome.runtime.getURL('content.css');
console.log(style);
head.appendChild(style);
*/

async function main() {

  function request(url) {
    return new Promise(function(resolve, reject) {
      let xhr = new XMLHttpRequest();
      xhr.open("GET", url);
      xhr.onload = function() {
        if (this.status >= 200 && this.status < 300) {
          resolve(xhr.response);
        } else {
          reject({
            status: this.status,
            statusText: xhr.statusText
          });
        }
      };
      xhr.onerror = function() {
        reject({
          status: this.status,
          statusText: xhr.statusText
        });
      };
      xhr.send();
    });
  }

  let id = 0;

  const amongus_regex = /a\W*m\W*o\W*(n\W*g\W*u\W*s|n\W*g|g\W*u\W*s|n\W*g\W*i|g\W*i)/gim;
  const replacer = (match, offset, string) => {
    id++;
    return `<input type="checkbox" class="check0" id="__check${id}"/><label for="__check${id}" id="__label${id}" class="hide0">${match}</label>`;
  }

  const spoiler_regex = /__SPOILER__(.*?)\/__SPOILER__/g
  const spoiler_replacer = (whole, match) => {
    id++;
    return `<input type="checkbox" class="check0" id="__check${id}"/><label for="__check${id}" id="__label${id}" class="hide0">${match}</label>`;
  }

  // check function, returns new text
  async function filter_text(text) {
    const words = [];
    text.replace(/\w+/g, function(word) {
      words.push(word);
      return word;
    });
    if (words.length > 0) {
      const slur = (await request(`https://hohoho.pythonanywhere.com/isSlurMulti/${words.join(",")}`)).split(",");
      let i = -1;
      text = text.replace(/\w+/g, function(word) {
        i++;
        console.log(slur[i], word);
        if (slur[i] == 1) {
          return `__SPOILER__${word}/__SPOILER__`;
        } else {
          return word;
        }
      });
    }
    return text;
    /*
    const splitted = text.split(" ");
    let word_count = 0;
    for (let i = 0; i < splitted.length; i++) {
      const word = splitted[i].trim();
      if (!word) {
        words.push(" ");
        continue;
      } else {
        word_count++;
        words.push(word);
      }
    }
    if (word_count > 0) {
      const slur = (await request(`https://hohoho.pythonanywhere.com/isSlurMulti/${words.join(",")}`)).split(",");
      for (let i = 0; i < splitted.length; i++) {
        if (slur[i] == 1 && words[i].trim()) {
          splitted[i] = `__SPOILER__${words[i]}/__SPOILER__`;//replacer(t, null, null);
        }
      }
      console.log(words.join(","), slur, splitted.join(" "));
    }
    return splitted.join(" ");
    //return text.replace(amongus_regex, replacer);
    */
  }

  const ignore_types = ["SCRIPT", "NOSCRIPT", "IFRAME", "STYLE", "KBD", "LINK", "META", "CANVAS"];

  const tree_walker_filter = {
    acceptNode: function(node) {
      if (!ignore_types.includes(node.parentNode.nodeName)) {
        return NodeFilter.FILTER_ACCEPT;
      }
    }
  };

  // create a treewalker to get all text in document
  const tree = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, tree_walker_filter, false);
  let prev_node = null;
  while (tree.nextNode()) {
    const node = tree.currentNode;
    if (prev_node != null) {
      const text = prev_node.parentElement.innerHTML;
      const result = text.replace(spoiler_regex, spoiler_replacer);
      if (result !== text) {
        prev_node.parentElement.innerHTML = result;
      }
    }
    console.log(node.nodeValue);
    node.nodeValue = await filter_text(node.nodeValue);
    prev_node = node;
  }

  console.log("FilTeX is done!");
}

window.addEventListener("load", function(event) {
  main();
});