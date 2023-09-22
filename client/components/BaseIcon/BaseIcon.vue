<template>
  <div class="icon">
    <label for="uploadImage" @change="uploadImage">
      <input id="uploadImage" ref="uploadInput" type="file" name="image" />
    </label>
    <img
        v-if="src"
        :src="src"
        alt="Opted image for created or redacted pizza"
        @click="replaceImage"
    />
    <div v-if="!src" class="tip">download image</div>
  </div>
</template>

<script lang="ts" setup>
import {computed, ref} from "vue";

  const props = defineProps({
    label: {
      type: String,
      default: ''
    },
    defaultIcon: {
      type: String,
      required: true,
    },
    src: {
      type: String,
      default: ''
    }
  })
  const emit = defineEmits(['uploadImage'])
  const iconAddress = computed(() => {
    return `url(${props.defaultIcon})`
  })
  const uploadInput = ref(null);

  const uploadImage = (event) => {
    emit('uploadImage', event)
  }
  const replaceImage = () => {
    uploadInput.value.click();
  };
</script>

<style lang="scss" scoped>
  .icon {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    position: relative;
    cursor: pointer;
    width: 100%;
    height: 100%;
    label {
      width: 100%;
      height: 100%;
      border: 2px solid #d3d3d3;
      background-image: v-bind(iconAddress);
      background-size: 75%;
      background-repeat: no-repeat;
      background-position: center 20px;
      padding: 24px 8px 8px 8px;
      border-radius: 4px;
      overflow: hidden;
      cursor: pointer;
      input {
        visibility: hidden;
      }
    }
    img {
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: 4px;
      box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.3);
      &:hover {
        box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.3);
      }
    }
    .tip {
      display: flex;
      justify-content: center;
      align-items: flex-start;
      position: absolute;
      top: 4px;
      font-size: 10px;
      font-weight: 800;
      color: #d3d3d3;
      width: 100%;
    }
  }
</style>