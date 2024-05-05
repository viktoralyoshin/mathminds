<template>
  <div
    class="cursor-pointer hover:shadow-2xl transition-all duration-500 rounded-xl p-4 justify-between"
    @click="gameNavigation()"
  >
    <h1 class="font-semibold">{{ game.item.name }}</h1>
    <p>&#9889; {{ data.record }}</p>
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
