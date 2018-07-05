(function() {

  function addBookmarks(bookmarks, className) {
    const ul = document.createElement('ul');
    ul.className = className;
    bookmarks.forEach(function(bookmark) {
      const li = document.createElement('li');
      if (bookmark.children && bookmark.children.length) {
        li.textContent = bookmark.title;
        ul.appendChild(li);
        ul.appendChild(addBookmarks(bookmark.children, "dropdown"));
        ul.addEventListener('click', () => {
          bookmark.children.forEach((bookmark) => {
            if (bookmark.url) {
              chrome.tabs.create({ url: bookmark.url });
            }
          });
        });
      } else {
        const a = document.createElement('a');
        a.href = bookmark.url;
        a.textContent = bookmark.title;
        li.appendChild(a);
        ul.appendChild(li);
      }
    });
    return ul;
  }

  chrome.bookmarks.getTree(function(results) {
    document.getElementById('bookmarks').appendChild(addBookmarks(results[0].children));
  });

}());
