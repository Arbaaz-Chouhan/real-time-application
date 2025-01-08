const socket = io();

const form = document.getElementById('send-container');
const input = document.getElementById('messageInp');
const container = document.querySelector('.container');

// Add message to chat container
function appendMessage(message, position) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', position);
    messageElement.innerText = message;
    container.append(messageElement);
    container.scrollTop = container.scrollHeight; 
}

// Listen for form submit
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = input.value;
    appendMessage(`You: ${message}`, 'right'); 
    socket.emit('chat message', message); 
    input.value = '';
});

// Listen for chat messages from server
socket.on('chat message', (message) => {
    appendMessage(`Friend: ${message}`, 'left'); // Add received message to chat
});
