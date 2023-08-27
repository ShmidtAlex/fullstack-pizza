<template>
  <DashboardSection
      title="Pizza"
  >
    <div class="pizza__image">
      <label for="uploadImage" @change="uploadImage">
        <input
            type="file"
            name="image"
            id="uploadImage"
        />
      </label>
      <img v-if="src" :src="src" alt="">
      <div v-if="!src" class="tip">download image</div>
    </div>


  </DashboardSection>
</template>

<script lang="ts" setup>
  import {useRuntimeConfig} from "#app";
  import {computed, onMounted, ref} from "vue";
  import {useDashboardStore} from "~/modules/Dashboard/store/DashbordStore";

  const dashboardStore = useDashboardStore()
  const config = useRuntimeConfig()
  const emit = defineEmits(['upload'])
  onMounted(() => {
    const preloadedImage = localStorage.getItem('preloadedImage')
    if (preloadedImage) {
      dashboardStore.setPreloadedImage(preloadedImage);
    }
  })
  const src = computed((): string => {
    if (dashboardStore.uploadedImgSrc) {
      return `${config.public.NUXT_ENV_BASE_URL}${dashboardStore.uploadedImgSrc}`
    }
    return ''
  })
  const uploadImage = (event: any): void => {
    const file = event.target.files
    if (file) {
      dashboardStore.preUploadImage(file[0])
    }
  }
  const proceed = () => {
    
    clearData()
  }
  const clearData = () => {
    localStorage.setItem('preloadedImage', '')
  }
</script>

<style lang="scss" scoped>
  .pizza {
    &__image {
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      position: relative;
      cursor: pointer;
      width: 100px;
      height: 100px;
      label {
        width: 100%;
        height: 100%;
        border: 2px solid #d3d3d3;
        background-image: url("/public/default_pizza.svg");
        background-size: 70px;
        background-repeat: no-repeat;
        background-position: 8px 20px;
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
  }

</style>