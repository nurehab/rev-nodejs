const express = require("express");
const app = express();
app.use(express.json());
require("dotenv").config();
const connectionDb = require("./conigration/config")
connectionDb()
app.use(require("./modules/users/routes/user.route"))
app.use(require("./modules/blogs/routes/blog.route"))
app.use(require("./modules/comments/router/comments.router"))
const userModel = require("./modules/users/Model/user.model")
const { createInvoice } = require("./createIvoice");
app.get("/",async (req,res)=>{
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

    
    res.send("yalla bena");
    
})

app.listen(process.env.PORT), () => {
    console.log(`this server is ${process.env.PORT} `)
};