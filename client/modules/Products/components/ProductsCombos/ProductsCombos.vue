<template>
  <div
    id="combos"
    class="combos-list-container"
    :class="{ 'combos-list-container_collapsed': collapsed }"
  >
    <div class="combos-sort">
      <div class="combosSection">
        <!--  Todo: rename index, assign :key value   -->
        <div v-for="(combo, index) in 5" :key="combo.id" class="comboItem">
          some combo {{ index }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      collapsed: false,
    };
  },
};
</script>
<style>
#combos {
  height: 300px;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  margin: 10px 0 0 0;
}
.combos-list-container {
  width: 100%;
  height: 100%;
  min-height: -webkit-fit-content;
  min-height: -moz-fit-content;
  min-height: fit-content;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
}
.combos-sort,
.combosSection {
  display: flex;
  width: 100%;
  flex-wrap: wrap;
}
.comboItem {
  width: 300px;
  min-height: fit-content;
  background: rgba(255, 255, 255, 1);
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  position: relative;
  margin: 0 10px 0 10px;
}
</style>
