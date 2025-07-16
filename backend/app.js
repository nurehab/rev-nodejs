const express = require("express");
const app = express();
app.use(express.json());
require("dotenv").config();
const fs = require('fs');
const path = require('path');

const connectionDb = require("./conigration/config")
connectionDb()
app.use(require("./modules/users/routes/user.route"))
app.use(require("./modules/blogs/routes/blog.route"))
app.use(require("./modules/comments/router/comments.router"))
const userModel = require("./modules/users/Model/user.model")
const { createInvoice } = require("./createIvoice");

app.get("/",async (req,res)=>{
   let filePath = path.join(__dirname, 'index.html');
    fs.readFile(filePath, (err, content) => {
        if (err) {
            res.status(500).send("Error loading file");
        } else {
            res.setHeader("Content-Type", "text/html");
            res.send(content);
        }
    });
    const invoice = {
  shipping: {
    name: "John Doe",
    address: "1234 Main Street",
    city: "San Francisco",
    state: "CA",
    country: "US",
    postal_code: 94111
  },
  items: [
    {
      item: "TC 100",
      description: "Toner Cartridge",
      quantity: 2,
      amount: 6000
    },
    {
      item: "USB_EXT",
      description: "USB Cable Extender",
      quantity: 1,
      amount: 2000
    }
  ],
  subtotal: 8000,
  paid: 0,
  invoice_nr: 1234
};

let userrr = await userModel.find({})
console.log(userrr);
createInvoice(userrr, "invoice.pdf");
    
})

app.listen(process.env.PORT, () => {
    console.log(`this server is running on port ${process.env.PORT}`);
});