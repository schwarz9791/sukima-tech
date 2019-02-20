<template lang="pug">
  el-form(ref='category' :model='category')
    el-form-item(label='name')
      el-input(v-model='name')
    el-form-item(label='order')
      el-input(v-model='order')
    el-form-item(label='template')
      el-input(v-model='template')
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'CategoryEditor',
  props: {
    id: {
      type: String,
      default: null
    },
    category: {
      type: Object,
      default: null
    }
  },
  computed: {
    name: {
      get() {
        return this.category.name
      },
      set(value) {
        this.updateSingle({ name: value })
      }
    },
    order: {
      get() {
        return this.category.order ? this.category.order.toString() : 0
      },
      set(value) {
        this.updateSingle({ order: parseInt(value || 0, 10) })
      }
    },
    template: {
      get() {
        return this.category.template
      },
      set(value) {
        this.updateSingle({ template: value })
      }
    }
  },
  methods: {
    ...mapMutations('categories', ['updateSingle'])
  }
}
</script>
