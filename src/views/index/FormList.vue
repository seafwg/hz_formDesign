<template>
  <div>
    <router-link to="/" >list1</router-link>
    <br>
    <router-link :to="{ name: 'home', params: { formItemData: this.formItem }}">list2</router-link>
  </div>
</template>

<script>
export default {
  name: 'FormList',
  data() {
    return {
      formItem: []
    }
  },
  mounted() {
    const oldJsonStr = localStorage.getItem('drawFormDataJson')
    if (oldJsonStr) {
      const oldJson = JSON.parse(oldJsonStr)
      console.log('oldJson:', oldJson)
      this.formItem = oldJson
    }
  }
}
</script>

<style scoped>

</style>
