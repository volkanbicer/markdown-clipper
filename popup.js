document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('copyButton').addEventListener('click', function() {
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        const url = tabs[0].url;
        const title = tabs[0].title;
        const markdownLink = '[' + title + '](' + url + ')';
  
        navigator.clipboard.writeText(markdownLink)
          .then(function() {
            console.log('Link copied to clipboard!');
          })
          .catch(function(error) {
            console.error('Error copying to clipboard:', error);
          });
      });
    });
  });