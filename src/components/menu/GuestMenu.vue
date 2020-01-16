<template>
    <div class="navigation-list">
        <div class="bb">
            <list-row icon="login"
                      icon-top="10">
                <router-link to="/login">Войти</router-link>
            </list-row>
        </div>

        <div>
            <list-row icon="home"
                      icon-width="22"
                      icon-top="6"
                      icon-left="12">
                <router-link to="/">Главная</router-link>
            </list-row>
            
            <list-row icon="support"
                      icon-top="10"
                      icon-left="16">
                <router-link to="/feedback">Поддержка</router-link>
            </list-row>
        </div>
    </div>
</template>

<script>
    import ListRow from "@/components/common/ListRow";
    export default {
        name: 'GuestMenu',
        components: {ListRow}
    }
</script>
