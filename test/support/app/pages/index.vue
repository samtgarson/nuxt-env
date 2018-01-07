<template>
<div>
    <p>TEST_ENV: {{ testEnv }}</p>
</div>
</template>

<script>
export default {
  computed: {
    testEnv () { return this.$env.TEST_ENV }
  },
}
</script>
