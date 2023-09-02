<template>
  <div class="toggler">
    <div class="label" v-if="value">{{ value }}</div>
    <div class="line" :class="{ on: turnOn }" @click="toggle">
      <div class="spot" :class="{ on: turnOn }"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { PropType, ref } from "vue";
import { TTogglerDataTypes } from "~/components/types";
  const props = defineProps({
    dataType: {
      type: String as PropType<TTogglerDataTypes>,
      default: 'boolean'
    },
    value: {
      type: String,
      default: ''
    }
  })
  const emit = defineEmits(['toggle'])
  const turnOn = ref(false)

  const toggle = () => {
    turnOn.value = !turnOn.value
    if (props.dataType === "string") {
      emit('toggle', props.value)
    } else {
      emit('toggle', turnOn.value)
    }

  }
</script>

<style lang="scss" scoped>
  .toggler {
    margin-right: 16px;
    .label {
      margin-bottom: 8px;
      font-weight: 500;
    }
    .line {
      width: 100px;
      height: 40px;
      background-color: lightgrey;
      border-radius: 25px;
      border: 1px solid lightgray;
      position: relative;
      transition: background-color .8s ease-in-out;
      &.on {
        background-color: rgb(18 180 136);
      }
      .spot {
        position: absolute;
        top: 2px;
        left: 2px;
        width: 36px;
        height: 34px;
        border-radius: 50%;
        background-color: white;
        transition: left .5s ease-in-out;
        &.on {
          left: 60px;
        }
      }
    }
  }

</style>