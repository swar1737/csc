//Our dependencies
const express = require('express')
const app = express ()
const mysql = require('mysql')
const cors = require('cors')

app.use(express.json ())
app.use(cors())

//Run the server 
app.listen(3002, ()=>{
    console.log('Server is running on port 3002')
})

//Database (mysql)
const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: '',
    database: 'cscdb',
})

//Routes to the server that will register a user

app.post('/register', (req, res)=>{
    // Variables from form
    const sentEmail = req.body.Email
    const sentUserName = req.body.UserName
    const sentPassword = req.body.Password

    //SQl statement to insert the user to database table user
    const SQL = 'INSERT INTO users (email, username, password) VALUES (?,?,?)'
    const Values = [sentEmail, sentUserName, sentPassword]

    //Query to execute above statements
    db.query(SQL, Values, (err, results)=>{
        if (err){
            res.send(err)
        }
        else{
            console.log('User inserted successfully')
            res.send({message: 'User added!'})
        }
    })
})

//Login routes 
app.post('/login', (req,res)=>{
      // Variables from form

      const sentLoginUserName = req.body.LoginUserName
      const sentLoginPassword = req.body.LoginPassword
  
      //SQl statement to insert the user to database table user
      const SQL = 'SELECT * FROM users WHERE username = ? && password = ?'
      const Values = [sentLoginUserName, sentLoginPassword]  

          //Query to execute above statements
    db.query(SQL, Values, (err, results)=>{
       if(err){
        res.send({error: err})
       } 
       if(results.length > 0){
        res.send(results)
       }
       else{
        res.send({message: 'Credentials Not match!'})
       }
    })
})