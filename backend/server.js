/** @format */

const express = require("express");
const { dbConnect } = require("./utiles/db.js");
const cors = require("cors");
const http = require("http");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const socket = require("socket.io");
const { connection } = require("mongoose");
require("dotenv").config();
const app = express();

const server = http.createServer(app);

app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
    credentials: true,
  })
);
const io = socket(server, {
  cors: {
    origin: "*",
    credentials: true,
  },
});
var allCustomer = [];
var allSeller = [];

const addUser = (customerId, socketId, userInfo) => {
  const checkUser = allCustomer.some((u) => u.customerId === customerId);

  if (!checkUser) {
    allCustomer.push({
      customerId,
      socketId,
      userInfo,
    });
  }
};

const addseller = (sellerId, socketId, userInfo) => {
  const checkSeller = allSeller.some((u) => u.sellerId === sellerId);

  if (!checkSeller) {
    allSeller.push({
      sellerId,
      socketId,
      userInfo,
    });
  }
};

const findCustomr = (customerId) => {
  return allCustomer.find((c) => c.customerId === customerId);
};

const findSeller = (sellerId) => {
  return allSeller.find((c) => c.sellerId === sellerId);
};

const remove = (socketId) => {
  allCustomer = allCustomer.filter((c) => c.socketId !== socketId);
  allSeller = allSeller.filter((c) => c.socketId !== socketId);
};

let admin = {};

const removeAdmin = (socketId) => {
  if (admin.socketId === socketId) {
    admin = {};
  }
};

io.on("connection", (soc) => {
  console.log("socket server is connected");

  soc.on("add_user", (customerId, userInfo) => {
    addUser(customerId, soc.id, userInfo);
    io.emit("activeCustomer", allCustomer);
    io.emit("activeSeller", allSeller);
  });
  soc.on("add_seller", (sellerId, userInfo) => {
    addseller(sellerId, soc.id, userInfo);
    io.emit("activeSeller", allSeller);
    io.emit("activeCustomer", allCustomer);
    io.emit("activeAdmin", { status: true });
  });
  soc.on("add_admin", (adminInfo) => {
    delete adminInfo.email;
    admin = adminInfo;
    admin.socketId = soc.id;
    io.emit("activeSeller", allSeller);
    io.emit("activeAdmin", { status: true });
  });
  soc.on("send_seller_message", (msg) => {
    const customer = findCustomr(msg.reciverId);
    if (customer !== undefined) {
      soc.to(customer.socketId).emit("seller_message", msg);
    }
  });
  soc.on("send_customer_message", (msg) => {
    const seller = findSeller(msg.reciverId);
    if (seller !== undefined) {
      soc.to(seller.socketId).emit("customer_message", msg);
    }
  });

  soc.on("send_message_admin_to_seller", (msg) => {
    const seller = findSeller(msg.reciverId);
    if (seller !== undefined) {
      soc.to(seller.socketId).emit("recive_admin_message", msg);
    }
  });

  soc.on("send_message_seller_to_admin", (msg) => {
    if (admin.socketId) {
      soc.to(admin.socketId).emit("recive_seller_message", msg);
    }
  });

  soc.on("disconnect", () => {
    console.log("user disconnect");
    remove(soc.id);
    removeAdmin(soc.id);
    io.emit("activeAdmin", { status: false });
    io.emit("activeSeller", allSeller);
    io.emit("activeCustomer", allCustomer);
  });
});

//
// Parse JSON bodies
app.use(bodyParser.json());

// Parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// ==>
app.use("/api", require("./routes/home/homeRoutes.js"));
app.use("/api", require("./routes/authRoutes.js"));
app.use("/api", require("./routes/dashboard/sellerRoutes.js"));
app.use("/api", require("./routes/dashboard/categoryRoutes.js"));
app.use("/api", require("./routes/dashboard/productRoutes.js"));

//==>
app.use("/api", require("./routes/home/customerAuthRoutes.js"));
// ==>
app.use("/api", require("./routes/home/cardRoutes.js"));
app.use("/api", require("./routes/order/orderRoutes.js"));
// ==>chat
app.use("/api", require("./routes/chatRoutes.js"));

app.get("/", (req, res) => res.send("hello server!"));
const port = process.env.PORT || 3001;
dbConnect();

server.listen(port, () => console.log(`Port is running at ${port}`));
