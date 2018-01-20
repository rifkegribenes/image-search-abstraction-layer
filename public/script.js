// client-side js

document.addEventListener("DOMContentLoaded", () => {
  // get refs to elements
  const searchInput = document.getElementById('searchInput');
  const searchButton = document.getElementById('searchButton');
  const search_actions = document.getElementById('search_actions');
  let apiLink;

  const clearInput = () => {
    searchInput.value = '';
    searchInput.classList.remove('selected', 'error', 'success');
  }

  const search = () => {
    // get search term to call API
    const Root_Url = window.location.origin;
    const searchTerm = document.getElementById('searchInput').value;
    apiLink = `${Root_Url}/api/search/${searchTerm}?offset=10`;
    console.log(apiLink);
    window.location.href = apiLink;

    // // call API
    // fetch(apiLink)
    //   .then(res => {
    //     console.log(res.body);
    //     return res.json();
    //   })
    //   .then((data) => {
    //     console.log(data);
    //     // handle errors client side
    //     if (data.error) {
    //       searchInput.value = `${data.error}`;
    //       searchInput.classList.add('error');
    //       search_actions.classList.add('visible');
    //       const close = document.getElementById('clear_search');
    //       close.addEventListener("click", clearInput);
    //       return;
    //     }

    //     // display results
    //     const shortenedLink = `${Root_Url}/${data.shorterUrl}`;
    //     urlInput.value = shortenedLink;
    //     urlInput.focus();
    //     urlInput.setSelectionRange(0, urlInput.value.length);
    //     urlInput.classList.add('selected');
    //     shorten_actions.classList.add('visible');
    //     const close = document.getElementById('clear_active_shorten');
    //     const copy = document.getElementById('copy_shortlink');
    //     close.addEventListener("click", clearInput);
    //     copy.addEventListener("click", copyIt);
    //     shortenButton.classList.add('hidden');
    //     }
    //   )
    //   .catch((err) => {
    //       console.log(err);
    //   });

  }

  searchButton.addEventListener("click", search);
});
