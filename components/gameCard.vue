<template>
  <div
    class="w-[350px] cursor-pointer hover:shadow-2xl transition-all duration-500"
    @click="gameNavigation()"
  >
    <UCard class="w-full">
      <template #header>
        <div class="h-[80px]">
          <h1 class="font-semibold">{{ game.item.name }}</h1>
        </div>
      </template>
      <div class="h-[170px]">
        <p>{{ game.item.desc }}</p>
      </div>
      <template #footer v-if="user">
        <p class="font-semibold text-[14px] opacity-70">Лучший результат</p>
        <p>&#9889; {{ data.record }}</p>
      </template>
    </UCard>
  </div>
</template>

<script lang="ts" setup>
const game = defineProps(["item"]);

const supabase = useSupabaseClient();

const user = useSupabaseUser();

const { data } = await supabase
  .from("games")
  .select()
  .eq("game_id", game.item.id)
  .eq("user_id", user.value?.id)
  .single();

const gameNavigation = () => {
  if (!user.value) {
    navigateTo("/login");
  } else {
    navigateTo(`/games/${game.item.id}`);
  }
};
</script>

<style></style>
