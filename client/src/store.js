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
    addingStatus: false,
    addingMessage:'',
    getRecommendations(){
        axios.get('/chat/recommendations',{
            headers: { Authorization: "Bearer " + cookie.load('jwt_token') }
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
    addFriend(id){
        axios.post('/chat/addfriend',{id:id},{
            headers: { Authorization: "Bearer " + cookie.load('jwt_token') }
        }).then((res)=>{
            this.addingStatus = true;
            this.addingMessage = 'Вы добавили пользователя в друзья'
        }).catch((err)=>{
            if(err.response.status == 401){
                this.addingMessage = 'Данный пользователь уже в друзьях'
                this.addingStatus = false;
            }else if(err.response.status == 403){
                this.addingMessage = 'Вы не можете добавить в друзья самого себя'
                this.addingStatus = false;
            }
             else {
                this.addingMessage = 'Что-то пошло не так'
                this.addingStatus = false;
            }
        })
    }
}

var store = {
    user:user,
    account: account,
    add: add
}

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
    addingStatus: observable,
    addingMessage: observable
})

export default store;