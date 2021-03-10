<template>
  <div class="reset">
    <div class="reset-title">
      Forgot password?
    </div>
    <div class="reset-info">
      Enter the email address you’ve signed up with
      and we’ll send the reset link to your inbox.
    </div>
    <form class="reset-form" @submit.prevent="reset">
      <div class="reset-input-wrap">
        <input
            v-model.trim="email"
            @focus="clearError"
            class="reset-input"
            :class="{invalid: ($v.email.$dirty && !$v.email.required) ||  ($v.email.$dirty && !$v.email.email)}"
            placeholder="Work email"
            type="text"
        >
        <div
            v-show="($v.email.$dirty && !$v.email.required) ||  ($v.email.$dirty && !$v.email.email)" class="reset-error"
        >
          This is email is badly formatted.
        </div>
      </div>

      <button class="reset-button" :class="{inactive : !activeButton}" type="submit">Reset password</button>
      <div class="reset-wrap">
        <span href="#" class="reset-back" @click="$router.go(-1)">Go Back</span>
      </div>
    </form>

  </div>

</template>

<script>
import {required, email} from "vuelidate/lib/validators"

export default {
  name: "Reset",
  data() {
    return {
      email: null
    }
  },
  validations: {
    email: {required, email}
  },
  methods: {
    async reset() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      try {
        // skip page with successful send email
       this.$router.push('/createPassword')
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
      return this.email
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
  &form{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  &-title {
    color: $clr-typo-titles;
    font-size: $h2-max_font-size;
    line-height: $h2-max_line-height;
    max-width: 290px;
    margin-bottom: 22px;
  }
  &-info{
    max-width: 512px;
    margin-bottom: 40px;
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

  &-error {
    margin-bottom: 23px;
    margin-left: 48px;
    color: $clr-notify-alert;
    max-width: 280px;
  }
  &-wrap{
    margin-top: 24px;
    display: flex;
    justify-content: center;
    width: 512px;
    align-items: center;
    .reset-back{
      text-decoration: none;
      color: $clr-primary-blue;
      cursor: pointer;
    }
  }
}
</style>
