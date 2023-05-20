
import axios from 'axios'
import router from '@/router'

const API_URL = 'http://127.0.0.1:8000'

const loginStore ={
    state: {
        token:null,
        username:null,
    },
    getters: {
        isLogin(state) {
        return state.token ? true : false
        },
        getUsername(state) {
            return state.username;
          },
    },
    mutations: {
        SAVE_TOKEN(state, { token, username }) {
        state.token = token
        state.username = username
        router.push({name : 'MovieView'}) 
        },
        
        CLEAR_TOKEN(state) {
        state.token = null
        state.username = null
        router.push({ name: 'LogInView' }) 
        },
        SET_PROFILE_IMG: (state, profile_img) => state.profile.profile_img = profile_img,
    },
    actions: {
        signUp(context, payload) {
        const username = payload.username
        const password1 = payload.password1
        const password2 = payload.password2

        axios({
            method: 'post',
            url: `${API_URL}/accounts/signup/`,
            data: {
            username, password1, password2
            }
        })
            .then((res) => {
            context.commit('SAVE_TOKEN', { token: res.data.key, username: payload.username })
            })
            .catch((err) => {
            console.log(err)
        })
        },
        login(context, payload) {
        const username = payload.username
        const password = payload.password

            axios({
                method: 'post',
                url: `${API_URL}/accounts/login/`,
                data: {
                username, password
                }
            })
                .then((res) => {
                context.commit('SAVE_TOKEN', { token: res.data.key, username: payload.username })
                })
            .catch((err) => console.log(err))
        },
        logout(context) {
            // 로그아웃 처리 로직
            axios({
                method: 'post',
                url: `${API_URL}/accounts/logout/`,
                headers: {
                Authorization: `Token ${context.state.token}`
                }
            })
                .then(() => {
                context.commit('CLEAR_TOKEN')
                })
                .catch((err) => {
                console.log(err)
                })
        },
        
    },
    modules: {
    }
}

export default loginStore