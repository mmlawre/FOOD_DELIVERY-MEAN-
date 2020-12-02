<template>
  <div>
    <div class="contextmenu" [ngstyle]="{'left.px': x, 'top.px': y}">
      this is your contextmenu content {{ x }} {{ y }}
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style scoped></style>
