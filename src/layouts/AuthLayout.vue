<template>
  <div class="auth">
    <NavBar/>
    <router-view></router-view>
  </div>
</template>

<script>
import NavBar from "@/components/app/NavBar";

export default {
  name: "AuthLayout",
  components: {
    NavBar
  }
}
</script>

<style scoped>

</style>
