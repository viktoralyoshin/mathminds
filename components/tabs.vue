<template>
  <UModal v-model="isOpen">
    <UCard
      :ui="{
        ring: '',
        divide: 'divide-y divide-gray-100 dark:divide-gray-800',
      }"
    >
      <template #header>
        <h3 class="font-semibold text-[18px]">{{ id }}. {{ name }}</h3>
      </template>
      <form class="flex flex-col gap-5" @submit.prevent="">
        <UInput
          padded
          v-for="input in placeholders"
          placeholder="{{input.placeholder}}"
        ></UInput>
      </form>
      <template #footer>
        <Placeholder class="h-8" />
      </template>
    </UCard>
  </UModal>
  <UTabs
    id="tabs"
    :items="items"
    :ui="{
      wrapper: 'mx-4',
      list: {
        background: 'dark:bg-[#F4F4F5]',
        marker: { background: 'dark:bg-white' },
        tab: {
          active: 'text-[#4655e5]',
          inactive: 'text-[#585860]',
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
            <p
              v-for="item in data"
              :key="item.id"
              @click="
                (isOpen = true),
                  (name = item.name),
                  (id = item.id),
                  (placeholders = item.placeholders)
              "
            >
              {{ item.id }}. {{ item.name }}
            </p>
          </div>
        </div>
      </UCard>
    </template>
  </UTabs>
</template>

<script setup lang="ts">
import data from "assets/data.json";

const isOpen = ref(false);
const name = ref();
const id = ref();
const placeholders = ref();

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
  p {
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
