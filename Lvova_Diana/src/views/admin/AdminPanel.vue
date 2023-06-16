<template>
  <div>
    <h1>Админ панель</h1>

    <admin-tabs />
  </div>
</template>

<script>
export default {
  name: "AdminPanel",
  components: {
    adminTabs: () => import("../../components/admin/admin-tabs")
  }
};
</script>

<style lang="scss" scoped></style>
