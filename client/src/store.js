import { observable, action, decorate } from 'mobx';
import cookie from 'react-cookies';
import axios from 'axios'
import { Upload, message } from 'antd';



var user = {
    isAuthenticated: false,
    disableForm: false,
    messages:[],
    data:{
        username: '',
        password: ''
    },
    registration(){
        if(this.data.username == ''){
            this.messages.push({type: "warning", message: "Заполните поле логина!"})
            setTimeout(()=>{
                this.messages = []
            }, 5000)
        } else if(this.data.password == ''){
            this.messages.push({type: "warning", message: "Заполните поле пароля!"})
            setTimeout(()=>{
                this.messages = []
            }, 5000)
        } else{
            this.disableForm = true
        axios.post('/users/signup',this.data).then((res)=>{
            if(res.status == 200){
                this.messages.push({type: "success", message: "Регистрация прошла успешно!"})
                this.disableForm = false;
            }
            
        }).catch((err)=>{
            this.messages.push({type:"error", message: "Такой логин уже занят, подберите другой."}) 
            this.disableForm = false;
            console.log(err)
        })
        setTimeout(()=>{
            this.messages = [];
        },8000)
    }
    },
    authorization(){
        if(this.data.username == ''){
            this.messages.push({type: "warning", message: "Заполните поле логина!"})
            setTimeout(()=>{
                this.messages = []
            }, 5000)
        } else if(this.data.password == ''){
            this.messages.push({type: "warning", message: "Заполните поле пароля!"})
            setTimeout(()=>{
                this.messages = []
            }, 5000)
        } else{
            this.disableForm = true
            axios.post('/users/login',this.data).then((res)=>{
                if(res.status == 200){
                    this.messages.push({type: "success", message: "Успешно! Ваш токен: "+res.data.token})
                    const expires = new Date()
                    expires.setDate(Date.now() + 3600)
                    cookie.save('jwt_token',res.data.token,{
                        path:'/',
                        expires
                    })
                    setTimeout(()=>{
                        this.isAuthenticated = true;
                    },3000)
                    setTimeout(()=>{
                        alert("Ваш токен авторизации истёк, обновите страницу и войдите в аккаунт")
                    },3600*1000)
                    this.disableForm = false;
                }
            }).catch((err)=>{
                if(err.response != undefined){
                if(err.response.status == 401){
                    this.messages.push({type:"error", message: "Такого пользователя не существует!"}) 
                }
            }
            this.disableForm = false;
            })
            setTimeout(()=>{
                this.messages = [];
            },8000)
        }
    },
    changeHandler(data){
        if(data.name == "username"){
            this.data.username = data.value;
        } else {
            this.data.password = data.value;
        }
    }
}

var account = {
    isLoaded: false,
    username: '',
    userID: '',
    picture: 'https://pngimage.net/wp-content/uploads/2018/06/%D0%B0%D0%BD%D0%BE%D0%BD%D0%B8%D0%BC-png-7.png',
    friendsList: [],
    getData(){
        axios.post('/users/getuserdata',{},{
            headers: { Authorization: "Bearer " + cookie.load('jwt_token') }
        }).then((res)=>{
            var newArr = [];
            res.data[0].friends.forEach((el)=>{
                newArr.push(el._id);
            })
            this.friendsList = newArr;
            this.username = res.data[0].username;
            this.picture = res.data[0].picture;
            this.userID = res.data[0]._id;
            this.isLoaded = true;
        })
    },
    logout(){
        axios.get('/users/logout',{
            headers: { Authorization: "Bearer " + cookie.load('jwt_token') }
        }).then((res)=>{
            message.success('Успешно! Ожидайте перенаправления.');
           setTimeout(()=>{
            user.isAuthenticated = false;
           },3000)
        }).catch((err)=>{
            message.error('Я не могу этого сделать...');
        })
    }
}

var add = {
    isLoadedRecommend: false,
    message: '',
    list: [],
    getRecommendations(){
        this.isLoadedRecommend = false;
        this.message = '';
        axios.get('/chat/recommendations',{
            headers: { Authorization: "Bearer " + cookie.load('jwt_token'),
                "Cache-Control": "no-cache, no-store, must-revalidate"
        }
        }).then((res)=>{
            this.list = res.data;
            this.isLoadedRecommend = true;
            console.log(res.data);
        }).catch((err)=>{
            this.message = 'Не удалось загрузить список рекомендаций'
            this.isLoadedRecommend = true;
        })
    },
    getBySearch(username){
        this.isLoadedRecommend = false;
        this.message = '';
        axios.get(`/chat/searchfriend/${username}`,{
            headers: { Authorization: "Bearer " + cookie.load('jwt_token') }
        }).then((res)=>{
            if(res.data.length == 0){
                this.message = '=( Ничего не найдено...';
            } else {
                this.list = res.data;
            } 
            this.isLoadedRecommend = true;
        }).catch((err)=>{
            this.message = 'Не удалось загрузить список пользователей';
            this.isLoadedRecommend = true;
        })
    },
    addFriend(id, callback){
        axios.post('/chat/addfriend',{id:id},{
            headers: { Authorization: "Bearer " + cookie.load('jwt_token') }
        }).then((res)=>{
            callback(true,'Вы добавили пользователя в друзья');
        }).catch((err)=>{
            if(err.response.status == 401){
                callback(false,'Данный пользователь уже в друзьях');
            }else if(err.response.status == 403){
                callback(false,'Вы не можете добавить в друзья самого себя');
            }
             else {
                callback(false,'Что-то пошло не так');
            }
        })
    }
}

var friends = {
    isLoaded: false,
    friends:[],
    message: '',
    getFriends(){
        this.isLoaded = false;
        this.message = '';
        axios.get('/chat/getfriends',{
            headers: { Authorization: "Bearer " + cookie.load('jwt_token'),
            "Cache-Control": "no-cache, no-store, must-revalidate"
        }
        }).then((res)=>{
            if(res.data.length == 0){
                this.message = 'Список друзей пуст'
            } else {
                this.friends = res.data;
                var newArr = [];
                res.data.forEach((el)=>{
                newArr.push(el._id);
            })
                account.friendsList = newArr;
            }
            this.isLoaded = true;
        }).catch((err)=>{
            this.message = 'Что-то пошло не так =(';
            this.isLoaded = true;
        })
    },
    deleteFriend(name,callback){
        axios.delete('/chat/deletefriend',{
            data:{id: name},
            headers: { Authorization: "Bearer " + cookie.load('jwt_token') }
        }).then((res)=>{
            callback(true,'Вы удалили пользователя из друзей')
        }).catch((err)=>{
            callback(false,'Что-то пошло не так')
        })
    }
}

var profile = {
    isLoaded: true,
    formLoaded: false,
    name: '',
    lastname: '',
    status: '',
    setStatus: false,
    setMessage: '',
    userFirstname: '',
    userLastname: '',
    userStatus: '',
    changeHandler(e){
        switch(e.name){
            case "firstname":
                this.name = e.value;
            break;
            case "lastname":
                this.lastname = e.value;
            break;
            case "status":
                this.status = e.value;
            break;
        }
    },
    setUserData(){
        this.formLoaded = true;
        axios.post('/chat/setuserdata',{name: this.name, lastname: this.lastname, status: this.status},{
            headers: { Authorization: "Bearer " + cookie.load('jwt_token')}
        }).then((res)=>{
            this.setStatus = true;
            this.setMessage = 'Данные успешно сохранены';
            this.formLoaded = false;
            this.name = '';
            this.lastname = '';
            this.status = '';
            this.getUserProfile();
        }).catch((err)=>{
            if(err.response.status == 400){
                this.setStatus = false;
                this.setMessage = 'Заполните хотя бы одно поле!';
                this.formLoaded = false;
            } else {
                this.setStatus = false;
                this.setMessage = 'Ошибка! Попробуйте позже';
                this.formLoaded = false;
            }
        })
    },
    getUserProfile(){
        this.isLoaded = true;
        axios.post('/users/getuserdata',{},{
            headers: { Authorization: "Bearer " + cookie.load('jwt_token') }
        }).then((res)=>{
           this.userFirstname = res.data[0].firstname;
           this.userLastname = res.data[0].lastname;
           this.userStatus = res.data[0].status;
           this.isLoaded = false;
        }).catch((err)=>{
            this.isLoaded = false;
        })
    }
} 

var createChat = {
    isLoaded: false,
    list:[],
    users: [],
    message: '',
    getFriends(){
        this.isLoaded = false;
        this.message = '';
        axios.get('/chat/getfriends',{
            headers: { Authorization: "Bearer " + cookie.load('jwt_token'),
            "Cache-Control": "no-cache, no-store, must-revalidate"
        }
        }).then((res)=>{
            if(res.data.length == 0){
                this.message = 'Список друзей пуст...Воспользуйтесь поиском и найдите людей, с которыми хотите создать чат'
            } else {
                this.list = res.data;
            }
            this.isLoaded = true;
        }).catch((err)=>{
            this.message = 'Что-то пошло не так =(';
            this.isLoaded = true;
        })
    },
    getBySearch(username){
        this.isLoaded = false;
        this.message = '';
        axios.get(`/chat/searchfriend/${username}`,{
            headers: { Authorization: "Bearer " + cookie.load('jwt_token') }
        }).then((res)=>{
            if(res.data.length == 0){
                this.message = '=( Ничего не найдено...';
            } else {
                this.list = res.data;
            } 
            this.isLoaded = true;
        }).catch((err)=>{
            this.message = 'Не удалось загрузить список пользователей';
            this.isLoaded = true;
        })
    },
    getUsersInChats(){
        this.isLoaded = false;
        axios.get('/chat/getusersinchats',{
            headers: { Authorization: "Bearer " + cookie.load('jwt_token') }
        }).then((users)=>{
            this.users = users.data;
            console.log(users)
            this.isLoaded = true;
        }).catch((err)=>{
            this.isLoaded = true;
        })
    },
    newChat(id, callback){
        axios.post('/chat/createchat',{id: id},{
            headers: { Authorization: "Bearer " + cookie.load('jwt_token') }
        }).then((res)=>{
            callback(true, 'Успешно! Чат создан')
        }).catch((err)=>{
            callback(false,'Что-то пошло не так')
        })
    }
}

var mychats = {
    Loaded: false,
    chats:[],
    username: '',
    message: '',
    getChats(){
        this.Loaded = false;
        this.message = '';
        this.username = account.username;
        axios.get('/chat/getuserchats',{
            headers: { Authorization: "Bearer " + cookie.load('jwt_token'),
            "Cache-Control": "no-cache, no-store, must-revalidate"
        } 
        }).then((res)=>{
            if(res.data.length == 0){
                this.message = 'На данный момент чатов нет...'
            }
            this.Loaded = true;
            this.chats = res.data;
        }).catch((err)=>{
            this.Loaded = true;
            this.message = 'Не удалось загрузить список чатов...=('
        })
    }

}

var chat = {
    allMessages:[],
    message: '',
    userID:'',
    currentChat:'',
    changeMessage(body){
        this.message = body;
    },
    getMessages(){
        this.userID = account.userID;
        axios.get(`/chat/getchatmessages/${this.currentChat}`,{
            headers: { Authorization: "Bearer " + cookie.load('jwt_token'),
            "Cache-Control": "no-cache, no-store, must-revalidate"}
        }).then((res)=>{
            this.allMessages = res.data;
        })
    }
}

var store = {
    user:user,
    account: account,
    add: add,
    friends: friends,
    profile: profile,
    createChat: createChat,
    mychats: mychats,
    chat: chat
}

decorate(store.chat,{
    allMessages: observable,
    message: observable,
    currentChat: observable,
    userID: observable
})

decorate(store.user, {
    isAuthenticated: observable,
    disableForm: observable,
    messages :observable,
    data: observable
})

decorate(store.account,{
    isLoaded: observable,
    username: observable,
    picture: observable,
    friendsList: observable
})

decorate(store.add,{
    isLoadedRecommend: observable,
    message: observable,
    list: observable,
})

decorate(store.friends,{
    isLoaded: observable,
    friends: observable,
    message: observable
})

decorate(store.profile,{
    isLoaded: observable,
    formLoaded: observable,
    name: observable,
    lastname: observable,
    status: observable,
    setStatus: observable,
    setMessage: observable,
    userFirstname: observable,
    userLastname: observable,
    userStatus: observable
})

decorate(store.createChat,{
    isLoaded: observable,
    message: observable,
    list: observable,
    users: observable
})

decorate(store.mychats,{
    Loaded:observable,
    chats: observable,
    message: observable,
    username: observable
})

export default store;