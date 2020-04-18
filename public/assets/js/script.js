const socket = io()
const messageForm = $('#send-container')
const messageInput = $('#message-input')
const messageContainer = $('#message-container')
const button = $('#button');
const time = moment().format('LTS');
const signUpForm = $("#signUpForm");
const memberForm = $('.memberForm');
const friendName = $('#memBtn')
 // <-- however were store user's Name

appendMessage('You Joined')
socket.emit('new-user', name)

socket.on('chat-message', data => {
    appendMessage(`${data.name}: ${data.message}`)
})
socket.on('user-connected', name => {
    appendMessage(`${name} connected`)
})
socket.on('user-disconnected', name => {
    appendMessage(`${name} disconnected`)
})

function assignName(name){
    signUpForm.on('submit', e => {
    e.preventDefault()
    return name = $('#FirstName').val()

}
)}

messageForm.on('submit', e => {
    e.preventDefault()
    console.log('Success')
    const message = messageInput.val()
    appendMessage(`You: ${message}`)
    socket.emit('send-chat-message', message)
    messageInput.val('')
})

button.on('click', e => {
    e.preventDefault()
    console.log('Success')
    const message = messageInput.val()
    appendMessage(`You: ${message}`)
    socket.emit('send-chat-message', message)
    messageInput.val('')
})

friendName.on('click', e => {
    e.preventDefault();
    const friend = {
    name: friendName.val()
    } 

    $.post('/interface/:friend', friend)
})

function appendMessage(message, name) {
    assignName(name);
    const messageElement = $('<div>')
    

    let html =
    `<div class="flex items-start mb-4 text-sm">
        <img src="https://cdn1.iconfinder.com/data/icons/ninja-things-1/1772/ninja-512.png" class="w-10 h-10 rounded mr-3">
        <div class="flex-1 overflow-hidden">

            <div> <span class="font-bold">User</span> <span class="text-grey text-xs">${time}</span> </div>
            <p class="text-black leading-normal">${message}</p>
        </div>
    </div>`

    messageElement.html(html)
    messageContainer.append(messageElement)

}