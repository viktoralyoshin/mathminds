<template>
  <div class="page">
    <NuxtLink to="/"
      ><img src="/public/logo.png" alt="" />
      <p>MathMinds</p></NuxtLink
    >
    <div class="container">
      <UForm
        ref="form"
        class="space-y-4 items-center"
        :state="userInfo"
        @submit="signUp"
      >
        <h1>Создать аккаунт</h1>
        <UFormGroup class="font-semibold" label="Имя" name="name" required>
          <UInput
            placeholder="Иван"
            v-model="userInfo.displayName"
            size="lg"
            class="font-semibold"
            icon="i-heroicons-user"
          />
        </UFormGroup>
        <UFormGroup class="font-semibold" label="Email" name="email" required>
          <UInput
            placeholder="example@gmail.com"
            v-model="userInfo.email"
            size="lg"
            class="font-semibold"
            icon="i-heroicons-envelope"
          />
        </UFormGroup>

        <UFormGroup
          class="font-semibold"
          label="Пароль"
          name="password"
          required
        >
          <UInput
            v-model="userInfo.password"
            size="lg"
            class="font-semibold"
            type="password"
            icon="i-heroicons-lock-closed"
          />
        </UFormGroup>
        <NuxtLink to="/login" class="text-indigo-500"> Уже есть аккаунт? Войти</NuxtLink>
        <UButton v-if="isLoading" size="xl" type="submit" loading>
          Идёт создание
        </UButton>
        <UButton v-else size="xl" type="submit"> Создать аккаунт </UButton>
      </UForm>
    </div>
  </div>
</template>

<script lang="ts" setup>
import games from "assets/games.json";

const supabase = useSupabaseClient();

const toast = useToast();
const form = ref();
const isLoading = ref(false);

const userInfo = reactive({
  displayName: "",
  email: "",
  password: "",
});

const signUp = async () => {
  isLoading.value = true;
  const { data, error } = await supabase.auth.signUp({
    email: userInfo.email,
    password: userInfo.password,
    options: {
      data: {
        displayName: userInfo.displayName,
        avatar_url: "https://avatar.iran.liara.run/public/boy",
      },
    },
  });
  if (error) {
    toast.add({ title: error.message, icon: "i-heroicons-x-mark-16-solid" });
  } else {
    for (let i = 1; i <= games.length; i++) {
      const { error } = await supabase
        .from('games')
        .insert({ user_id: data.user?.id, game_id: i, record: 0 }).single();
    }
    toast.add({
      title: "Регистрация прошла успешно!",
      icon: "i-heroicons-check-badge",
    });
    navigateTo("/");
  }
  isLoading.value = false;
};
</script>

<style lang="scss">
.page {
  display: flex;
  flex-direction: column;
  padding: 20px 20px 20px 20px;
  height: 100vh;
  a {
    position: relative;
    display: flex;
    gap: 20px;
    align-items: center;
    p {
      font: {
        family: $font;
        weight: 600;
        size: 28px;
      }
    }
    img {
      width: 50px;
    }
  }
  .container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 60px;
    width: 50%;
    height: 100%;
    @include respond-to(wide-handhelds) {
      width: auto;
    }
    h1 {
      font: {
        family: $font;
        weight: 600;
        size: 28px;
      }
    }
  }
}
</style>
