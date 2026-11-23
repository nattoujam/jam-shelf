<script setup lang="ts">
import { authClient } from '@/utils/authClient'

const session = authClient.useSession()

function handleLogin() {
  authClient.signIn.social({
    provider: 'pocket-id',
    callbackURL: `${window.location.origin}/sku/list`,
  })
}
</script>

<template>
  <section class="section">
    <div class="container">
      <h1 class="title">Jam Shelf</h1>
      <div class="buttons">
        <RouterLink class="button is-light" to="/sku/list">List</RouterLink>
        <button v-if="!session.data" class="button is-primary" @click="handleLogin">
          <span class="icon">
            <i class="fas fa-shield-halved"></i>
          </span>
          <span>Pocket ID でログイン</span>
        </button>
      </div>
    </div>
  </section>
</template>
