const express = require("express");
const path = require("path");
const QRCode = require("qrcode");
const bodyParser = require("body-parser")

const app = express();
const port = 3000;

app.use("/static" , express.static(path.join(__dirname , "public")))
app.use(bodyParser.urlencoded({extended:true}));

app.get('/', (req, res) => {
res.send('<h1>Generate QR Code</h1><form action="/generate" method="post"><input type="text" name="text" placeholder="Enter your text" required><button type="submit">Generate</button></form>');
});

app.post('/generate', (req, res) => {

const text = req.body.text;
const filePath = path.join(__dirname , "public" , "images" , "qr.png");
const options = {
    errorCrrectionLevel : "H",
    quality: 0.95,
    margin: 1,
    width: 500,
    scale: 10
};

QRCode.toFile(filePath , text , options , (err) => {
    if(err){
        res.send("Error")
    }
    else{
        const imageUrl = "static/images/qr.png";
        res.send(`<h1>Generated QR Code</h1><img src="${imageUrl}"><br><a href="/">Go back</a>`);
    }
})
});

app.listen(port, () => {
console.log(`Server is running on port ${port}`);
});