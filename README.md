# [Matias Varela - Comicbook Artist Portfolio](https://matias-varela.herokuapp.com/)
This is a website that I made for my brother, a comicbook artist.

![presentation_image](https://res.cloudinary.com/tomhugin0000/image/upload/v1636768870/MatiasVarela/Presentaci%C3%B3n_Matias_ylr4ip.png)

## 🎈 Main Goal 🎈
The main goal was to have a way of showing some of the artist work, his drawings. And with a contact page for potential writters looking for an artist.<br>
But we also wanted to make an few steps forward, maybe a website with room for some fans, a place where people could read about their favorite comicbook artist,
a place to buy merch and maybe more.<br>
We needed a good and clean design, with animations so we could communicate the artist personality.



## 🏈 How I did it 🏈
The main design was made with Adobe Illustrator and Figma.<br>
When the time came, I started coding with HTML and CSS for a basic main page.<br>
Using EJS I made the partials, including the navbar that I would be using for mobile, and for large screens.<br>
Then, I made simple animations with JQuery.

In terms of backend, I wanted a database and an easy way to let the client upload and manage the website, so I needed to build a dashboard, with authentication for security.<br>
The backend uses Node.js with Express.<br>
Before connecting a database, I made the dashboard, and for images I use the node package called multer, I used local storage for testing.<br>
When everything was finished, I connected the MongoDB (with mongoose) database, then I added the cloudinary API and updated multer to use the multer-cloudinary package, so images
went to cloudinary.<br>
For security, I used passport.js for authentication in the admin dashboard.



## 🧱 Components 🧱
* HTML & CSS
* Jquery
* EJS
* Node.js & Express
* MongoDB & Mongoose
