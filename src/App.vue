<template>
  <div class="draggable"></div>
  <router-view />
</template>

<script setup lang="ts">

</script>
<style>
.draggable{
  -webkit-app-region: drag;
  position: absolute;
  height: 20px;
  width: 100vw;
}
</style>
