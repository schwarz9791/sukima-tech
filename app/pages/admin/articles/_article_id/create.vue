<template lang="pug">
  div
    p create article - {{ articleId }}
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
