<template>
  <div class="login">
    <div class="login-title">
      Log in with EdgeKit
    </div>
    <form @submit.prevent="login">
      <div class="login-input-wrap">
        <input
            v-model.trim="email"
            @focus="clearError"
            class="login-input"
            id="email"
            :class="{invalid: ($v.email.$dirty && !$v.email.required) ||  ($v.email.$dirty && !$v.email.email)}"
            placeholder="Work email"
            type="text"
        >
        <div
            v-show="($v.email.$dirty && !$v.email.required) ||  ($v.email.$dirty && !$v.email.email)" class="login-error"
        >
          This is email is badly formatted.
        </div>
      </div>
      <div class="login-input-wrap">
        <input
            v-model.trim="password"
            @focus="clearError"
            class="login-input"
            id="password"
            :class="{invalid: ($v.password.$dirty && !$v.password.required) ||  ($v.password.$dirty && !$v.password.minLength)|| (this.$store.getters.error)}"
            placeholder="Password"
            type="password"
        >
        <div
            v-show="checkPassword"
            class="login-error password"
        >
          The password is invalid or the user doesn’t have a password.
        </div>
        <router-link
            class="login-forgot"
            to="/reset"
        >
          Forgot password?
        </router-link>
      </div>
      <button class="login-button" :class="{inactive : !activeButton}" type="submit">Save</button>
    </form>
  </div>
</template>

<script>
import {required, email, minLength} from "vuelidate/lib/validators"

export default {
  name: "Login",
  data() {
    return {
      email: null,
      password: null
    }
  },
  validations: {
    email: {required, email},
    password: {required, minLength: minLength(6)},
  },
  methods: {
    async login() {
      if(this.$v.$invalid){
        this.$v.$touch()
        return
      }
      try {
        await this.$store.dispatch('login',{email : this.email, password : this.password}).then(()=>this.$router.push('/'))

      } catch (e) {
        console.log(e)
      }

    },
    clearError(){
      this.$store.commit('clearError')
      this.$v.$reset()
    },
  },
  computed:{
    checkPassword(){
      return (this.$v.password.$dirty && !this.$v.password.required) ||  (this.$v.password.$dirty && !this.$v.password.minLength) || (this.$store.getters.error)
    },
    activeButton(){
      return this.email && this.password
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/colors';
@import '@/styles/text-sizes';
.login {
  margin-top: 80px;
  margin-left: 328px;

  &-title{
    color: $clr-typo-titles;
    font-size: $h2-max_font-size;
    line-height: $h2-max_line-height;
    max-width: 290px;
    margin-bottom: 40px;
  }
  &-input{
    background: #FFFFFF;
    border: 1px solid #D6D6D6;
    box-sizing: border-box;
    border-radius: 6px;
    padding: 24px;
    width: 512px;
    margin-bottom: 24px;
    &::placeholder{
      color: rgba(23, 23, 23, 0.5);
      font-size: $link-reg_font-size;
    }

    &:active{
      border-color: $clr-primary-blue;
    }
    &.invalid{
      border-color: $clr-notify-alert;
    }


    &-wrap{
      display: flex;
      align-items: center;
    }
  }
  &-button{
    background: $clr-typo-titles;
    border: none;
    color: #FFFFFF;
    padding: 24px;
    width: 512px;
    border-radius: 6px;
    cursor: pointer;
    &.inactive{
      background-color: $clr-primary-disabled;
      pointer-events: none;
    }
  }
  &-error {

    margin-bottom: 23px;
    margin-left: 48px;
    color: $clr-notify-alert;
    max-width: 280px;
    &.password{
      padding-right: 28px;
      border-right: 1px solid #D6D6D6;
    }
  }
  &-forgot{
    max-width: 95px;
    color: $clr-primary-blue;
    cursor: pointer;
    text-decoration: none;
    margin-bottom: 23px;
    margin-left: 28px;
  }
}
</style>
