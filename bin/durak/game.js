class Game{
    constructor(){
        console.log("Durak successfully run")
    }
    rooms = []
    userConnected(socket){
        this.updateRooms(socket)
    }
    userDisconnected(socket){

    }
    updateRooms(socket){
        socket.emit("update_rooms", {rooms: rooms})
    }
    createRoom(socket){
        socket.join(rooms.length.toString())
        this.rooms.push({players: [socket.nickname]})
    }
}
module.exports = Game