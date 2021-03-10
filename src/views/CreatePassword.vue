<template>
  <div class="reset">
    <div class="reset-title">
      Create new password
    </div>
    <form class="reset-form" @submit.prevent="reset">
      <div class="reset-input-wrap">
        <input
            v-model.trim="password"
            @focus="clearError"
            class="reset-input"
            :class="{invalid: ($v.password.$dirty && !$v.password.required) ||  ($v.password.$dirty && !$v.password.minLength)}"
            placeholder="Create new password"
            type="text"
        >
        <div class="reset-info">Password must contain
          8+ characters
        </div>
      </div>
      <div class="reset-input-wrap">
        <input
            v-model.trim="passwordConfirm"
            @focus="clearError"
            class="reset-input"
            :class="{invalid: ($v.passwordConfirm.$dirty && !$v.passwordConfirm.required) ||  ($v.passwordConfirm.$dirty && !$v.passwordConfirm.sameAsPassword) }"
            placeholder="Repeat new password"
            type="text"
        >
        <div
            v-show="($v.passwordConfirm.$dirty && !$v.passwordConfirm.required) ||  ($v.passwordConfirm.$dirty && !$v.passwordConfirm.sameAsPassword)" class="reset-error"
        >
          Please enter same password
        </div>
      </div>
      <div class="password-strength">
        <div class="password-strength_block" :class="{strength : strengthPassword >= 1}"></div>
        <div class="password-strength_block" :class="{strength : strengthPassword >= 2}"></div>
        <div class="password-strength_block" :class="{strength : strengthPassword == 3}"></div>
      </div>
      <button class="reset-button" :class="{inactive : !activeButton}" type="submit">Save new password</button>
    </form>

  </div>

</template>

<script>
import {minLength, required, sameAs} from "vuelidate/lib/validators"

export default {
  name: "CreatePassword",
  data() {
    return {
      password: null,
      passwordConfirm: null
    }
  },
  validations: {
    password: {
      required,
      minLength: minLength(8)
    },
    passwordConfirm: {
      required,
      sameAsPassword: sameAs('password')
    }
  },
  methods: {
    async reset() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      try {
        // skip page with successful send email
        this.$router.push('/resetPassword')
      } catch (e) {
        console.log(e)
      }

    },
    clearError() {
      this.$store.commit('clearError')
      this.$v.$reset()
    },
  },
  computed: {
    activeButton() {
      return this.password && this.passwordConfirm
    },
    strengthPassword(){
      // simple sample for strength password
      let score
      if(this.password?.length > 8 && this.password?.length < 13){
        score = 1
      }
      if(this.password?.length >= 13 && this.password?.length < 19){
        score = 2
      }
      if(this.password?.length >= 19 && this.password?.length < 24){
        score = 3
      }
      return score
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/colors';
@import '@/styles/text-sizes';

.reset {
  margin-top: 80px;
  margin-left: 328px;

  &form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  &-title {
    color: $clr-typo-titles;
    font-size: $h2-max_font-size;
    line-height: $h2-max_line-height;
    margin-bottom: 22px;
  }
 &-info{
   color: #A8A8A8;
   margin-left: 48px;
   max-width: 170px;
   margin-bottom: 27px;
 }
  &-error {
    margin-bottom: 23px;
    margin-left: 48px;
    color: $clr-notify-alert;
    max-width: 280px;
  }
  &-input {
    background: #FFFFFF;
    border: 1px solid #D6D6D6;
    box-sizing: border-box;
    border-radius: 6px;
    padding: 24px;
    width: 512px;
    margin-bottom: 24px;

    &::placeholder {
      color: rgba(23, 23, 23, 0.5);
      font-size: $link-reg_font-size;
    }

    &:active {
      border-color: $clr-primary-blue;
    }

    &.invalid {
      border-color: $clr-notify-alert;
    }

    &-wrap {
      display: flex;
      align-items: center;
    }
  }

  &-button {
    background: $clr-typo-titles;
    border: none;
    color: #FFFFFF;
    padding: 24px;
    width: 512px;
    border-radius: 6px;
    cursor: pointer;

    &.inactive {
      background-color: $clr-primary-disabled;
      pointer-events: none;
    }
  }
}
.password-strength{
  width: 512px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 40px;
  &_block{
    width: 166px;
    height: 4px;
    background: #E2E2E2;
    border-radius: 40px;
    &.strength{
      background: $clr-primary-blue;
    }
  }
}
</style>
