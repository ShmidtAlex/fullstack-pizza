<template>
  <div class="addon-element">
    <div class="addon-element__options-block">
      <img
        class="addon-element__options-block--photo"
        :alt="availableAddon.value"
        :src="`${config.public.NUXT_ENV_BASE_URL}/${availableAddon.value}.jpg`"
      />
      <div class="addon-element__options-block--name">
        {{ availableAddon.value }}
      </div>
      <div class="addon-element__options-block--price">
        {{ availableAddon.price }}$
      </div>
      <div class="addon-element__options-block--change-number">
        <button
          class="addon-element__options-block--change-number_decrease"
          @click="decrease"
        >
          <svg
            id="Capa_1"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            viewBox="0 0 512 512"
            width="100%"
            height="100%"
          >
            <path
              d="M256,0C114.837,0,0,114.837,0,256s114.837,256,256,256s256-114.837,256-256S397.163,0,256,0z M384,277.333H128.043    c-11.776,0-21.333-9.557-21.333-21.333s9.557-21.333,21.333-21.333H384c11.776,0,21.333,9.557,21.333,21.333    S395.776,277.333,384,277.333z"
              data-original="#000000"
              class="active-path"
              data-old_color="#000000"
              fill="#009471"
            />
          </svg>
        </button>
        <!--        Todo: remove block below after adding new component -->
        <button
          class="addon-element__options-block--increase"
          @click="increase"
        >
          <svg
            id="Capa_1"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            viewBox="0 0 52 52"
            width="100%"
            height="100%"
          >
            <path
              d="M26,0C11.664,0,0,11.663,0,26s11.664,26,26,26s26-11.663,26-26S40.336,0,26,0z M38.5,28H28v11c0,1.104-0.896,2-2,2  s-2-0.896-2-2V28H13.5c-1.104,0-2-0.896-2-2s0.896-2,2-2H24V14c0-1.104,0.896-2,2-2s2,0.896,2,2v10h10.5c1.104,0,2,0.896,2,2  S39.604,28,38.5,28z"
              data-original="#000000"
              class="active-path"
              data-old_color="#000000"
              fill="#009471"
            />
          </svg>
        </button>
      </div>
    </div>
    <div class="addon-element__result" :class="{ 'warn-box': showWarning }">
      {{ cTotalNumber }}
    </div>
  </div>
</template>
<script setup lang="ts">
// Todo: add unit-tests priority: low
import { computed, PropType, ref } from "vue";
import { IOptedAddons, IPizzaSubObjectUnit } from "~/modules/Products/types";
import { useRuntimeConfig } from "#app";

const props = defineProps({
  availableAddon: {
    type: Object as PropType<IPizzaSubObjectUnit>,
    required: true,
  },
  previouslyOpted: {
    type: Object as PropType<IOptedAddons>,
    default: () => ({ count: 0, price: 0 }),
  },
});
const emit = defineEmits(["changePrice", "amountWarning"]);

const config = useRuntimeConfig();
const totalNumber = ref<number>(0);
const showWarning = ref<boolean>(false);

const decrease = (): void => {
  if (props.previouslyOpted.count + totalNumber.value > 0) {
    totalNumber.value--;
    emit("changePrice", {
      value: props.availableAddon.value,
      count: totalNumber.value,
      price: props.availableAddon.price,
    });
  }
};
const increase = (): void => {
  if (totalNumber.value + props.previouslyOpted.count < 2) {
    totalNumber.value++;
    emit("changePrice", {
      value: props.availableAddon.value,
      count: totalNumber.value,
      price: props.availableAddon.price,
    });
  } else {
    showWarning.value = true;
    emit("amountWarning", props.availableAddon.value);
    setTimeout(() => {
      showWarning.value = false;
    }, 1500);
  }
};

const cTotalNumber = computed((): string => {
  return totalNumber.value > 1
    ? `${props.previouslyOpted.count + totalNumber.value} positions`
    : `${props.previouslyOpted.count + totalNumber.value} position`;
});
</script>
<style lang="scss" scoped>
@import "/assets/css/animations/warn-text";
.addon-element {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  border: 1px solid white;
  &__result {
    display: flex;
    justify-content: center;
    color: #70544f;
    font-weight: 700;
    width: 50%;
  }
  &__options-block {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 300px;
    height: 65px;
    border: 2px solid rgba(200, 200, 200, 0.5);
    border-radius: 5px;
    &:active {
      border: 2px solid rgba(100, 100, 100, 0.5);
      border-radius: 5px;
      background-color: rgba(200, 200, 200, 0.5);
    }
    &--photo {
      width: 60px;
      height: 60px;
    }
    &--name {
      font-weight: 600;
    }
    &--change-number {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      width: 25px;
      height: 100%;
      &--decrease,
      &--increase {
        border: none;
        outline: none;
        width: 25px;
        height: 25px;
      }
    }
    &--price {
      color: #70544f;
      font-weight: 700;
    }
  }
}
.warn-box {
  font-size: 22px;
  animation-name: warn-text;
  animation-duration: 1.5s;
  border-radius: 4px;
}
</style>
