# 📖 Matias Varela - Comicbook Artist Portfolio 📖
This is a website that I made for my brother, a comicbook artist.

## 🎈 Main Goal 🎈
The main goal was to have a way of showing some of the artist work, his drawings. And with a contact page for potential writters looking for an artist.__
But we also wanted to make an few steps forward, maybe a website with room for some fans, a place where people could read about their favorite comicbook artist,__ 
a place to buy merch and maybe more.__
We needed a good but clean design, with animations so we could communicate the artist personality.



## 🏈 How I did it 🏈
The main design was made with Adobe Illustrator and Figma._
When the time came, I started coding with HTML and CSS for a basic main page.__
Using EJS I made the partials, including the navbar that I would be using for mobile, and for large screens.__
Then, I made simple animations with JQuery.

In terms of backend, I wanted a database and an easy way to let the client upload and manage the website, so I needed to build a dashboard, with authentication for security.__
The backend uses Node.js with Express.__
Before connecting a database, I made the dashboard, and for images I use the node package called multer, I used local storage for testing.__
When everything was finished, I connected the MongoDB (with mongoose) database, then I added the cloudinary API and updated multer to use the multer-cloudinary package, so images
went to cloudinary.__
For security, I used passport.js for authentication in the admin dashboard.



## 🧱 Components 🧱
-HTML & CSS
-Jquery
-EJS
-Node.js & Express
-MongoDB & Mongoose
