<template>
    <section class="main-content columns is-fullheight">
        <div class="is-2 is-hidden-touch column">
            <StatusSidebar />
        </div>
        <div class="container is-hidden-desktop column is-fullwidth">
            <StatusMobile />
        </div>
        <div class="container column is-10">
            <div class="home">
                <img
                    alt="Vue logo"
                    src="../assets/logo.png"
                >
            </div>
        </div>
    </section>
</template>

<script>
import StatusSidebar from '@/components/home/StatusSidebar';
import StatusMobile from '@/components/home/StatusMobile';

export default {
    name: 'Home',
    components: { StatusSidebar, StatusMobile },
};
</script>
