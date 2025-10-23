const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


// Register a new user
public_users.post("/register", (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
    // Check if both username and password are provided
    if (username && password) {
        // Check if the user does not already exist
        if (!isValid(username)) {
            // Add the new user to the users array
            users.push({"username": username, "password": password});
            return res.status(200).json({message: "User successfully registered. Now you can login"});
        } else {Ex
            return res.status(404).json({message: "User already exists!"});
        }
    }
    // Return error if username or password is missing
    return res.status(404).json({message: "Unable to register user."});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
    // Create a Promise to simulate an asynchronous book fetch
    let myPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
        resolve(books);
        }, 2000); // simulate 2-second async delay
    });

    console.log("Before calling promise");

    // Call the promise and wait for it to resolve, then send the books
    myPromise
        .then((books) => {
        console.log("From Callback: Promise resolved");
        res.send(JSON.stringify(books,null,4));
        })
        .catch((error) => {
        res.status(500).json({ message: "Error fetching books", error });
        });

    console.log("After calling promise");
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
   // Retrieve the isbn parameter from the request URL and send the corresponding book details
    const isbn = req.params.isbn;
    
    // Create a Promise that resolves after 2 seconds with the book details
    let getBookByIsbn = new Promise((resolve, reject) => {
        setTimeout(() => {
        if (books[isbn]) {
            resolve(books[isbn]);
        } else {
            reject("Book not found");
        }
        }, 2000);
    });

    console.log("Before calling promise");

    getBookByIsbn
        .then((book) => {
        console.log("From Callback: Promise resolved");
        res.send(book);
        })
        .catch((error) => {
        res.status(404).json({ message: error });
        });

    console.log("After calling promise");
});
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    // Retrieve the author parameter from the request URL and send the corresponding book details
    const author = req.params.author.replace('-', ' ');
      
    // Create a Promise that resolves after 2 seconds with matching books or rejects if none found
    let getBooksByAuthor = new Promise((resolve, reject) => {
        setTimeout(() => {
        const matchingBooks = [];

        for (let key in books) {
            if (books[key].author.toLowerCase() === author.toLowerCase()) {
            matchingBooks.push(books[key]);
            }
        }

        if (matchingBooks.length > 0) {
            resolve(matchingBooks);
        } else {
            reject('Author not found');
        }
        }, 2000);
    });

    console.log("Before calling promise");

    getBooksByAuthor
        .then((books) => {
        console.log("From Callback: Promise resolved");
        res.send(books);
        })
        .catch((error) => {
        res.status(404).json({ message: error });
        });

    console.log("After calling promise");
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    // Retrieve the title parameter from the request URL and send the corresponding book details
    const title = req.params.title.replace('-', ' ');

    // Create a Promise to simulate async book search by title
    let getBooksByTitle = new Promise((resolve, reject) => {
        setTimeout(() => {
        const matchingBooks = [];

        for (let key in books) {
            if (books[key].title.toLowerCase() === title.toLowerCase()) {
            matchingBooks.push(books[key]);
            }
        }

        if (matchingBooks.length > 0) {
            resolve(matchingBooks);
        } else {
            reject('Title not found');
        }
        }, 2000); // simulate 2 sec async delay
    });

    console.log("Before calling promise");

    getBooksByTitle
        .then((books) => {
        console.log("From Callback: Promise resolved");
        res.send(books);
        })
        .catch((error) => {
        res.status(404).json({ message: error });
        });

    console.log("After calling promise");
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    // Retrieve the isbn parameter from the request URL and send the corresponding book reviews
    const isbn = req.params.isbn;
    res.send(books[isbn].reviews);
});

module.exports.general = public_users;
