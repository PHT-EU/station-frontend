<template>
  <section class="main-content columns is-fullheight">
    <StatusSidebar/>
    <div class="container column is-10">
      <div class="home">
        <img alt="Vue logo" src="../assets/logo.png">
      </div>
    </div>
  </section>
</template>

<script>
import StatusSidebar from '@/components/home/StatusSidebar';

export default {
  name: 'Home',
  components: {StatusSidebar}
}
</script>
