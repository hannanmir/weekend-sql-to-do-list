const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

// get database and send to client.js
router.get('/', (req, res) => {
    let queryText = 'SELECT * FROM "tasks" ORDER BY "id";';
    pool.query(queryText).then(result => {
      res.send(result.rows);
    })
    .catch(error => {
      console.log('error getting tasks', error);
      res.sendStatus(500);
    });
})

// send user input task to the database
router.post('/', (req, res) => {
    let newTask = req.body;
    console.log('Adding new task:', newTask);
    let queryText = `
      INSERT INTO "tasks" ("task") 
      VALUES ($1);`;
    pool.query(queryText, [newTask.task])
    .then(result => {
      res.sendStatus(201);
    })
    .catch(error => {
      console.log(`Error adding new task`, error); 
      res.sendStatus(500);
    });
});

module.exports = router;
