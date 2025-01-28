const express = require("express")

const app = express()


function isOldEnoughMiddleware(req,res,next){
    const age = req.query.age
    if(age>=14){
        next()
    }
    else{
        res.json({
            msg:"you cant ride this ride dear"
        })
    }
}

app.get("/",(req,res)=>{
    res.send("your req got accepted")

})
app.use(isOldEnoughMiddleware);




app.get("/ride1",(req,res)=>{
    res.json({
        "msg":"you just rode our first ride "
    })
})

app.get("/ride2",(req,res)=>{
    res.json({
        "msg":"you just rode our seco ride "
    })
})

app.listen (port ,()=>{
    console.log(`app listening to port ${process.env.port}`)
})