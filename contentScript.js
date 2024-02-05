(() => {
  let counter = 0, tabId;
  const fetchClicks = () => {
    return new Promise((resolve) => {
      chrome.storage.sync.get([tabId], (obj) => {
        console.log(obj);
        resolve(obj?.[tabId]? obj[tabId] : []);
      });
    });
  };

  chrome.runtime.onMessage.addListener((obj, sender, response) => {
    const { type, value } = obj;
    if (type === "NEW") {
      counter = 1;
      tabId = value + '';
      highlightScript(document.body);
    }
  });

  function highlightScript(node) {
    for (let i=0; i<node.children.length; i++) {
      const element = node.children[i];
      if (element.shadowRoot?.host === element) {
        const sheet = new CSSStyleSheet();
        sheet.replaceSync(" .shadow { border: var(--border)}");
        element.shadowRoot.adoptedStyleSheets = [sheet];
        for (let j=0 ;j<element.shadowRoot.children.length;j++) {
          const dom = element.shadowRoot.children[j];
          dom.classList.add('shadow');
          highlightScript(dom);
        }
      }
    }

    if(node.shadowRoot?.host === node) {
      const sheet = new CSSStyleSheet();
      sheet.replaceSync(" .shadow { border: var(--border)}");
      node.shadowRoot.adoptedStyleSheets = [sheet];
      for (let k=0; k<node.shadowRoot.children.length; k++) {
        const dom = node.shadowRoot.children[k];
        dom.classList.add('shadow');
        highlightScript(dom);
      }
    }
  }

  document.addEventListener('click', async (event) => {
    event.preventDefault();
    let target = event.composedPath()[0];
    if (target.classList.contains('shadow')) {
      let clicks = await fetchClicks();
      chrome.storage.sync.set({[tabId] : [...clicks, target.nodeName + "-" + counter++] });
    }
  });
})();