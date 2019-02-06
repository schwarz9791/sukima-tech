<template lang="pug">
  div
    p edit category - {{ categoryId }}
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
