<script lang="ts" setup>
import { useDevice } from "@/composables/useDevice"
import { useLayoutMode } from "@/composables/useLayoutMode"
import { useResize } from "@/composables/useResize"
import { useWatermark } from "@/composables/useWatermark"
import { useSettingsStore } from "@/pinia/stores/settings"
import LeftMode from "./modes/LeftMode.vue"

// Layout 布局响应式
useResize()

const { setWatermark, clearWatermark } = useWatermark()

const { isMobile } = useDevice()

const { isLeft } = useLayoutMode()

const settingsStore = useSettingsStore()

const { showWatermark } = storeToRefs(settingsStore)

// 开启或关闭系统水印
watchEffect(() => {
  showWatermark.value ? setWatermark(import.meta.env?.VITE_APP_WATERMARK) : clearWatermark()
})
</script>

<template>
  <div>
    <LeftMode v-if="isLeft || isMobile" />
  </div>
</template>
