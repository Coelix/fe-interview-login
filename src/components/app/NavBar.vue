<template>
  <div class="navbar">
    <div class="navbar-logo">
      <img src="@/assets/logo.svg" alt="logo">
    </div>
    <div class="navbar-link">
      <span class="navbar-link_text">
        New user?
      </span>
      <router-link class="navbar-link_link" to="/signup">
        <span>Sign Up</span>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavBar"
}
</script>

<style lang="scss" scoped>
@import "@/styles/colors";
@import "@/styles/text-sizes";
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 32px;

  &-link{
    font-size: $link-reg_font-size;
    line-height: $link-reg_line-height;
    font-weight: 500;
    &_text{
      color: $clr-typo-hints;
    }
    &_link{
      color: $clr-typo-titles;
      text-decoration: none;
      cursor: pointer;
      &:hover{
        color: $clr-primary-blue;
      }
    }
  }
}
</style>
