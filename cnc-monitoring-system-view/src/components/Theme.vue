<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'
const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>

<template>
  <button @click="toggleDark()">
    <el-icon v-if="isDark">
      <Sunny />
    </el-icon>
    <el-icon v-else>
      <Moon />
    </el-icon>

    <span>{{ isDark ? 'Light' : 'Dark' }}</span>

  </button>
</template>

