const express = require('express')
const mysql = require('mysql2')
const bcrypt = require('bcrypt')
const bodyparser = require('body-parser')
const jwt = require("jsonwebtoken")
const cors = require('cors')

// Creating an Express app.
const app = express();
app.use(cors())
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))

// Connection to the MySQL database, using the createConnection() method.
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Saiteja@35',
    database: 'student_management'
  });
  
connection.connect(function(err) {
    if (err) throw err;
    console.log('Connected to the MySQL database');
});


// Register Api
app.post('/register',async(req,res)=>{
    const {email,password}=req.body;  
    const saltrounds = 10
    const hashedPasswd = await bcrypt.hash(password,saltrounds)  
    console.log(hashedPasswd)

    // performing queries using the query() method of the connection object.
    connection.query( 'SELECT * FROM users WHERE email = ?',[email],(err,result)=>{
        if(err){
            return res.status(500).json({err})
        }else if(result.length>0){
            return res.status(400).json({message:"Email Already exists. please choose another email"})
        }else{
            // Inserting the user's information into the database.
            connection.query(`INSERT into users (email,password) VALUES (?,?)`,
            [email,hashedPasswd],
            (err,result)=>{
                if(err){
                    return res.status(500).json({err})
                }
                return res.status(200).json({message:'User created successfully',data:result})
            })
        }
    })
})


// Login Api
app.post('/login',(req,res)=>{
    const {email,password}=req.body; 
    connection.query(`SELECT * from users WHERE email= ?`,[email],(err,data)=>{
        if(err){
            return res.status(500).json({err})
        }
        if(data.length>0){
            const hashedPasswd = data[0].password;
            bcrypt.compare(password,hashedPasswd,(err,result)=>{
                console.log(result)
                if(err){
                    return res.status(500).json({err})
                }
                else if(result){
                    return res.status(200).json({message:"Logged in successfully"})

                }else{
                    return res.status(400).json({message:"Enter valid password"})
                }
            })
        }else{
            return res.status(404).json({message:"Enter Valid Email"})
        }
    })
})

// student register

app.post('/student/register',async(req,res)=>{
    const {firstName,lastName,email,phoneNo,address}=req.body;

   // check unique phone number
    connection.query(`SELECT * FROM students where contact = ?`,[phoneNo],(err,data)=>{
        if(err){
            return res.status(500).json({message:"Internal server error in db query"})
        }
        else if (data.length>0){
            return res.status(400).json({message:"Mobile already exists"})
        }else{
        // check unique email 
            connection.query(`SELECT * FROM students where email = ?`,[email],(err,data)=>{
                if(err){
                    return res.status(500).json({message:"Internal server error in db query"})
                }
                else if (data.length>0){
                    return res.status(400).json({message:"Email already exists"})
                }else{
                    //create user
                    connection.query(`INSERT INTO students (first_name,last_name,email,contact,address) VALUES (?,?,?,?,?);`,
                    [firstName,lastName,email,phoneNo,address],
                    (err,data)=>{
                        if(err){
                            return res.status(500).json(err)
                        }
                        return res.status(200).json(data)
                    })
                }
            })
        }
    })
})

// Get all students
app.get('/students',(req,res)=>{
    connection.query(`SELECT * FROM students`,(err,data)=>{
        if(err){
            return res.status(500).json(err)
        }
        return res.status(200).json(data)
    })
})

// Get student by id
app.get('/students/:id',(req,res)=>{
    const {id} =req.params
    connection.query(`SELECT * FROM students WHERE id = ?`,[id],(err,data)=>{
        if(err){
            return res.status(500).json(err)
        }
        return res.status(200).json(data)
    })
})

//update Record
app.patch('/students/:id',(req,res)=>{
    const {id} =req.params;
    const {firstName,lastName,email,phoneNo,address}=req.body;
    connection.query(`UPDATE students SET first_name=?,last_name=?,contact=?,email=?,address=? WHERE id = ?`,
    [firstName,lastName,phoneNo,email,address,id],
    (err,data)=>{
        if(err){
            return res.status(500).json(err)
        }
        return res.status(200).json(data)
    })
    
})

//delete record
app.delete('/students/:id',(req,res)=>{
    const {id} =req.params
    connection.query(`DELETE FROM students WHERE id = ?`,[id],(err,data)=>{
        if(err){
            return res.status(500).json(err)
        }
        return res.status(200).json(data)
    })
})
app.listen(4000,()=>{
    console.log('server running on localhost 4000')
})
