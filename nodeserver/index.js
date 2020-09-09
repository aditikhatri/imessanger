//node server to handel socket connections
const io= require('socket.io')(8000)

const users={};

io.on('connection',Socket =>{
    Socket.compress('new-user-joined',name =>{
    users[Socket.id]=name;
    Socket.broadcast.emit('user-joined',name);
    });

Socket.on('send',message =>{
    Socket.broadcast.emit('receive',{message,name:users[Socket.id]})
});

Socket.on('disconnect',message =>{
    Socket.broadcast.emit('receive',{'left',name:users[Socket.id]})
   delete users[Socket.id];
});


})