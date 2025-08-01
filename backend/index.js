// const express = require("express");
// const app = express();
// const mongoose = require("mongoose");
// const jwt = require("jsonwebtoken");
// const multer = require("multer");
// const path = require("path");
// const cors = require("cors");
// const port = process.env.PORT || 4000;

// app.use(express.json());
// app.use(cors());

// // Database Connection With MongoDB
// mongoose.connect("mongodb+srv://somitpwhat:DTEwLgl6XYWrZZbJ@cluster0.4e7hcss.mongodb.net/urbannest");

// // paste your mongoDB Connection string above with password
// // password should not contain '@' special character


// //Image Storage Engine 
// const storage = multer.diskStorage({
//   destination: './upload/images',
//   filename: (req, file, cb) => {
//     return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
//   }
// })
// const upload = multer({ storage: storage })
// app.post("/upload", upload.single('product'), (req, res) => {
//   res.json({
//     success: 1,
//     image_url: `/images/${req.file.filename}`
//   })
// })


// // Route for Images folder
// app.use('/images', express.static('upload/images'));


// // MiddleWare to fetch user from token
// const fetchuser = async (req, res, next) => {
//   const token = req.header("auth-token");
//   if (!token) {
//     res.status(401).send({ errors: "Please authenticate using a valid token" });
//   }
//   try {
//     const data = jwt.verify(token, "secret_ecom");
//     req.user = data.user;
//     next();
//   } catch (error) {
//     res.status(401).send({ errors: "Please authenticate using a valid token" });
//   }
// };


// // Schema for creating user model
// const Users = mongoose.model("Users", {
//   name: { type: String },
//   email: { type: String, unique: true },
//   password: { type: String },
//   cartData: { type: Object },
//   date: { type: Date, default: Date.now() },
// });


// // Schema for creating Product
// const Product = mongoose.model("Product", {
//   id: { type: Number, required: true },
//   name: { type: String, required: true },
//   description: { type: String, required: true },
//   image: { type: String, required: true },
//   category: { type: String, required: true },
//   new_price: { type: Number },
//   old_price: { type: Number },
//   date: { type: Date, default: Date.now },
//   avilable: { type: Boolean, default: true },
// });


// // ROOT API Route For Testing
// app.get("/", (req, res) => {
//   res.send("Root");
// });


// // Create an endpoint at ip/login for login the user and giving auth-token
// app.post('/login', async (req, res) => {
//   console.log("Login");
//   let success = false;
//   let user = await Users.findOne({ email: req.body.email });
//   if (user) {
//     const passCompare = req.body.password === user.password;
//     if (passCompare) {
//       const data = {
//         user: {
//           id: user.id
//         }
//       }
//       success = true;
//       console.log(user.id);
//       const token = jwt.sign(data, 'secret_ecom');
//       res.json({ success, token });
//     }
//     else {
//       return res.status(400).json({ success: success, errors: "please try with correct email/password" })
//     }
//   }
//   else {
//     return res.status(400).json({ success: success, errors: "please try with correct email/password" })
//   }
// })


// //Create an endpoint at ip/auth for regestring the user & sending auth-token
// app.post('/signup', async (req, res) => {
//   console.log("Sign Up");
//   let success = false;
//   let check = await Users.findOne({ email: req.body.email });
//   if (check) {
//     return res.status(400).json({ success: success, errors: "existing user found with this email" });
//   }
//   let cart = {};
//   for (let i = 0; i < 300; i++) {
//     cart[i] = 0;
//   }
//   const user = new Users({
//     name: req.body.username,
//     email: req.body.email,
//     password: req.body.password,
//     cartData: cart,
//   });
//   await user.save();
//   const data = {
//     user: {
//       id: user.id
//     }
//   }

//   const token = jwt.sign(data, 'secret_ecom');
//   success = true;
//   res.json({ success, token })
// })


// // endpoint for getting all products data
// app.get("/allproducts", async (req, res) => {
//   let products = await Product.find({});
//   console.log("All Products");
//   res.send(products);
// });


// // endpoint for getting latest products data
// app.get("/newcollections", async (req, res) => {
//   let products = await Product.find({});
//   let arr = products.slice(0).slice(-8);
//   console.log("New Collections");
//   res.send(arr);
// });


// // endpoint for getting womens products data
// app.get("/popularinwomen", async (req, res) => {
//   let products = await Product.find({ category: "women" });
//   let arr = products.splice(0, 4);
//   console.log("Popular In Women");
//   res.send(arr);
// });

// // endpoint for getting womens products data
// app.post("/relatedproducts", async (req, res) => {
//   console.log("Related Products");
//   const {category} = req.body;
//   const products = await Product.find({ category });
//   const arr = products.slice(0, 4);
//   res.send(arr);
// });


// // Create an endpoint for saving the product in cart
// app.post('/addtocart', fetchuser, async (req, res) => {
//   console.log("Add Cart");
//   let userData = await Users.findOne({ _id: req.user.id });
//   userData.cartData[req.body.itemId] += 1;
//   await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
//   res.send("Added")
// })


// // Create an endpoint for removing the product in cart
// app.post('/removefromcart', fetchuser, async (req, res) => {
//   console.log("Remove Cart");
//   let userData = await Users.findOne({ _id: req.user.id });
//   if (userData.cartData[req.body.itemId] != 0) {
//     userData.cartData[req.body.itemId] -= 1;
//   }
//   await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
//   res.send("Removed");
// })


// // Create an endpoint for getting cartdata of user
// app.post('/getcart', fetchuser, async (req, res) => {
//   console.log("Get Cart");
//   let userData = await Users.findOne({ _id: req.user.id });
//   res.json(userData.cartData);

// })


// // Create an endpoint for adding products using admin panel
// app.post("/addproduct", async (req, res) => {
//   let products = await Product.find({});
//   let id;
//   if (products.length > 0) {
//     let last_product_array = products.slice(-1);
//     let last_product = last_product_array[0];
//     id = last_product.id + 1;
//   }
//   else { id = 1; }
//   const product = new Product({
//     id: id,
//     name: req.body.name,
//     description: req.body.description,
//     image: req.body.image,
//     category: req.body.category,
//     new_price: req.body.new_price,
//     old_price: req.body.old_price,
//   });
//   await product.save();
//   console.log("Saved");
//   res.json({ success: true, name: req.body.name })
// });


// // Create an endpoint for removing products using admin panel
// app.post("/removeproduct", async (req, res) => {
//   await Product.findOneAndDelete({ id: req.body.id });
//   console.log("Removed");
//   res.json({ success: true, name: req.body.name })
// });

// // Starting Express Server
// app.listen(port, (error) => {
//   if (!error) console.log("Server Running on port " + port);
//   else console.log("Error : ", error);
// });

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

// Load environment variables from .env (only in local dev)
require("dotenv").config();

const port = process.env.PORT || 4000;

// Middleware
app.use(express.json());
// app.use(cors());
// app.use(cors({
//   origin: '*',  // or your frontend URL for security
//   methods: ['GET','POST','PUT','DELETE'],
//   credentials: true
// }));
const allowedOrigins = [
  'https://urbannest-1-jehf.onrender.com',  // main website
  'https://urbannest-2.onrender.com'        // admin panel
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like Postman) or from allowed list
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET','POST','PUT','DELETE'],
  credentials: true
}));

// Database Connection With MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Image Storage Engine
const storage = multer.diskStorage({
  destination: "./upload/images",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});
const upload = multer({ storage: storage });

// Upload API
app.post("/upload", upload.single("product"), (req, res) => {
  res.json({
    success: 1,
    image_url: `/images/${req.file.filename}`,
  });
});

// Route for serving images
app.use("/images", express.static("upload/images"));

// Middleware for authentication
const fetchuser = async (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    return res
      .status(401)
      .send({ errors: "Please authenticate using a valid token" });
  }
  try {
    const data = jwt.verify(token, "secret_ecom");
    req.user = data.user;
    next();
  } catch (error) {
    res
      .status(401)
      .send({ errors: "Please authenticate using a valid token" });
  }
};

// Schemas
const Users = mongoose.model("Users", {
  name: { type: String },
  email: { type: String, unique: true },
  password: { type: String },
  cartData: { type: Object },
  date: { type: Date, default: Date.now() },
});

const Product = mongoose.model("Product", {
  id: { type: Number, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
  new_price: { type: Number },
  old_price: { type: Number },
  date: { type: Date, default: Date.now },
  avilable: { type: Boolean, default: true },
});

// Root Route
app.get("/", (req, res) => {
  res.send("Root");
});

// LOGIN
app.post("/login", async (req, res) => {
  console.log("Login");
  let success = false;
  let user = await Users.findOne({ email: req.body.email });
  if (user) {
    const passCompare = req.body.password === user.password;
    if (passCompare) {
      const data = { user: { id: user.id } };
      success = true;
      const token = jwt.sign(data, "secret_ecom");
      return res.json({ success, token });
    }
    return res
      .status(400)
      .json({ success: success, errors: "please try with correct email/password" });
  }
  return res
    .status(400)
    .json({ success: success, errors: "please try with correct email/password" });
});

// SIGNUP
app.post("/signup", async (req, res) => {
  console.log("Sign Up");
  let success = false;
  let check = await Users.findOne({ email: req.body.email });
  if (check) {
    return res
      .status(400)
      .json({ success: success, errors: "existing user found with this email" });
  }
  let cart = {};
  for (let i = 0; i < 300; i++) {
    cart[i] = 0;
  }
  const user = new Users({
    name: req.body.username,
    email: req.body.email,
    password: req.body.password,
    cartData: cart,
  });
  await user.save();
  const data = { user: { id: user.id } };
  const token = jwt.sign(data, "secret_ecom");
  success = true;
  res.json({ success, token });
});

// Product APIs (same as before)
app.get("/allproducts", async (req, res) => {
  let products = await Product.find({});
  res.send(products);
});

app.get("/newcollections", async (req, res) => {
  let products = await Product.find({});
  let arr = products.slice(0).slice(-8);
  res.send(arr);
});

app.get("/popularinwomen", async (req, res) => {
  let products = await Product.find({ category: "women" });
  let arr = products.splice(0, 4);
  res.send(arr);
});

app.post("/relatedproducts", async (req, res) => {
  const { category } = req.body;
  const products = await Product.find({ category });
  const arr = products.slice(0, 4);
  res.send(arr);
});

// Cart APIs
app.post("/addtocart", fetchuser, async (req, res) => {
  let userData = await Users.findOne({ _id: req.user.id });
  userData.cartData[req.body.itemId] += 1;
  await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
  res.send("Added");
});

app.post("/removefromcart", fetchuser, async (req, res) => {
  let userData = await Users.findOne({ _id: req.user.id });
  if (userData.cartData[req.body.itemId] != 0) {
    userData.cartData[req.body.itemId] -= 1;
  }
  await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
  res.send("Removed");
});

app.post("/getcart", fetchuser, async (req, res) => {
  let userData = await Users.findOne({ _id: req.user.id });
  res.json(userData.cartData);
});

// Admin APIs
app.post("/addproduct", async (req, res) => {
  let products = await Product.find({});
  let id = products.length > 0 ? products.slice(-1)[0].id + 1 : 1;

  const product = new Product({
    id,
    name: req.body.name,
    description: req.body.description,
    image: req.body.image,
    category: req.body.category,
    new_price: req.body.new_price,
    old_price: req.body.old_price,
  });
  await product.save();
  res.json({ success: true, name: req.body.name });
});

app.post("/removeproduct", async (req, res) => {
  await Product.findOneAndDelete({ id: req.body.id });
  res.json({ success: true, name: req.body.name });
});

// Start Server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
