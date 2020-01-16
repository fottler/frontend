<template>
    <div>
        <div class="top-panel padding-around">
            <menu-switcher></menu-switcher>
        </div>
        <div class="padding-around">

            <h1 class="mt-20 mb-20">Страница не найдена</h1>
            <p>
                Попробуйте вернуться на
                <router-link class="underlined black"
                             to="/">главную страницу</router-link>
            </p>

        </div>
    </div>
</template>

<script>
    import MenuSwitcher from "@/components/menu/MenuSwitcher";
    export default {
        name: 'error404',
        components: {MenuSwitcher}
    }
</script>
