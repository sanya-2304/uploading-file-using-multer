const path=require('path')
const express=require('express')
const mongoose=require('mongoose')
const multer=require('multer')
require('dotenv').config();

const app=express();
const PORT=process.env.PORT || 1800;

// const upload=multer({dest: "upload/"})
const storage=multer.diskStorage({destination:function(req, file, cb){
    return cb(null, './uploads')
}, filename:function(req, file, cb){
    return cb(null, `${Date.now()}-${file.originalname}`)
}})
const upload=multer({storage: storage});
app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'))

app.use(express.json());
app.use(express.urlencoded({extended:false}))

app.get('/', (req, res)=>{
    return res.render("homepage");
})
app.post('/upload', upload.single('profileImg'), (req, res)=>{
    console.log(req.body)
    console.log(req.file)

    return res.redirect('/')
})
app.listen(PORT, ()=>console.log(`server rendering at ${PORT}`))