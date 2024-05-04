<template>
  <div class="page-container">
    <NuxtLink to="/"
      ><img src="/public/logo.png" alt="" width="50px">
      <p>MathMinds</p></NuxtLink
    >
    <div class="container">
      <UForm
        ref="form"
        class="space-y-4 items-center"
        :state="userInfo"
        @submit="signIn"
      >
        <h1>Вход</h1>
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
        <NuxtLink to="/signup"> Нет аккаунта? Создать аккаунт</NuxtLink>
        <UButton v-if="isLogin" size="xl" type="submit" loading> Вход </UButton>
        <UButton v-else size="xl" type="submit"> Войти </UButton>
      </UForm>
    </div>
  </div>
</template>

<script lang="ts" setup>
const supabase = useSupabaseClient();

const toast = useToast();

const form = ref();

const isLogin = ref(false);

const userInfo = reactive({
  email: "",
  password: "",
});

const signIn = async () => {
  isLogin.value = true;
  const { data, error } = await supabase.auth.signInWithPassword({
    email: userInfo.email,
    password: userInfo.password,
  });
  if (error) {
    toast.add({ title: error.message, icon: "i-heroicons-x-mark-16-solid" });
  } else {
    toast.add({
      title: "Вы вошли в аккаунт!",
      icon: "i-heroicons-check-badge",
    });
    isLogin.value = false;
    navigateTo("/");
  }
};
</script>

<style lang="scss">
.page-container {
  display: flex;
  flex-direction: column;
  padding: 20px 20px 20px 20px;
  height: 100vh;
  a {
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
