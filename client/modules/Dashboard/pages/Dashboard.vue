<template>
  <div class="dashboard-page">
    <h3>Dashboard</h3>
    <AddIngredient />
    <AddNewProduct />
    <ManagePizza />
    <ManageUser />
  </div>
</template>

<script setup lang="ts">
import AddIngredient from "../components/AddIngredient/AddIngredient.vue";
import AddNewProduct from "../components/AddNewProduct/AddNewProduct.vue";
import AddPizza from "../components/AddPizza/AddPizza.vue";
import ManageUser from "~/modules/Dashboard/components/ManageUser/ManageUser.vue";
import ManagePizza from "~/modules/Dashboard/components/ManagePizza/ManagePizza.vue";
// Todo: SUPERADMIN is able to set admin and redactor's role by checkbox picking which rights should be assigned, so, plus to hard-roles'-assignment
// todo: which allows to provide default-access settings, we have to develop exceptions checking
// TODO: develop order service, order history etc...
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
}
</style>
