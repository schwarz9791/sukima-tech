<template lang="pug">
  div
    p create category - {{ categoryId }}
</template>

<script>
export default {
  data() {
    return {
      categoryId: this.$route.params.category_id
    }
  }
}
</script>
