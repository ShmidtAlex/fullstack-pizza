<template>
  <div class="user-account">
    <h1>User profile page</h1>
<!--    Todo: develop handling user data getting, updating, deleting  -->
  </div>

</template>

<script lang="ts" setup>
import {useUserAccountStore} from "~/modules/UserAccount/store/UserAccountStore";
import {onMounted} from "vue";
import {useRouter} from "vue-router";

const router = new useRouter();
const accountStore = useUserAccountStore()

onMounted(async () => {
  const userId = router.currentRoute.value.params?.id
  await accountStore.fetchAccountData(userId)
})
</script>

<style lang="scss" scoped>
.user-account {
  padding: 32px;
}
</style>