//dark and light mood of the page

document.getElementById("dark").onclick = (e) => {
  
  document.body.style.background = "black"
  document.getElementById("row").style.backgroundColor = "grey"
}
document.getElementById("Light").onclick = () => {
  document.body.style.background = "white"
  document.getElementById("row").style.backgroundColor = "#556298"
}

// Function to add a book to the library
let c
let library = JSON.parse(localStorage.getItem('library')) || []
function showPopup() {
  document.querySelector(".popup").style.display = "block";
}
document.querySelector(".close").onclick = function () {
  document.querySelector(".popup").style.display = "none";
}
function myNewFunction(sel) {
  c = sel.options[sel.selectedIndex].text
}
function addBooksObj(name,book,a,checked){
  const myObj = {
    Name: name,
    Book: book,
    Isbn: a,
    Reserved: checked,
    Placed_at:c,
    Serial: library.length
  }
  library.push(myObj);
  localStorage.setItem('library', JSON.stringify(library));
}
let checkIsbn = (isbn) => {

  for (let index = 0; index < library.length; index++) {
    let data = localStorage.getItem(`library`);
    let json = JSON.parse(data);
    if (isbn === json[index].Isbn) {
      alert("OOP! ISBN already allotted, try another");
      let newone = prompt("Enter new ISBN");
      while (newone === "") {
        newone = prompt("Enter new ISBN");
      }
      checkIsbn(newone);
      return newone;
    }
  }
  return isbn;
};
document.getElementById("submit").addEventListener("click", () => {
 
  const name = document.getElementById("name").value
  const book = document.getElementById("book_name").value
  let isbn = document.getElementById("isbn").value
  let a = checkIsbn(isbn);
  if (name === "" || book === "" || a === "" || c === "") {
    alert("Please enter all the required information.");
    return;
  }
  const checked = document.getElementById("reserved").checked
  addBooksObj(name,book,a,checked)
});


//For displaying book on the screen
document.querySelectorAll(".close")[1].onclick = function () {
  document.querySelector(".popupdisplay").style.display = "none";
}
function showPopupdisplay() {
  document.querySelector(".popupdisplay").style.display = "block";
  let table=document.getElementById("table")
  table.innerHTML=""
  table.innerHTML = `
    <tr>
      <th>Serial</th>
      <th>Book</th>
      <th>Name</th>
      <th>ISBN</th>
      <th>Reserved</th>
      <th>Place</th>
    </tr>
  `;
  ihtml=""
  for (let index = 0; index < library.length; index++) {
    let data = localStorage.getItem(`library`);
    let json = JSON.parse(data);
  
  ihtml+=`
  <tr>
  <td>${json[index].Serial=index}</td>
  <td>${json[index].Book}</td>
  <td>${json[index].Name}</td>
  <td>${json[index].Isbn}</td>
  <td>${json[index].Reserved}</td>
  <td>${json[index].Placed_at}</td>
</tr>
  `
}
table.innerHTML+=ihtml
}


//For deleting the books
document.querySelectorAll(".close")[2].onclick = function () {
  document.querySelector(".popupdelete").style.display = "none";

}
function showPopupDelete() {
  document.querySelector(".popupdelete").style.display = "block";
  let table = document.getElementById("tabledelete");
 // Clear the table before repopulating
 table.innerHTML=""
  table.innerHTML = `
    <tr>
      <th>Serial</th>
      <th>Book</th>
      <th>Name</th>
      <th>ISBN</th>
      <th>Reserved</th>
      <th>Place</th>
      <th>Delete</th>
    </tr>
  `;
  ihtml=""
  for (let index = 0; index < library.length; index++) {
    let data = localStorage.getItem(`library`);
      let json = JSON.parse(data);

      ihtml += `
        <tr>
          <td>${json[index].Serial=index}</td>
          <td>${json[index].Book}</td>
          <td>${json[index].Name}</td>
          <td>${json[index].Isbn}</td>
          <td>${json[index].Reserved}</td>
          <td>${json[index].Placed_at}</td>
          <td><button type="button" class="delete bg-danger" onclick="deleteBook(this)">DELETE</button></td>
        </tr>
      `;
    }
   table.innerHTML += ihtml;
}
  localStorage.setItem('library', JSON.stringify(library));
function deleteBook(button) {
     let serial = button.closest("tr").querySelector("td:first-child").innerHTML;
    let confirmDelete = window.confirm("Are you sure you want to delete this book?");
    if (confirmDelete) {
      library.splice(serial,1)
      localStorage.setItem('library', JSON.stringify(library));
      showPopupDelete();
    }
}

//for Reserving the books
document.querySelectorAll(".close")[3].onclick = function () {
  document.querySelector(".popupreserve").style.display = "none";
}
function showPopupReserve() {
  document.querySelector(".popupreserve").style.display = "block";
  let table = document.getElementById("tableReserve");
 // Clear the table before repopulating
 table.innerHTML=""
  table.innerHTML = `
    <tr>
      <th>Serial</th>
      <th>Book</th>
      <th>Name</th>
      <th>ISBN</th>
      <th>Reserved</th>
      <th>Place</th>
      <th>Assign</th>
    </tr>
  `;
  ihtml=""
  for (let index = 0; index < library.length; index++) {
    let data = localStorage.getItem(`library`);
      let json = JSON.parse(data);

      button=""
      if(json[index].Reserved){
        button=`<td><button type="button" class="deposit  button" onclick="book(this)">Deposit</button></td>`
      }
      if(!json[index].Reserved){
        button=`<td><button type="button" class="reserve  button" onclick="book(this)">Reserve</button></td>`
      }
      ihtml += `
        <tr>
          <td>${json[index].Serial=index}</td>
          <td>${json[index].Book}</td>
          <td>${json[index].Name}</td>
          <td>${json[index].Isbn}</td>
          <td>${json[index].Reserved}</td>
          <td>${json[index].Placed_at}</td>
          ${button}
        </tr>
      `;
    }
   table.innerHTML += ihtml;
  }
localStorage.setItem('library', JSON.stringify(library)); 
function book(button) {
    let serial = button.closest("tr").querySelector("td:first-child").innerHTML;
    let data = localStorage.getItem('library');
    let json = JSON.parse(data);
  
    console.log(serial);
    console.log(json[serial]);
  
    if (json[serial].Reserved == true) {
      json[serial].Reserved = false;
      localStorage.setItem('library', JSON.stringify(json));
      showPopupReserve();
    }
    else if (json[serial].Reserved == false) {
      json[serial].Reserved = true;
      localStorage.setItem('library', JSON.stringify(json));
      showPopupReserve();
    }
}