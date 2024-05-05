<template>
  <div class="container">
    <a href="/"><img src="/public/logo.png" alt="" /></a>
    <UDropdown
      v-if="user"
      :items="items"
      mode="hover"
      :popper="{ placement: 'bottom-start' }"
      class="profile"
    >
      <div class="flex items-center gap-2">
        <UAvatar
          chip-color="primary"
          :src="user.user_metadata.avatar_url"
          alt="Avatar"
          size="lg"
          chip-text=""
          chip-position="top-right"
        />
        <h1 class="text-[18px] font-semibold name">
          {{ user.user_metadata.displayName }}
        </h1>
      </div>
    </UDropdown>
    <div v-else class="buttons">
      <NuxtLink to="/login">Войти</NuxtLink>
      <NuxtLink to="/signup">Регистрация</NuxtLink>
    </div>
    <div class="mobile">
      <button @click="isOpen = true">
        <i class="fi fi-br-menu-burger"></i>
      </button>

      <USlideover
        v-model="isOpen"
        prevent-close
        :ui="{
          background: 'dark:bg-white',
        }"
      >
        <UCard
          class="flex flex-col flex-1"
          :ui="{
            body: { base: 'flex-1' },
            ring: '',
            divide: 'divide-y dark:divide-gray-200',
            background: 'dark:bg-white',
          }"
        >
          <template #header>
            <div class="flex items-center justify-between">
              <h3 class="text-base font-semibold leading-6 text-black">Меню</h3>
              <UButton
                color="black"
                variant="ghost"
                icon="i-heroicons-x-mark-20-solid"
                class="-my-1"
                @click="isOpen = false"
              />
            </div>
          </template>
          <div>
            <div class="flex flex-col justify-start gap-5">
              <a href="/#tabs" class="text-[20px] font-semibold">Задачи</a>
              <a href="/#games" class="text-[20px] font-semibold">Игры</a>
            </div>
          </div>
          <template #footer>
            <div v-if="user" class="flex justify-between">
              <div class="flex items-center gap-2" @click="profile">
                <UAvatar
                  chip-color="primary"
                  :src="user.user_metadata.avatar_url"
                  alt="Avatar"
                  size="lg"
                  chip-text=""
                  chip-position="top-right"
                />
                <h1 class="text-[18px] font-semibold name">
                  {{ user.user_metadata.displayName }}
                </h1>
              </div>
              <UButton @click="signOut" size="xl" variant="outline"
                >Выйти</UButton
              >
            </div>
            <div v-else class="flex flex-col gap-4">
              <UButton
                to="/login"
                size="xl"
                color="primary"
                variant="outline"
                block
                >Войти</UButton
              >
              <UButton to="/signup" size="xl" color="primary" block
                >Регистрация</UButton
              >
            </div>
          </template>
        </UCard>
      </USlideover>
    </div>
  </div>
</template>

<script lang="ts" setup>
const isOpen = ref(false);
const user = useSupabaseUser();
const supabase = useSupabaseClient();
const toast = useToast();

const profile = () => {
  navigateTo("/profile");
};

const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    toast.add({
      title: error.message,
      icon: "i-heroicons-x-mark-16-solid",
    });
  } else {
    toast.add({
      title: "Вы вышли из аккаунта",
      icon: "i-heroicons-check-badge",
    });
    navigateTo("/");
  }
};

const items = [
  [
    {
      label: "Профиль",
      click: () => {
        navigateTo("/profile");
      },
    },
  ],
  [
    {
      label: "Выйти",
      icon: "i-heroicons-trash-20-solid",
      click: () => {
        signOut();
      },
    },
  ],
];
</script>

<style lang="scss" scoped>
.container {
  i {
    font-size: 20px;
  }
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0 20px 0;
  @include respond-to(wide-tablets) {
    padding: 20px 20px 20px 20px;
  }
  .name {
    font-family: $font;
  }
  img {
    width: 60px;
  }
  .mobile {
    @include respond-to(wide-handhelds) {
      display: flex;
    }
    display: none;
  }
  .profile {
    @include respond-to(wide-handhelds) {
      display: none;
    }
    display: flex;
  }
  .buttons {
    @include respond-to(wide-handhelds) {
      display: none;
    }
    display: flex;
    gap: 5px;
    a {
      cursor: pointer;
      background-color: $bg-color;
      padding: 10px 20px 10px 20px;
      border-radius: 10px;
      font: {
        family: $font-secondary;
        weight: 500;
        size: 18px;
      }
      transition: 200ms ease-in;
      &:hover {
        background-color: $border-color;
      }
      &:last-child {
        background-color: $secondary-color;
        color: white;
        &:hover {
          background-color: $hover-color;
        }
      }
    }
  }
}
</style>
