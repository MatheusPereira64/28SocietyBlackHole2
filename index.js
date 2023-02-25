// function to save a link to localStorage
function saveLink() {
  // get the link input field and its value
  var linkInput = document.getElementById("linkInput");
  var link = linkInput.value;

  // get the existing links from localStorage or create an empty array
  var links = JSON.parse(localStorage.getItem("links")) || [];

  // add the new link to the array and save it to localStorage
  links.push({ link: link, date: new Date() });
  localStorage.setItem("links", JSON.stringify(links));

  // clear the input field and update the link list
  linkInput.value = "";
  updateLinkList();
}

// function to remove a link from localStorage
function removeLink(index) {
  // get the links from localStorage
  var links = JSON.parse(localStorage.getItem("links")) || [];

  // remove the link at the specified index
  links.splice(index, 1);

  // save the updated links to localStorage
  localStorage.setItem("links", JSON.stringify(links));

  // update the link list
  updateLinkList();
}

function updateLinkList() {
  // get the link list element and the links from localStorage
  var linkList = document.getElementById("linkList");
  var links = JSON.parse(localStorage.getItem("links")) || [];

  // clear the link list
  linkList.innerHTML = "";

  // get the search input and its value
  var searchInput = document.getElementById("searchInput");
  var searchValue = searchInput.value.toLowerCase();

  // get the filter select and its value
  var filterSelect = document.getElementById("filterSelect");
  var filterValue = filterSelect.value;

  // filter the links by search value and/or filter value
  var filteredLinks = links.filter(function(link) {
    if (filterValue === "name") {
      return link.link.toLowerCase().indexOf(searchValue) !== -1;
    } else if (filterValue === "date") {
      return link.date.toLocaleString().toLowerCase().indexOf(searchValue) !== -1;
    } else {
      return true;
    }
  });

  // update the link list with the filtered links
  if (filteredLinks.length > 0) {
    for (var i = 0; i < filteredLinks.length; i++) {
      var link = filteredLinks[i];
      var li = document.createElement("li");
      var linkText = document.createElement("span");
      linkText.textContent = link.link;
      li.appendChild(linkText);
      var dateText = document.createElement("span");
      dateText.textContent = " (" + link.date.toLocaleString() + ")";
      dateText.className = "date";
      li.appendChild(dateText);
      linkList.appendChild(li);

      // add a remove button to each link item
      var removeButton = document.createElement("button");
      removeButton.textContent = "Remove";
      removeButton.setAttribute("data-index", i);
      removeButton.addEventListener("click", function() {
        var index = this.getAttribute("data-index");
        removeLink(index);
      });
      li.appendChild(removeButton);
    }
  } else {
    var li = document.createElement("li");
    li.textContent = "No links found.";
    linkList.appendChild(li);
  }
}

function searchLinks() {
  updateLinkList();
}

// add event listeners to search input and filter select
var searchInput = document.getElementById("searchInput");
searchInput.addEventListener("keyup", searchLinks);

var filterSelect = document.getElementById("filterSelect");
filterSelect.addEventListener("change", searchLinks);

var filterSelect = document.getElementById("filterSelect");
filterSelect.addEventListener("change", searchLinks);

// initialize the link list on page load
updateLinkList();

window.addEventListener('load', function() {
  updateLinkList();
});
