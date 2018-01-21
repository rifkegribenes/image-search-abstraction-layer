// client-side js

document.addEventListener("DOMContentLoaded", () => {
  // get refs to elements
  const searchInput = document.getElementById('searchInput');
  const searchButton = document.getElementById('searchButton');
  const no_results = document.getElementById('no_results');
  const user_stories = document.getElementById('user_stories');
  const search_actions = document.getElementById('search_actions');
  const next = document.getElementById('prev');
  const prev = document.getElementById('next');
  let apiLink;

  const clearInput = () => {
    searchInput.value = '';
    searchInput.classList.remove('selected', 'error', 'success');
  }

  const search = () => {
    // get search term to call API
    const Root_Url = window.location.origin;
    const searchTerm = document.getElementById('searchInput').value;
    apiLink = `${Root_Url}/api/search/${searchTerm}?offset=1`;
    console.log(apiLink);

    // call API to get image results
    fetch(apiLink)
      .then(res => res.json())
      .then((data) => {
        console.log('script.js > 36');
        console.log(data);
        // handle no results
        if (!data) {
          searchInput.value = `Error searching for "${searchTerm}"`;
          searchInput.classList.add('error');
          search_actions.classList.add('visible');
          const close = document.getElementById('clear_active_search');
          close.addEventListener("click", clearInput);
          return;
        }
        // return images


        search_actions.classList.add('visible');
        const close = document.getElementById('clear_active_search');
        close.addEventListener("click", clearInput);
            // window.location.href = apiLink;
        no_results.classList.add('visible');
        user_stories.classList.add('hidden');
        return data;
        }
      )
      .catch((err) => {
        searchInput.value = `Error searching for "${searchTerm}": ${err}`;
        searchInput.classList.add('error');
        return err;
      });








  }

  searchButton.addEventListener("click", search);
});
