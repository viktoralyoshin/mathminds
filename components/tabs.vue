<template>
  <UTabs
    id="tabs"
    :items="items"
    :ui="{
      wrapper: 'mx-4',
      list: {
        background: 'dark:bg-[#F4F4F5]',
        marker: { background: 'dark:bg-white' },
        tab: {
          active: 'dark:text-[#4655e5]',
          inactive: 'dark:text-[#585860]',
          font: 'font-bold',
          size: 'text-[18px]',
        },
      },
    }"
  >
    <template #item="{ item }">
      <UCard
        :ui="{
          background: 'dark:bg-white',
          ring: 'dark:ring-[#dddddd]',
          divide: 'dark:divide-[#dddddd]',
        }"
      >
        <template #header>
          <p class="text-[24px] font-bold leading-6 dark:primary">
            {{ item.label }}
          </p>
          <p class="mt-1 text-[16px] text-[#585860] font-semibold">
            {{ item.description }}
          </p>
        </template>

        <div v-if="item.key === 'fuction'" class="space-y-3">
          <div class="item-container">
            <a>1. Булева функция от n аргументов</a>
            <a>1. Булева функция от n аргументов</a>
            <a>1. Булева функция от n аргументов</a>
          </div>
        </div>
      </UCard>
    </template></UTabs
  >
</template>

<script setup lang="ts">
const items = [
  {
    key: "fuction",
    label: "Булевы функции",
    description: "Задачи по булевым функциям",
  },
  {
    key: "graph",
    label: "Графы",
    description: "Задачи по графам",
  },
];
</script>

<style lang="scss" scoped>
.item-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
  a {
    cursor: pointer;
    font: {
      size: 20px;
      weight: 500;
    }
    transition: 200ms ease-in;
    &:hover {
      color: $secondary-color;
      opacity: 1;
    }
  }
}
</style>
