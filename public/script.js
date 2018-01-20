// client-side js

document.addEventListener("DOMContentLoaded", () => {
  // get refs to elements
  const urlInput = document.getElementById('urlInput');
  const shortenButton = document.getElementById('shortenButton');
  const shorten_actions = document.getElementById('shorten_actions');
  let apiLink;

  const copyIt = () => {
    const selectedText = window.getSelection().toString();
    const copySuccess = document.execCommand('copy');
    if (copySuccess) {
      console.log('copySuccess');
      urlInput.classList.remove('selected');
      urlInput.classList.add('success');
      urlInput.value = 'Shortened URL copied to clipboard :)';
      console.log(urlInput.value);
    }
  };

  const clearInput = () => {
    urlInput.value = '';
    urlInput.classList.remove('selected', 'error', 'success');
    shorten_actions.classList.remove('visible');
    shortenButton.classList.remove('hidden');
  }

  const getShortenedLink = () => {
    // get value of original link to call API
    const Root_Url = window.location.origin;
    const urlToShorten = document.getElementById('urlInput').value;
    apiLink = `${Root_Url}/new/${urlToShorten}`;

    // call API to get shortened link
    fetch(apiLink)
      .then(res => res.json())
      .then((data) => {
        // handle invalid URLs client side
        if (data.shorterUrl === 'Invalid URL') {
          urlInput.value = `Invalid URL: ${data.originalUrl}`;
          urlInput.classList.add('error');
          shorten_actions.classList.add('visible');
          const close = document.getElementById('clear_active_shorten');
          close.addEventListener("click", clearInput);
          return;
        }
        const shortenedLink = `${Root_Url}/${data.shorterUrl}`;
        urlInput.value = shortenedLink;
        urlInput.focus();
        urlInput.setSelectionRange(0, urlInput.value.length);
        urlInput.classList.add('selected');
        shorten_actions.classList.add('visible');
        const close = document.getElementById('clear_active_shorten');
        const copy = document.getElementById('copy_shortlink');
        close.addEventListener("click", clearInput);
        copy.addEventListener("click", copyIt);
        shortenButton.classList.add('hidden');
        }
      )
      .catch((err) => {
          console.log(err);
      });

  }

  shortenButton.addEventListener("click", getShortenedLink);
});
