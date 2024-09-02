import express from "express";
import { Sequelize } from "sequelize";
import cors from "cors";
import userRouter from "./routes/userRouter.js";
import messageRouter from "./routes/messageRouter.js";
import dotenv from "dotenv/config";
import { createServer } from "http";
import { Server } from "socket.io";
import axios from "axios";
import cron from "node-cron";

const index = express();
const PORT = "8000";

const sequelize = new Sequelize({
  dialect: "postgres",
  host: process.env.PGHOST,
  port: 5432,
  username: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  dialectOptions: {
    ssl: true,
  },
});

const server = createServer(index);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

index.use(cors());
index.use(express.json());

//index.use("/api/user", studentRouter);
index.use("/api/user", userRouter);
index.use("/api/message", messageRouter);
index.get("/", (req, res) => {
  res.send("<h1>api calling</h1>");
});

cron.schedule("*/14 * * * *", () => {
  console.log("Cron job running every 14 minutes");

  // Internal API call
  axios
    .get("http://localhost:3000/")
    .then((response) => {
      console.log("Response from internal API call:");
    })
    .catch((error) => {
      console.error("Error calling internal API:");
    });
});

const userSocketMap = {};
const userAudioMap = {};

io.on("connection", async (socket) => {
  const clientId = socket.handshake.query.id;
  userSocketMap[clientId] = socket.id;

  socket.on("sendMessage", async ({ senderid, receiverid, message, img }) => {
    const timestamp = new Date();
    // await sequelize.query(
    //   "select * from public.insert_message(:senderId,:receiverId,:message)",
    //   {
    //     replacements: {
    //       senderId: senderid,
    //       receiverId: receiverid,
    //       message: message,
    //     },
    //   }
    // );

    const receiverSocketId = userSocketMap[receiverid];

    if (userSocketMap[clientId]) {
      io.to([userSocketMap[clientId], receiverSocketId]).emit(
        "receiveMessage",
        {
          senderid: senderid,
          text: message,
          timestamp: timestamp,
          receiverid: receiverid,
          img: img,
        }
      );
    } else {
      console.log("Receiver not connected");
    }
    // io.to(userSocketMap[clientId]).emit("receiveMessage", {
    //   senderId: senderId,
    //   text: message,
    //   timestamp: timestamp,
    //   receiverId: receiverId,
    // });
  });

  socket.on("joinGroup", (groupId) => {
    socket.join(groupId);
  });

  socket.on("send", async ({ groupId, senderId, message, name }) => {
    // Save the message to the database
    console.log(message);
    // Emit the message to all group members
    io.to(groupId).emit("newMessage", {
      senderId,
      message,
      groupId,
      name,
    });
  });

  socket.on("joinaudiocall", ({ userId }) => {
    userAudioMap[userId] = socket.id;
  });

  socket.on("offer", (data) => {
    const { offer, to } = data;
    console.log(data);
    if (userAudioMap[to]) {
      io.to(userAudioMap[to]).emit("offer", { offer, from: socket.id });
    }
  });

  // Handle answers
  socket.on("answer", (data) => {
    const { answer, to } = data;
    if (userAudioMap[to]) {
      io.to(userAudioMap[to]).emit("answer", { answer, from: socket.id });
    }
  });

  // Handle ICE candidates
  socket.on("candidate", (data) => {
    const { candidate, to } = data;
    if (userAudioMap[to]) {
      io.to(userAudioMap[to]).emit("candidate", { candidate, from: socket.id });
    }
  });

  socket.on("disconnect", () => {
    delete userSocketMap[clientId];
    console.log("User disconnected:", socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`your app started successfully and is running at port: ${PORT}`);
  // CONNECT TO DATABASE
});

sequelize
  .authenticate()
  .then(() => {
    console.log("DB Connected successfully !!!");
  })
  .catch((err) => {
    console.log(err, "error");
  });
/*http.createServer((req,res)=>{
    res.writeHead(200,{'Content-Type':'aplication\json'});
    res.write(JSON.stringify(info));
    res.end();
    }).listen(4500)*/
