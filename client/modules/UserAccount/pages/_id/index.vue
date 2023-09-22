<template>
  <div class="user-account">
    <h4>User profile page</h4>
    <div class="user-account__content">
      <div class="user-account__content__block">
        <div class="user-account__content__block__avatar">
          <BaseIcon
              default-icon="/user_default.svg"
              @uploadImage="uploadImage"
          ></BaseIcon>
        </div>
        <div class="user-account__content__block__person">
          <BaseInput
              type="text"
              id="name"
              placeholder="enter your first name"
              label="First Name"
          />
          <BaseInput
              type="text"
              id="serName"
              placeholder="enter your last name"
              label="Last Name"
          />
        </div>
      </div>
      <div class="user-account__content__block__actions">
        <BaseButton
          @proceed-action="isMethodModal = true"
        >Add Payment Method</BaseButton>
        <BaseButton
          @proceed-action="isAddressModal = true"
        >Add Delivery Address</BaseButton>
      </div>
    </div>
    <ModalContainer
        v-if="isMethodModal"
        title="Payment Method Addition"
        :is-footer="false"
        @close="isMethodModal = false"
    >

    </ModalContainer>
    <ModalContainer
        v-if="isAddressModal"
        title="Delivery Address Addition"
        :is-footer="false"
        @close="isAddressModal = false"
    >

    </ModalContainer>
  </div>

</template>

<script lang="ts" setup>
// Todo: develop DeliveryAddress component and PaymentMethod component
import {onMounted, reactive, ref} from "vue";
import {useRouter} from "vue-router";
import {useUserAccountStore} from "~/modules/UserAccount/store/UserAccountStore";

import BaseButton from "~/components/BaseButton/BaseButton.vue";
import BaseIcon from "~/components/BaseIcon/BaseIcon.vue";
import {IAccountData} from "../../types";

  const router = new useRouter();
  const accountStore = useUserAccountStore()

  const userAccountModel = reactive<IAccountData>({
    img: null,
    userId: null,
    firstName: '',
    lastName: '',
    contactPhone: ''
  })

  onMounted(async () => {
    const userId = router.currentRoute.value.params?.id
    await accountStore.fetchAccountData(userId)
  })
  const isMethodModal = ref(false)
  const isAddressModal = ref(false)
  const uploadImage = (event: any): void => {
    const file = event.target.files;
    if (file) {
      accountStore.preUploadImage(file[0]);
      userAccountModel.img = file[0];
    }
  };
</script>

<style lang="scss" scoped>
.user-account {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  padding: 32px;
  &__content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    padding: 24px 16px;
    &__block {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      padding: 16px 0px;
      &__avatar {
        width: 122px;
        height: 122px;
        background-color: white;
        margin: 32px 16px 16px 0;
      }
      &__personal {
        min-width: fit-content;
        margin: 0px 16px 16px 0;
      }
      &__actions {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        width: 100%;
      }
    }
  }
}
</style>