<template>
  <div class="user">
    {{ user.id }}
    {{ user.email }}
    {{ user.role }}
  </div>
</template>

<script lang="ts" setup>
  import {PropType} from "vue";
  import {IUser} from "~/modules/Dashboard/types";

  const props = defineProps({
    user: {
      type: Object as PropType<IUser>,
      required: true
    }
  })
  const emit = defineEmits(['remove', 'redact'])
  const remove = (id) => {
    emit('remove', id)
  }
  const redact = (payload) => {
    emit('redact', payload)
  }
</script>

<style scoped>

</style>