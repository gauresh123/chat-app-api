import express from "express";
import { Sequelize } from "sequelize";
import cors from "cors";
import userRouter from "./routes/userRouter.js";
import messageRouter from "./routes/messageRouter.js";
import dotenv from "dotenv/config";
import { createServer } from "http";
import { Server } from "socket.io";

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

const userSocketMap = {};

io.on("connection", async (socket) => {
  const clientId = socket.handshake.query.id;
  userSocketMap[clientId] = socket.id;

  socket.on(
    "sendMessage",
    async ({ senderId, receiverId, message, socketId }) => {
      // console.log(senderId, receiverId, message);

      const timestamp = new Date();
      // await sequelize.query(
      //   "select * from public.insert_message(:senderId,:receiverId,:message)",
      //   {
      //     replacements: {
      //       senderId: senderId,
      //       receiverId: receiverId,
      //       message: message,
      //     },
      //   }
      // );

      const receiverSocketId = userSocketMap[receiverId];

      if (userSocketMap[clientId]) {
        io.to([userSocketMap[clientId], receiverSocketId]).emit(
          "receiveMessage",
          {
            senderId: senderId,
            text: message,
            timestamp: timestamp,
            receiverId: receiverId,
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
    }
  );

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
