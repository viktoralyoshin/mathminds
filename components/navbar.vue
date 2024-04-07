<template>
  <div class="container">
    <img src="/public/logo.png" alt="" />
    <div class="buttons">
      <button type="button">Войти</button>
      <button type="button">Регистрация</button>
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
              <a href="#tabs" class="text-[20px] font-semibold">Задачи</a>
              <a href="#tabs" class="text-[20px] font-semibold">Статьи</a>
            </div>
          </div>
          <template #footer>
            <div class="flex gap-4 justify-between">
              <button
                type="button"
                class="rounded-md ring-2 ring-[#4655e5] text-[#4655e5] w-1/2 py-4 text-[18px] font-semibold"
              >
                Войти
              </button>
              <button
                type="button"
                class="rounded-md ring-2 ring-[#4655e5] bg-[#4655e5] text-white w-1/2 py-4 text-[18px] font-semibold"
              >
                Регистрация
              </button>
            </div>
          </template>
        </UCard>
      </USlideover>
    </div>
  </div>
</template>

<script lang="ts" setup>
const isOpen = ref(false);
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
  img {
    width: 70px;
  }
  .links {
    display: flex;
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
  .mobile {
    @include respond-to(wide-handhelds) {
      display: flex;
    }
    display: none;
  }
  .buttons {
    @include respond-to(wide-handhelds) {
      display: none;
    }
    display: flex;
    gap: 10px;
    border-radius: 10px;
    padding: 10px;
    border: 2px solid $border-color;
    button {
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
