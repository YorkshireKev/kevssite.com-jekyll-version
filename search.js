document.getElementById("search-input").oninput = function() {
  var searchText = document.getElementById("search-input").value;
  if (searchText.length > 2) {
    var searchResults = [],
      searchHit,
      ix;

    for (ix = searchData.length - 1; ix >= 0; ix--) {
      searchHit = searchData[ix].title.toLowerCase().indexOf(searchText);
      if (searchHit != -1) {
        searchResults.push(searchData[ix]);
        continue;
      }
      if (searchText.length > 4) {
        searchHit = searchData[ix].content.toLowerCase().indexOf(searchText);
        if (searchHit != -1) {
          searchResults.push(searchData[ix]);
        }
      }
    }

    document.getElementById("search-results").innerHTML = '';
    for (ix = searchResults.length - 1; ix >= 0; ix--) {
      document.getElementById("search-results").innerHTML += '<li><a href="' + searchResults[ix].url + '">' + searchResults[ix].title + '</a></li>';
    }

    if (document.getElementById("search-results").innerHTML.length === 0) {
      document.getElementById("search-results").innerHTML = '<li>no search results</li>';
    }

  } else {
    document.getElementById("search-results").innerHTML = '';
  }
}