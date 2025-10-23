const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  res.send(JSON.stringify({books},null,4));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
   // Retrieve the isbn parameter from the request URL and send the corresponding book details
    const isbn = req.params.isbn;
    res.send(books[isbn]);
});
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    // Retrieve the author parameter from the request URL and send the corresponding book details
    const author = req.params.author.replace('-', ' ');
    const matchingBooks = [];

    for (let key in books) {    
        if (books[key].author.toLowerCase() === author.toLowerCase()) {
            matchingBooks.push(books[key]);
        }
    }
    if (matchingBooks.length > 0){
        res.send(matchingBooks);
    }
    else{
        return res.status(404).send({ message: 'Author not found' });
    } 
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    // Retrieve the title parameter from the request URL and send the corresponding book details
    const title = req.params.title.replace('-', ' ');
    const matchingBooks = [];

    for (let key in books) {    
        if (books[key].title.toLowerCase() === title.toLowerCase()) {
            matchingBooks.push(books[key]);
        }
    }
    if (matchingBooks.length > 0){
        res.send(matchingBooks);
    }
    else{
        return res.status(404).send({ message: 'Title not found' });
    } 
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
