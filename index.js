const modal = document.getElementById("modal");
const modalShow = document.getElementById("show-modal");
const modalClose = document.getElementById("close-modal");

const bookmarkForm = document.getElementById("bookmark-form");
const websiteNameEl = document.getElementById("website-title");
const websiteUrlEl = document.getElementById("website-url");
const bookmarksContainer = document.getElementById("bookmark-container");

let bookmarks = [];

// Show modal , Focus On Input;
function showModal() {
    modal.classList.add("show-modal");
    websiteNameEl.focus();
}
modalShow.addEventListener("click", showModal);
modalClose.addEventListener("click", () => modal.classList.remove("show-modal"));
window.addEventListener("click", (e) => (e.target === modal ? modal.classList.remove("show-modal"): false))
 

  function Validate(urlValue, nameValue) {
    const expression =  /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/g;
    const regex = new RegExp(expression);
    if (!urlValue || !nameValue) {
      alert("Fill both field");
      return false;
    }
    if (!urlValue.match(regex)) {
      alert("Enter a valid web Address");
      return false;
    }
    return true;
  };

  // Build Bookmark
  function buildBookmarks() {
    bookmarksContainer.textContent = '';
    // Buid Items
    bookmarks.forEach((bookmarks) =>{
      const {name , url } = bookmarks;
      const item = document.createElement('div');
      item.classList.add('item');
      // Close Icon
      const closeIcon = document.createElement('i');
      closeIcon.classList.add('fas', 'fa-times');
      closeIcon.add
      closeIcon.setAttribute('title', 'Delete Bookmark');
      closeIcon.setAttribute('onclick', `deleteBookmark('${url}')`);
      // Favicon / Link Container
      const linkInfo = document.createElement('div');
      linkInfo.classList.add('name');
      // Favicon
      const favicon = document.createElement('img');
      favicon.setAttribute('src', `https://s2.googleusercontent.com/s2/favicons?domain=${url}`);
      favicon.setAttribute('alt', 'Favicon');
      // Link
      const link = document.createElement('a');
      link.setAttribute('href', `${url}`);
      link.setAttribute('target', '_blank');
      link.textContent = name;
      // Append to bookmarks container
      linkInfo.append(favicon, link);
      item.append(closeIcon, linkInfo);
      bookmarksContainer.appendChild(item);

    });
    
  };


  // Fetch Bookmark
  function fetchBookmarks() {
    // Get the bookmark from local storage
    if (localStorage.getItem("bookmarks")) {
      bookmarks = JSON.parse(localStorage.getItem("bookmarks"));

    }
  //   else{
  //     bookmarks = [
  //       {
  //       name: "Jacinto Design",
  //       url: "https://jacinto.design.com",
  //     },
  //   ];
  //   localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  // }
  buildBookmarks();

};

function deleteBookmark(url) {
  // Loop through the bookmarks array
  bookmarks.forEach((bookmark, i) => {
    if (bookmark.url === url) {
      bookmarks.splice(i, 1);
    }
  });
  bookmarks = localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  fetchBookmarks();
};

// Handle Data rom Form

function storeBookmark(e) {
    e.preventDefault();
    const nameValue  = websiteNameEl.value;
     let urlValue = websiteUrlEl.value;
  if (!urlValue.includes("http://", "https://")) {
    urlValue = `https://${urlValue}`
  };
  if (!Validate(urlValue, nameValue)) {
    return false;
  }
const bookmark = {
  name: nameValue,
    url: urlValue,
}
bookmarks.push(bookmark);
// console.log(bookmarks);
localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
fetchBookmarks(); 
bookmarkForm.reset();
websiteNameEl.focus();


};



bookmarkForm.addEventListener("submit", storeBookmark);

// ON load 
fetchBookmarks();
