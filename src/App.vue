<template>
  <component :is="layout">
  </component>
</template>
<script>
import AuthLayout from "@/layouts/AuthLayout";
import MainLayout from "@/layouts/MainLayout";

export default {
  components: {
    MainLayout,
    AuthLayout
  },
  computed: {
    layout() {
      return this.$route.meta.layout || 'AuthLayout'
    }
  }
}
</script>
<style lang="scss">
body{
  font-family: 'Inter', sans-serif;
  margin: 0;
  padding: 0;
}
</style>
