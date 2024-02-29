"use strict";

// Import readline module for CLI input
import readline from 'node:readline/promises'

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Get the client for MySQL database management
import mysql from 'mysql2/promise';

// Create the connection to database
const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'blog',
    password: '',  // Replace with your MySQL password
});

// Create a new entry on the database posts table
async function createPost() {
    console.log('Creating post...');
    const title = await rl.question('Title: ');
    const content = await rl.question('Content: ');
    
    try {
        const [results, fields] = await connection.query(
            'INSERT INTO `posts` (`title`, `content`) VALUES (?, ?)',
            [title, content]
        );
        
        console.log(results);
        console.log(fields);
    } catch (error) {
        console.error(error);
    }
}

// Edit an existing entry on the database posts table
async function editPost() {
    console.log('Editing post...');

    const id = await rl.question('Edited post ID: ');
    const title = await rl.question('New Title: ');
    const content = await rl.question('New Content: ');

    try {
        const [results, fields] = await connection.query(
            'UPDATE `posts` SET `title` = ?, `content` = ? WHERE `id` = ?',
            [title, content, id]
        );

        console.log(results);
        console.log(fields);
    } catch (error) {
        console.error(error);
    }
}

// Delete an existing entry on the database posts table
async function deletePost() {
    console.log('Deleting post...');

    const id = await rl.question('Deleted post ID: ');

    try {
        const [results, fields] = await connection.query(
            'DELETE FROM `posts` WHERE `id` = ?',
            [id]
        );

        console.log(results);
        console.log(fields);
    } catch (error) {
        console.error(error);
    }
}

// View all entries on the database posts table
async function viewPosts() {
    console.log('View all posts');
    // A simple SELECT query
    try {
        const [results, fields] = await connection.query(
          'SELECT * FROM `posts`'
        );
  
        console.log(results); // results contains rows returned by server
        console.log(fields); // fields contains extra meta data about results, if available
    } catch (error) {
        console.error(error);
    }
}

async function main() {
    let running = true;
    while (running) {
        try {
                const option = await rl.question(`Blog app
0 - Exit
1 - Create new post
2 - Edit post
3 - View all posts
4 - Delete post
Opción: `)

                console.log(`You selected: ${option}`);
                switch (option) {
                    case '1':
                        await createPost();
                        break;
                    case '2':
                        await editPost();
                        break;
                    case '3':
                        await viewPosts();
                        break;
                    case '4':
                        await deletePost();
                        break;
                    case '0':
                        running = false;
                        break;
                    default:
                        console.log('Invalid option');
                        break;
                }
        } catch (error) {
            console.error(error);
        }
    }

    rl.close();
}

main();
