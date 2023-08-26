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
      <div class="tip">download image</div>
    </div>


  </DashboardSection>
</template>

<script lang="ts" setup>
  import {useRuntimeConfig} from "#app";
  import {computed} from "vue";
  import {useDashboardStore} from "~/modules/Dashboard/store/DashbordStore";
  const dashboardStore = useDashboardStore()
  const config = useRuntimeConfig()
  const emit = defineEmits(['upload'])
  const src = computed(() => {
    return dashboardStore.uploadedImgSrc ? dashboardStore.uploadedImgSrc : 'default_pizza.svg'
  })
  const uploadImage = (event: any): void => {
    const file = event.target.files[0]
    if (file) {
      console.log(file)
      dashboardStore.preUploadImage({ image: file })
    }
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
      label {
        width: 100px;
        height: 100px;
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