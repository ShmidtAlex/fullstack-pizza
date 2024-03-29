<template>
  <div class="ingredient">
    <div v-if="!redactMode" class="ingredient__info">
      <div class="ingredient__info__img">
        <img
          :src="`${config.public.NUXT_ENV_BASE_URL}static/${data.img}`"
          :alt="`image of ingredient ${data.name}`"
        />
      </div>
      <div class="ingredient__info__name">{{ data.name }}</div>
      <div class="ingredient__info__price">{{ data.price }}$</div>
    </div>
    <div v-if="redactMode" class="ingredient__redact">
      <div class="ingredient__redact__img">
        <img
          :src="`${config.public.NUXT_ENV_BASE_URL}static/${data.img}`"
          :alt="`image of ingredient ${data.name}`"
        />
      </div>
      <UploadButton
        :id="`${data.id}-ingredient`"
        mode="redact"
        @upload="uploadImage"
      />
      <div class="ingredient__redact__name">
        <BaseInput
          :id="`${data.id}-name`"
          type="text"
          :value="data.name"
          @change="(value) => update(value, 'name')"
        />
      </div>
      <div class="ingredient__redact__price">
        <BaseInput
          :id="`${data.id}-value`"
          type="number"
          :value="data.price"
          @change="(value) => update(value, 'price')"
        />$
      </div>
    </div>
    <div v-if="!selectionMode" class="ingredient__actions">
      <BaseButton v-if="isAdmin" type="danger" @click="remove">
        Remove ingredient
      </BaseButton>
      <BaseButton
        v-if="!redactMode && isAdminOrRedactor"
        type="warning"
        @click="redactMode = true"
      >
        Change ingredient
      </BaseButton>
      <BaseButton
        v-if="redactMode && isAdminOrRedactor"
        type="warning"
        @click="redact"
      >
        Apply changes
      </BaseButton>
      <div v-if="redactMode" class="ingredient__actions__close">
        <RemoveButton @remove-item="redactMode = false" />
      </div>
    </div>
    <!-- Todo: create custom checkbox in order to style better -->
    <div v-if="selectionMode" class="ingredient__selector">
      <input
        :id="data.id"
        type="checkbox"
        :name="data.name"
        :value="data.id"
        :checked="selected"
        @change="emit('select', data.id)"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, PropType, reactive, ref } from "vue";
import { IIngredientModel } from "~/modules/Dashboard/types";
import { useRuntimeConfig } from "#app";
import { useAuthStore } from "~/modules/AuthorizationForm/store/AuthStore";
import { DASHBOARD_ACCESS_ROLES, DASHBOARD_ADMIN_ROLES } from "~/constants";
import UploadButton from "~/components/UploadButton/UploadButton.vue";
import RemoveButton from "~/components/RemoveButton/RemoveButton.vue";
import BaseButton from "~/components/BaseButton/BaseButton.vue";
const redactMode = ref<boolean>(false);
const authStore = useAuthStore();
const props = defineProps({
  data: {
    type: Object as PropType<IIngredientModel>,
    required: true,
  },
  selectionMode: {
    type: Boolean,
    default: false,
  },
  selected: {
    type: Boolean,
    default: false
  }
});
const config = useRuntimeConfig();
const isAdmin = computed(() => {
  return (
    authStore.isAuth && DASHBOARD_ADMIN_ROLES.includes(authStore.user.role)
  );
});
const isAdminOrRedactor = computed(() => {
  if (authStore.user) {
    return (
      authStore.isAuth && DASHBOARD_ACCESS_ROLES.includes(authStore.user.role)
    );
  }
  return false;
});
const redactedIngredient = reactive<Partial<IIngredientModel>>({
  name: "",
  price: "",
  img: null,
});
const emit = defineEmits(["redact", "remove"]);

const uploadImage = (files: any) => {
  if (files.length) {
    redactedIngredient.img = files[0];
  }
};
const remove = () => {
  emit("remove", props.data.id);
};
const update = (value, field) => {
  redactedIngredient[field] = value;
};
const redact = () => {
  // Todo: add warning that there is no updated value
  if (Object.values(redactedIngredient).some((elem) => !!elem)) {
    redactMode.value = true;
    emit("redact", {
      ingredientId: props.data.id,
      redactedIngredient,
    });
    redactMode.value = false;
  }
};
</script>

<style lang="scss" scoped>
@import "assets/css/buttons.scss";
.ingredient {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: fit-content;
  min-width: 550px;
  padding: 8px;
  //margin-bottom: 16px;
  //border-radius: 8px;
  //box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.3);
  border-bottom: 1px solid lightgrey;
  &:last-child {
    border-bottom: none;
  }
  &__info {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 40px;
    width: 50%;
    // Todo: minimize pictures, as they are still to big
    &__img {
      display: flex;
      justify-content: center;
      width: 60px;
      img {
        width: 40px;
        height: 40px;
      }
    }
  }
  &__actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-width: fit-content;
    margin-left: 16px;
    &--redact {
      background-color: darkorange;
      border-radius: 8px;
    }
    &--activate {
      background-color: rgba(0, 128, 0, 0.9);
    }
    &__close {
      width: 40px;
    }
  }
  &__redact {
    @extend .ingredient__info;
    width: 60%;
    &__img {
      display: flex;
      justify-content: center;
      min-width: 60px;
      margin-right: 16px;
      img {
        width: 40px;
        height: 40px;
      }
    }
    .input {
      margin: 0 16px 0 0;
      min-width: 50px;
    }
    &__price {
      display: flex;
      justify-content: center;
      align-items: center;
      //max-width: fit-content;
    }
    &__name {
      @extend .ingredient__redact__price;
      min-width: 110px;
    }
  }
  &__selector {
    margin-right: 16px;
  }
}
</style>
