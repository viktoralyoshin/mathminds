<template>
  <div class="main">
    <div class="header-container">
      <Navbar />
      <div class="header-info">
        <p>
          <span>MathMinds</span> <br />
          ваш надежный помощник в решении математических задач!
        </p>
        <p>расширьте свой математический потенциал</p>
      </div>
    </div>
    <div class="main-container">
      <Tabs />
      <div class="games" id="games">
        <h1>Игры</h1>
        <div class="games-container">
          <GameCard v-for="item in games" :key="item.id" :item="item" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import games from "assets/games.json";
</script>

<style lang="scss" scoped>
.main {
  display: flex;
  flex-direction: column;
  gap: 100px;
  .header-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 50px;
    .header-info {
      display: flex;
      flex-direction: column;
      gap: 20px;
      text-align: center;
      max-width: 90%;
      font: {
        size: 80px;
        weight: 600;
        family: $font;
      }
      @include respond-to(wide-tablets) {
        font-size: 40px;
      }
      span {
        color: $secondary-color;
      }
      p:last-child {
        color: $secondary-text;
        font: {
          weight: 500;
          size: 32px;
        }
        @include respond-to(wide-tablets) {
          font-size: 18px;
        }
      }
    }
  }
  .main-container {
    display: flex;
    flex-direction: column;
    gap: 50px;
    padding-bottom: 50px;
    .games {
      display: flex;
      flex-direction: column;
      gap: 20px;
      h1 {
        font: {
          weight: 600;
          size: 36px;
        }
        @include respond-to(wide-tablets) {
          padding-left: 20px;
        }
      }

      .games-container {
        display: grid;
        gap: 30px;
        grid-template-columns: repeat(auto-fill, 350px);
        justify-content: center;
      }
    }
  }
}
</style>
