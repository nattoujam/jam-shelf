<script setup lang="ts">
function handleLogin() {
  const rd = encodeURIComponent(window.location.origin)
  window.location.href = `${import.meta.env.VITE_AUTH_URL}/?rd=${rd}`
}
</script>

<template>
  <section class="section">
    <div class="container">
      <h1 class="title">Jam Shelf</h1>
      <div class="buttons">
        <RouterLink class="button is-light" to="/sku/list">List</RouterLink>
        <button class="button is-primary" @click="handleLogin">
          <span class="icon">
            <i class="fas fa-shield-halved"></i>
          </span>
          <span>Authelia でログイン</span>
        </button>
      </div>
    </div>
  </section>
</template>
