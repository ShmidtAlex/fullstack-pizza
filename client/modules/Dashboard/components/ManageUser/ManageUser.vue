<template>
  <DashboardSection
      title="Users accesses"
      :is-loading="dashboardStore.fetchUsersLoader"
  >
    <ItemsList
      title="Show available users"
      :expand="showList"
      @toggle-list="showList = !showList"
    >
      <template v-if="users.length">
        <DUser
            v-for="user in users"
            :key="user.id"
            :user="user"
            @remove="confirmRemoval"
            @redact="redactUser"
        />
      </template>
      <template v-else>
        <EmptyData item-name="ingredients" />
      </template>
    </ItemsList>
  </DashboardSection>
</template>

<script lang="ts" setup>
  import {computed, onMounted, ref} from "vue";
  import {useDashboardStore} from "~/modules/Dashboard/store/DashbordStore";
  import DUser from "../DUser/DUser.vue"
  const dashboardStore = useDashboardStore()
  const showList = ref<boolean>(false)

  // todo: add Select component with list of available Roles, in order to exclude typos while writing down
  onMounted(() => {
    dashboardStore.fetchUserList()
  })
  const users = computed(() => {
    return dashboardStore.users
  })
  const confirmRemoval = () => {

  }
  const redactUser = () => {

  }
</script>

<style scoped>

</style>
