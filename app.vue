<template>
  <link
    rel="stylesheet"
    href="https://cdn-uicons.flaticon.com/2.2.0/uicons-bold-rounded/css/uicons-bold-rounded.css"
  />
  <NuxtPage :transition="{ name: 'page', mode: 'out-in'}"/>
  <UNotifications />
</template>
<script lang="ts" setup>
useHead({
  title: "MathMinds",
  meta: [
    {
      name: "description",
      content: "",
    },
  ],
});
</script>
<style lang="scss">
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
}
</style>
