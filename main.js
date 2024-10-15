const overlay = document.getElementById('popUpContainer');
const closeButton = document.getElementById('popUpCloseButton')
const Library = document.getElementById('library');
const Input = document.getElementById('name');
const ErrorMsg = document.getElementById('errMsg');

const nameInput = document.getElementById('name')
const authorInput = document.getElementById('author')
const pagesInput = document.getElementById('pages')
      

// Open and close overlay to add book

function popUpForm(){
  overlay.classList.remove('hide');
  overlay.classList.add('show');
}

function closeForm(){
  overlay.classList.remove('show');
  overlay.classList.add('hide');
  clearForm();
}

// Clear all form input

function clearForm(){
  const forms = document.querySelectorAll('.form-input');
  forms.forEach(form => form.value = '');

  const checkBox = document.querySelector('.form-checkbox')
  checkBox.checked = false
}

// Toggle READ/UNREAD

function toggleRead(bookinfo) {

  if(bookinfo.read == true){
    bookinfo.read = false
  } else{
    bookinfo.read = true
  }

  Book()
}

// Check input

function checkInput(bookInfo) {

  x = 0

  if(bookInfo.name == ''){
    nameInput.style.background = 'red';
  }else{
    nameInput.style.background = 'white';
    x += 1
  }

  if(bookInfo.author == ''){
    authorInput.style.background = 'red';
  }else{
    authorInput.style.background = 'white';
    x += 1
  }

  if(bookInfo.pages == ''){
    pagesInput.style.background = 'red';
  }else{
    pagesInput.style.background = 'white';
    x += 1
  }

  if(x === 3){
    return bookInfo.name, bookInfo.author, bookInfo.pages
  }

}

// Remove book from Display

function removeBook(id){
  const index = myLibrary.findIndex(bookinfo => bookinfo.id === id);
  if (index !== -1) {
    myLibrary.splice(index, 1);
    Book();
  }
}

// Content

const myLibrary = [];

function Book() {
    Library.innerHTML = '';

    myLibrary.forEach(bookinfo => {

      const bookDiv = document.createElement('div');
      bookDiv.className = 'bookDiv';
    
      bookDiv.innerHTML = `
          <h3 id="bookName">"${bookinfo.name}"</h3>
          <p id="bookAuthor"> ${bookinfo.author}</p>
          <p id="bookPages">${bookinfo.pages} pages</p>
          <button class="bookDisplayButton" id="readButton" onClick="toggleRead(${bookinfo})"> ${bookinfo.read} </button>
          <button class="bookDisplayButton" id="removeButton" onClick="removeBook('${bookinfo.id}')">Remove</button>
      `;
    
      Library.appendChild(bookDiv);
    });
}

function addBookToLibrary() {

  let id = crypto.randomUUID();
  const name = document.getElementById('name');
  const author = document.getElementById('author');
  const pages = document.getElementById('pages');
  const read = document.getElementById('read');

    var bookInfo = {
      id : id,
      name : name.value,
      author : author.value,
      pages : pages.value,
      read : read.checked
    };

    if(checkInput(bookInfo)){
      myLibrary.push(bookInfo)
      closeForm()
      Book()
    }

    else{
      ErrorMsg.className = 'show'

      setTimeout(function(){
        ErrorMsg.className = 'hide'
        nameInput.style.background = 'white';
        authorInput.style.background = 'white';
        pagesInput.style.background = 'white';
      },1500);
    }
}