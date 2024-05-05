<template>
  <div>
    <Navbar />
    <div class="w-full flex justify-center align-center">
      <div class="sm:w-1/2 w-2/3 inline-block relative">
        <Transition name="slide-up" mode="out-in">
          <div v-if="!isStart" class="absolute mx-auto">
            <UCard>
              <template #header>
                <h1 class="font-semibold">{{ games[4].name }}</h1>
              </template>
              <div class="sm:h-[150px] h-[200px]">
                <p>{{ games[4].desc }}</p>
              </div>
              <template #footer>
                <UButton
                  v-if="!isLoading"
                  icon="i-heroicons-play"
                  size="lg"
                  color="primary"
                  variant="outline"
                  @click="onSubmit"
                  >Начать</UButton
                >
                <UButton
                  v-else
                  icon="i-heroicons-play"
                  size="lg"
                  color="primary"
                  variant="outline"
                  loading
                  >Начинаем</UButton
                >
              </template>
            </UCard>
          </div>
          <div v-else class="absolute mx-auto sm:w-[350px] w-[300px]">
            <UCard>
              <template #header>
                <h1 class="font-semibold">{{ games[4].name }}</h1>
              </template>
              <div class="flex flex-col gap-3">
                <div class="flex justify-end">
                  <div class="flex flex-col gap-1 items-center hidden">
                    <p class="font-semibold text-[14px] opacity-70">Время</p>
                    <h1>{{ timeOut }}</h1>
                  </div>
                  <div class="flex flex-col gap-1 items-center">
                    <p class="font-semibold text-[14px] opacity-70">Счёт</p>
                    <h1>&#9889;{{ count }}</h1>
                  </div>
                </div>
                <UForm class="space-y-4" @submit="onSubmit">
                  <UFormGroup>
                    <UInput
                      disabled
                      v-model="fun"
                      size="xl"
                      class="font-semibold"
                    />
                  </UFormGroup>
                  <UFormGroup label="Введите ДНФ (с пробелами)">
                    <UTextarea
                      placeholder="(!x1 & !x2) | (!x1 & x2)"
                      v-model="input.input"
                      size="xl"
                      class="font-semibold"
                    />
                  </UFormGroup>
                  <UButton
                    v-if="!isLoading"
                    size="lg"
                    color="primary"
                    variant="outline"
                    @click="onAsk"
                    >Ответить</UButton
                  >
                  <UButton
                    v-else
                    size="lg"
                    color="primary"
                    variant="outline"
                    loading
                    >Отправляем</UButton
                  >
                </UForm>
              </div>
            </UCard>
          </div>
        </Transition>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { setInterval } from "#imports";
import type { FormError, FormSubmitEvent } from "#ui/types";
import games from "assets/games.json";

const supabase = useSupabaseClient();
const user = useSupabaseUser();
const toast = useToast();
const isStart = ref(false);
const isLoading = ref(false);
const fun = ref();

const state = reactive({
  input: "",
});

const time = ref(0);
const timeOut = ref("");
const count = ref(0);

const input = reactive({
  input: "",
  func: fun,
});

const { data: game } = await supabase
  .from("games")
  .select()
  .eq("game_id", games[4].id)
  .eq("user_id", user.value?.id)
  .single();

async function onSubmit() {
  input.input = "";
  state.input = Math.floor(Math.random() * 2 + 2) + "";
  isLoading.value = true;
  const res = await $fetch(`http://92.53.105.185:7000/create-function`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(state),
  });
  fun.value = res;
  isLoading.value = false;
  isStart.value = true;
}

async function onAsk(event: FormSubmitEvent<any>) {
  isLoading.value = true;
  const response = await $fetch(`http://92.53.105.185:7000/6`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  });
  if (response == "Неправильно!") {
    toast.add({
      title: "Неправильный ответ!",
      icon: "i-heroicons-x-mark-16-solid",
    });
    isLoading.value = false;
    isStart.value = false;
    input.input = "";

    if (count.value > game.record) {
      const { data, error } = await supabase
        .from("games")
        .update({ record: count.value })
        .eq("game_id", games[4].id)
        .eq("user_id", user.value?.id);
    }
    count.value = 0;
  } else {
    toast.add({
      title: "Правильный ответ!",
      icon: "i-heroicons-check-badge",
    });
    count.value++;
    onSubmit();
  }
}
</script>

<style>
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.5s ease-out;
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}
</style>
