// // const express = require('express');
// // const cors = require('cors');
// // const app = express();
// // const port = 3000;

// // app.use(cors());
// const express = require('express');
// const mysql = require('mysql2');
// const cors = require('cors');
// const app = express();

// app.use(cors());
// app.use(express.json());

// const db = mysql.createConnection({
//     host: "localhost",
//     user: "root1",
//     password: "1234",
//     database: "newsextractdb"
// });

// // Hard-coded articles data
// // const articles = [
// //   { 
// //     title: "Inte klart med ersättare för Ribbenvik", 
// //     summary: "▸ Regeringen och SD har ännu inte hittat någon ersättare för Migrationsverkets avgående generaldirektör Mikael Ribbenvik.", 
// //     link: "https://www.aftonbladet.se/nyheter/a/8JWWL2/inte-klart-med-ersattare-for-ribbenvik", 
// //     published: new Date(Date.now() - 86400000), 
// //     topic: ["SamhalleKonflikter"] 
// //   },
// //   { 
// //     title: "Drogs in i inhägnad – dödades av 40 krokodiler", 
// //     summary: "▸ En 72-årig man har dödats av omkring 40 krokodiler sedan han dragits in i en inhägnad på familjens reptilfarm.", 
// //     link: "https://www.aftonbladet.se/nyheter/a/bgWW6e/drogs-in-i-inhagnad-dodades-av-40-krokodiler", 
// //     published: new Date(Date.now() - 172800000), 
// //     topic: ["Ekonomi"] 
// //   },
// //   // Add more articles as needed
// // ];

// // API endpoint to get articles


// app.get('/api/articles', (req, res) => {
//   let filteredArticles = articles;
//   const { topic, sortBy } = req.query;

//   if (topic) {
//     filteredArticles = filteredArticles.filter(article => article.topic.includes(topic));
//   }

//   if (sortBy === 'newest') {
//     filteredArticles = filteredArticles.sort((a, b) => new Date(b.published) - new Date(a.published));
//   } else if (sortBy === 'oldest') {
//     filteredArticles = filteredArticles.sort((a, b) => new Date(a.published) - new Date(b.published));
//   }

//   res.json(filteredArticles);
// });

// app.listen(port, () => {
//   console.log(`Backend API running at http://localhost:${port}`);
// });

// // const express = require('express');
// // const mysql = require('mysql2');
// // const cors = require('cors');
// // const app = express();

// // app.use(cors());
// // app.use(express.json());

// // const db = mysql.createConnection({
// //     host: "localhost",
// //     user: "root1",
// //     password: "1234",
// //     database: "newsextractdb"
// // });

// // app.get('/api/articles', (req, res) => {
// //     const sortBy = req.query.sortBy || 'newest';
// //     let sortOrder = sortBy === 'newest' ? 'DESC' : 'ASC';
// //     const query = `SELECT title, summary, link, published, topic FROM news ORDER BY published ${sortOrder}`;
    
// //     db.query(query, (error, results) => {
// //         if (error) {
// //             return res.status(500).send('Error fetching articles');
// //         }
// //         res.json(results);
// //     });
// // });

// // app.listen(3000, () => {
// //     console.log('Server running on http://localhost:3000');
// // });

const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();
const port = 3000;

// Use CORS and JSON middleware
app.use(cors());
app.use(express.json());

// Database connection setup
const db = mysql.createConnection({
    host: "localhost", // Check if the host is correct
    user: "root1",     // Ensure this user exists and has the right privileges
    password: "1234",  // Ensure this password is correct
    database: "newsextractdb" // Ensure this database exists
});

// Connect to the database
db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err.message);
        return;
    }
    console.log('Connected to the MySQL database.');
});

// API endpoint to get articles from the database
app.get('/api/articles', (req, res) => {
    const sortBy = req.query.sortBy || 'newest';
    const sortOrder = sortBy === 'newest' ? 'DESC' : 'ASC';
    const query = `SELECT title, summary, link, published, topic FROM news ORDER BY published ${sortOrder}`;

    db.query(query, (error, results) => {
        if (error) {
            console.error('Error fetching articles:', error.message);
            return res.status(500).send('Error fetching articles');
        }
        res.json(results);
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});


