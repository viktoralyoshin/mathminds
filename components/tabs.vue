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
      <UTextarea
        disabled
        placeholder="Ответ"
        size="md"
        :ui="{ size: { md: 'text-base' } }"
        class="font-semibold"
      />
      <template #footer>
        <UForm ref="form" :state="state" class="space-y-4" @submit="onSubmit">
          <UFormGroup>
            <UInput
              :placeholder="labels.placeholder"
              v-model="state.input"
              size="xl"
              class="font-semibold"
            />
          </UFormGroup>
          <UButton size="xl" type="submit"> Отправить </UButton>
        </UForm>
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
                  (labels = item.labels),
                  (state.id = item.id)
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
import type { FormError, FormSubmitEvent } from "#ui/types";

const isOpen = ref(false);
const name = ref();
const id = ref();
const labels = ref();

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

const state = reactive({
  id: 0,
  input: "",
});

const form = ref();

//нужно убрать возможность нажимать кнопку, пока не придёт ответ с сервера (добавить атрибут loading)
async function onSubmit(event: FormSubmitEvent<any>) {
  form.value.clear();
  try {
    const response = await $fetch(`http://127.0.1.109:18080/`, {
      method: "POST",
      mode: "no-cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(state),
    })
    .then((response: any) => response.json())
    .then((answer: any) => console.log(answer))
  } catch (e: any) {
    if (e.statusCode === 422) {
      form.value.setErrors(
        e.data.errors.map((e: any) => ({
          // Map validation errors to { path: string, message: string }
          message: e.message,
          path: e.path,
        }))
      );
    }
  }
}
</script>

<style lang="scss" scoped>
.item-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
  p {
    cursor: pointer;
    font: {
      size: 18px;
      weight: 500;
    }
    @include respond-to(wide-tablets) {
      p {
        font-size: 14px;
      }
    }
    transition: 200ms ease-in;
    &:hover {
      color: $secondary-color;
      opacity: 1;
    }
  }
}
</style>
