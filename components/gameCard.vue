<template>
  <div class="w-[400px] cursor-pointer" @click="navigateTo('/profile')">
    <UTooltip
      text="Играть"
      class="w-full"
      :popper="{ offsetDistance: 16}"
      :ui="{
        base: 'text-sm h-7'
      }"
      ><UCard class="w-full">
        <template #header>
          <h1 class="font-semibold">Узнать имя функции от 2-х аргументов.</h1>
        </template>
        <template #footer>
          <UAlert
            icon="i-heroicons-star"
            color="primary"
            variant="outline"
            title="Лучший результат"
            description="12"
            ><template #icon="{ icon }"> <UIcon :name="icon" /> </template
          ></UAlert>
        </template> </UCard
    ></UTooltip>
  </div>
</template>

<script lang="ts" setup></script>

<style></style>
