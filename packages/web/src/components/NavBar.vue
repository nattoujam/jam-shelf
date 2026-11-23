<script setup lang="ts">
import { RouterLink, useRouter } from 'vue-router'
import { authClient } from '@/utils/authClient'

const router = useRouter()
const session = authClient.useSession()

async function handleLogout() {
  await authClient.signOut({ callbackURL: `${window.location.origin}/` })
  router.push('/')
}
</script>

<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <RouterLink class="navbar-item is-size-4 has-text-weight-bold title-font" to="/">
        Jam Shelf
      </RouterLink>

      <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div v-if="session.data" class="navbar-end">
      <div class="navbar-item">{{ session.data.user.name }}</div>
      <div class="navbar-item">
        <button class="button is-light" @click="handleLogout">ログアウト</button>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.title-font {
  font-family: 'Helvetica';
}
</style>
