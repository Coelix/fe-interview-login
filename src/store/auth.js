export default {
    actions:{
        async login({commit},{email,password}) {
            // simple code for test
            if(email === 'test@email.com' && password === 'test123'){
                localStorage.user = email
            } else {
                commit('setError', 'Some text with error')
                throw 'Error'
            }
        },
        async logout(){
            localStorage.removeItem('user')
        }
    }
}
