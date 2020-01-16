<template>
    <a href="#"
       :class="_class"
       @click.prevent="showMenu"></a>
</template>

<script>
    import { createNamespacedHelpers } from 'vuex'

    import {showMenu} from "@/store/app/app.types";

    const { mapActions } = createNamespacedHelpers('app');

    export default {
        name: 'MenuSwitcher',
        props: {
            isHomePage: Boolean
        },
        computed: {
            _class(){
                return this.isHomePage ? 'square-button navbar-button' : 'open-navigation-button';
            }
        },
        methods: {
            ...mapActions([ showMenu ]),
        }
    }
</script>
