<template>
  <div class="dashboard-page">
    <h3>Dashboard</h3>
    <AddIngredient />
    <AddNewProduct />
    <AddPizza />
    <CreateRole />
    <UpdateUser />
  </div>

</template>

<script setup lang="ts">
import AddIngredient from '../components/AddIngredient/AddIngredient.vue';
import AddNewProduct from "../components/AddNewProduct/AddNewProduct.vue";
import AddPizza from  "../components/AddPizza/AddPizza.vue";
import CreateRole from "../components/CreateRole/CreateRole.vue";
import UpdateUser from "../components/UpdateUser/UpdateUser.vue";
import {useAuthStore} from "~/modules/AuthorizationForm/store/AuthStore";
import {computed} from "vue/dist/vue";
import {DASHBOARD_ADMIN_ROLES} from "~/constants";


</script>

<style lang="scss" scoped>
  .dashboard-page {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: stretch;
    width: 100%;
    padding: 16px;
    border-radius: 8px;
    box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.3);
  }
</style>