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
      <template #footer>
        <UForm ref="form" :state="state" class="space-y-4" @submit="onSubmit">
          <UFormGroup>
            <UTextarea
              :placeholder="labels.placeholder"
              v-model="state.input"
              size="xl"
              class="font-semibold"
            />
          </UFormGroup>
          <UTextarea
            disabled
            placeholder="Ответ"
            size="md"
            :ui="{ size: { md: 'text-base' }, base: 'disabled:opacity-100' }"
            class="font-semibold"
            v-model="response"
          />
          <UButton v-if="isLoading" size="xl" type="submit" loading>Ждём ответ</UButton>
          <UButton v-else size="xl" type="submit">Отправить</UButton>
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
              :key="item.id_problem"
              @click="
                (isOpen = true),
                  (name = item.name),
                  (id = item.id_problem),
                  (labels = item.labels),
                  (state.id = item.id),
                  (state.input = ''),
                  (response = '')
              "
            >
              {{ item.id_problem }}. {{ item.name }}
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
const isLoading = ref(false);

const items = [
  {
    key: "fuction",
    label: "Булевы функции",
    description: "Задачи по булевым функциям",
  },
];

const state = reactive({
  id: 0,
  input: "",
});

const form = ref();

const response = ref();

//нужно убрать возможность нажимать кнопку, пока не придёт ответ с сервера (добавить атрибут loading)
async function onSubmit(event: FormSubmitEvent<any>) {
  isLoading.value = true;
  form.value.clear();
  const res = await $fetch(`http://92.53.105.185:7000/`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(state),
  });
  response.value = res;
  isLoading.value = false;
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
