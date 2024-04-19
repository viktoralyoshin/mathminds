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
    </div>
  </div>
</template>

<script lang="ts" setup>
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
}
</style>
