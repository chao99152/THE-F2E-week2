<template>
  <div class="pt-[60px]">
    <NavVue />
    <router-view v-slot="{ Component }" :key="$route.path">
      <transition name="route" mode="out-in" appear>
        <component :is="Component"></component>
      </transition>
    </router-view>
  </div>
</template>

<script setup lang="ts">
import NavVue from './components/Nav.vue';
</script>

<style>
.route-enter-from,
.route-leave-to {
  opacity: 0;
}

.route-enter-active {
  transition: all 1s ease;
}

.route-leave-active {
  transition: all 1s ease;
}


.scrollbarnone::-webkit-scrollbar {
  display: none;
}

.scrollbarnone {
  scrollbar-width: none;
  /* Firefox */
  -ms-overflow-style: none;
  /* IE 10+ */
}
</style>