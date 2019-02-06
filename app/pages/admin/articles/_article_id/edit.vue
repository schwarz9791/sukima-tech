<template lang="pug">
  div
    p edit article - {{ articleId }}
</template>

<script>
export default {
  data() {
    return {
      articleId: this.$route.params.article_id
    }
  }
}
</script>
