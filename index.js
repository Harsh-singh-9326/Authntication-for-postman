const express = require("express")
const app = express()
const port = process.env.port || 3000
const User = []

app.use(express.json())

function generateToken() {
    const Token = ["A", "B", "C", "D", "E", "F",
        "G", "H", "I", "J", "K", "L", "M", "N",
        "O", "P", "Q", "R", "S", "U", "V", "W", "X", "Y", "Z",
        "1", "2", "3", "4", "5", "6", "7", "8", "9"
    ];

    let tokenLength = 26; // Specify the length of the token
    let generatedToken = "";

    for (let i = 0; i < tokenLength; i++) {
        const randomIndex = Math.floor(Math.random() * Token.length); // Get a random index
        generatedToken += Token[randomIndex]; // Append the random character to the token
    }

    return generatedToken;
}



app.post("/signUp",(req,res)=>{
    const username = req.body.username
    const password = req.body.password

     User.push({
        username:username,
        password:password
     })
     res.json({
        msg:"you Just Signed In"
     })
     console.log(User)

    
})

app.post("/signIn",(req,res)=>{
    const username =req.body.username
    const password = req.body.password

    let founduser = null;
    for (let i = 0; i < User.length; i++) {
        if(User[i].username===username&&User[i].password===password){
            founduser=User[i]

        }
        
    }
    if (founduser){
        const Token= generateToken()
        founduser.Token =Token;
        res.json({
             msg:"you Just Signed In",
            Token:Token
        })
    }else{
        res.status(404).json({
        msg:"Invalid Username or Password"
        })
    }


console.log(User)
})
app.get("/hello",(req,res)=>{
    res.json({
      msg:"HELLO"
})
})

app.get("/me",(req,res)=>{
    const token = req.headers.Token
    let founduser = null

    for (let i = 0; i < User.length; i++) {
        if( User[i].Token == token){
            founduser= User[i]

        }}
        if (founduser){
            res.json({  
                username :founduser.username,
                password : founduser.password})
          
        }else{
            res.json({
                message :"token is invalid"
            })
        }
        
    }

)


app.listen (port ,()=>{
    console.log(`app listening to port ${port}`)
})