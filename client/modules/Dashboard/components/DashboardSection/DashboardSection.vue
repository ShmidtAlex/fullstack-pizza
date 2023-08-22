<template>
  <div class="section">
    <div v-if="isLoading" class="section__loader">
      <span class="loader"></span>
    </div>
    <div class="section__title">
      {{ localTitle }}
    </div>
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
  import { computed } from "vue";
  import { useAuthStore } from "~/modules/AuthorizationForm/store/AuthStore";

  const props = defineProps({
    title: {
      type: String,
      required: true
    },
    isLoading: {
      type: Boolean,
      default: false
    }
  })
  const authStore = useAuthStore()
  const localTitle = computed(() => {
    return authStore.isAdmin ? `${props.title} addition and updating` : `${props.title} updating`
  })
</script>

<style lang="scss" scoped>
@import "@/assets/css/loader.scss";

.section {
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  align-items: flex-start;
  width: 95%;
  box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.3);
  border-radius: 8px;
  padding: 16px;
  margin: 16px;
  position: relative;
  &:hover {
    box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.3);
  }
  &__loader {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    background-color: rgba(255, 255, 255, 0.6);
  }
  &__title {
    font-weight: 600;
    font-size: 18px;
    margin-bottom: 24px;
  }
}

</style>