document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('copyButton').addEventListener('click', function() {
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {          
          const markdownLink = getMarkdownLinkFromTab(tabs[0]);          
          copyToClipboard(markdownLink);
      });
  });

  
document.getElementById('copySelectionWithLinkButton').addEventListener('click', function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.scripting.executeScript({
            target: {tabId: tabs[0].id},
            func: getSelection
        }, (res) => {
          let selection = res[0].result;
          if (selection.length > 0) {            
            const markdownLink = getMarkdownLinkFromTab(tabs[0]);
            const markdown = markdownLink + '\n>' + selection;
            copyToClipboard(markdown);
          }
        });
    });   
});

document.getElementById('copySelectionButton').addEventListener('click', function() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.scripting.executeScript({
          target: {tabId: tabs[0].id},
          func: getSelection
      }, (res) => {
        let selection = res[0].result;
        if (selection.length > 0) {            
          const markdown = '>' + selection;
          copyToClipboard(markdown);
        }
      });
  });   
});


function getSelection() {  
  return window.getSelection().toString();  
}

function getMarkdownLinkFromTab(tab) {
  const url = tab.url;
  const title = tab.title;
  const markdownLink = '[' + title + '](' + url + ')';
  return markdownLink;
}

function copyToClipboard(text) {
  navigator.clipboard.writeText(text)
    .then(function() {
        console.log('Link copied to clipboard!');
    })
    .catch(function(error) {
        console.error('Error copying to clipboard:', error);
    });
  }
});