class Game{
    constructor(){
        console.log("Durak successfully run")
    }
    rooms = []
    createRoom(socket){
        socket.join(rooms.length.toString())
        this.rooms.push({players: [socket.nickname]})
    }
}
module.exports = Game