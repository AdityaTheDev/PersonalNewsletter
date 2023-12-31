const express= require('express');
const bodyParser=require('body-parser');
const request=require('request');
const https=require('https');
const { dirname } = require('path');
const app=express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("static"));

app.get('/',function(req,res){
    res.sendFile(__dirname+"/signup.html");
});

app.post('/',function(req,res){
    const firstname=req.body.fName;
    const lastname=req.body.lName;
    const email=req.body.email;

    const data={
        'members':[
            {
                email_address:email,
                status:"subscribed",

                merge_fields:{
                    FNAME:firstname,
                    LNAME:lastname,
                }

            },
        ]
    };

    const jsonData=JSON.stringify(data);

    const url="https://us8.api.mailchimp.com/3.0/lists/7535a4d95e";
    
    const options={
        method:"POST",
        auth:"Aditya:18728c6f72e1ba07e1d11a79bd201537-us8",

    }
    
    const request=https.request(url,options,function(response){
       
        if(response.statusCode===200){
            res.sendFile(__dirname+"/success.html");
        }
        else{
            res.sendFile(__dirname+"/failure.html")
        }
       
        response.on("data",function(data){
        console.log(JSON.parse(data));
       })
    })

    request.write(jsonData);
    request.end();

});

app.post('/failure',function(req,res){
    res.redirect("/");
})

app.listen(3000,function(){
    console.log("server started");
});

//18728c6f72e1ba07e1d11a79bd201537-us8
//7535a4d95e