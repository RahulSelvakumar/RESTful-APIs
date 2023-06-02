const express=require("express");
const bodyParser=require("body-parser");
const mongoose=require('mongoose');
const app=express();

app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

mongoose.connect("mongodb://127.0.0.1:27017/wikiDB");
const articleSchema={
    title:String,
    content:String
};
const Article=new mongoose.model("article",articleSchema);

/////********************************Request Trageting all article **************************/
app.get("/articles",function(req,res){
    Article.find({},function(err,data){
        res.send(data);
    })
});

app.post("/articles",function(req,res){
    const newArticle=new Article({
        title:req.body.title,
        content:req.body.content
    });
    newArticle.save(function(err){
        if(!err){
            res.send("Sucessfully sent post request");
        }
        else{
            res.send(err);
        }
    });
});

app.delete("/articles",function(req,res){
    Article.deleteMany({},function(err){
        if(!err){
            res.send("Deleted all articled..")
        }
        else{
            res.send(err);
        }
    })
})

/////********************************Request Trageting specfic article **************************/

app.get("/articles/:articleTitle",function(req,res){
    Article.findOne({title:req.params.articleTitle},function(err,foundArtile){
        if(!err){
            res.send(foundArtile);
        }
        else{
            res.send(err);
        }
    });
});

app.put("/articles/:articleTitle",function(req,res){
    Article.update({title:req.params.articleTitle},{$set:req.body},function(err){
        if(!err){
            res.send("sucessfully updated");
        }
        else{
            res.send(err);
        }
    })
})


app.patch("/articles/:articleTitle",function(req,res){
    Article.update({title:req.params.articleTitle},{$set:req.body},function(err){
        if(!err){
            res.send("sucessfully updated");
        }
        else{
            res.send(err);
        }
    })
})

app.delete("/articles/:articleTitle",function(req,res){
    Article.deleteOne({title:req.params.articleTitle},function(err){
        if(!err){
            res.send("Deleted the article..")
        }
        else{
            res.send(err);
        }
    })
})

app.listen(3000,function(){
    console.log("listening to port 3000");
});