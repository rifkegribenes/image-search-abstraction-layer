// client-side js

document.addEventListener("DOMContentLoaded", () => {
  // get refs to elements
  const searchInput = document.getElementById('searchInput');
  const searchButton = document.getElementById('searchButton');
  const no_results = document.getElementById('no_results');
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
    apiLink = `${Root_Url}/api/search/${searchTerm}?offset=10`;
    console.log(apiLink);
    window.location.href = apiLink;
    no_results.classList.add('visible');
  }

  searchButton.addEventListener("click", search);
});
