const express =require('express');
const bodyParser=require('body-parser');
const app=express();
const port=process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get('/api/customers',(req,res)=>{
    res.send([{
        "id":"1",
        "name":"이시연",
        "image":"https://placeimg.com/64/64/1",
        "birthday":"951001",
        "gender":"F",
        "group":"Dreamcatcher"
    },
    {
        "id":"2",
        "name":"문별이",
        "image":"https://placeimg.com/64/64/2",
        "birthday":"921222",
        "gender":"F",
        "group":"Mamamoo"
    },
    {
        "id":"3",
        "name":"이유빈",
        "image":"https://placeimg.com/64/64/3",
        "birthday":"970307",
        "gender":"F",
        "group":"Dreamcatcher"
    }

    ]);
});

app.listen(port,()=>console.log(`Listening on port ${port}`));