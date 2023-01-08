const socket = io.connect("localhost:3000");

const output = document.getElementById("output");
const feedback = document.getElementById("feedback");
const sender = document.getElementById("sender");
const message = document.getElementById("message");
const submitBtn = document.getElementById("submitBtn");

submitBtn.addEventListener("click", () => {
  socket.emit("chat", {
    sender: sender.value,
    message: message.value,
  });
});

socket.on("chat", (data) => {
  feedback.innerHTML = "";
  output.innerHTML += `<p><strong> ${data.sender}:</strong> ${data.message} </p>`;
  message.value = "";
});

message.addEventListener("keypress", () => {
  socket.emit("typing", {
    sender: sender.value,
  });
});

socket.on("typing", (data) => {
  feedback.innerHTML = `${data.sender} typing...`;
});
