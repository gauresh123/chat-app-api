export const getMessage = async (req, res) => {
  const io = req.io; // Get the io instance from the request object
  console.log(
    io.on("connection", (socket) => {
      console.log("A user connected", socket);
      socket.on("message", (msg) => {
        console.log("Message received:", msg);
        // Broadcast the message to all connected clients
        io.emit("message", msg);
      });

      socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
      });
    }),
    "io"
  );
  io.on("connection", (socket) => {
    console.log("A user connected", socket);
    socket.on("message", (msg) => {
      console.log("Message received:", msg);
      // Broadcast the message to all connected clients
      io.emit("message", msg);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });

  return res.json({ message: "Socket.IO logic is set up." });
};
