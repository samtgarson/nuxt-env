<template>
<h1>Hello!</h1>
</template>

<script>
export default {
  asyncData ({ app }) {
    return {
      serverValues: app.$env
    }
  }
}
</script>
