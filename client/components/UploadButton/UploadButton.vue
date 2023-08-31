<template>
  <div class="upload">
    <label :for="id" class="upload__icon" @change="uploadDocument">
      <input
        type="file"
        name="uploadFile"
        :id="id"
        class="upload__icon_hidden-input"
      />
    </label>
  </div>
</template>

<script lang="ts" setup>
  const props = defineProps({
    id: {
      type: [String, Number],
      required: true
    },
    mode: {
      type: String,
      default: 'create'
    }
  })
  const emit = defineEmits(['upload', 'redactIngredientImage'])
  const uploadDocument = (e) => {
    emit('upload', e.target.files)
  }
</script>

<style lang="scss" scoped>
.upload {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  background-color: rgba(0,128,0, 0.1);
  padding: 9px;
  border-radius: 10px;
  border: none;
  outline: none;
  margin: 16px;
  &__icon {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 21px;
    height: 21px;
    background-image: url("/static/icons/upload.svg");
    background-size: cover;
    background-repeat: no-repeat;
    cursor: pointer;
    &_hidden-input {
      visibility: hidden;
      width: 0px;
      height: 0px;
    }
  }
}
</style>
