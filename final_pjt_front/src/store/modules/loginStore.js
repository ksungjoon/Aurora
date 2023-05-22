
import axios from 'axios'
import router from '@/router'

const API_URL = 'http://127.0.0.1:8000'

const loginStore ={
    state: {
        token:null,
        username:null,
        profile: {},
    },
    getters: {
        isLogin(state) {
        return state.token ? true : false
        },
        getUsername(state) {
            return state.username;
          },
        profile (state) {
            return state.profile
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
        SET_PROFILE (state, profile) {
            state.profile = profile
            console.log('hello')
            console.log(profile)
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
        fetchProfile(context, username) {
            axios({
              url:`${API_URL}/accounts/profile/${username}/`,
              method: 'get',
              headers: {Authorization: `Token ${context.state.token}`}
            })
              .then(res => {
                console.log('hi')
                context.commit('SET_PROFILE', res.data)
              })
              .catch(err => {
                console.log(err)
                // if (err.response.status === 404) {
                //   router.push({ name: 'NotFound404' })
                // }
              })
            },
        
    },
    modules: {
    }
}

export default loginStore