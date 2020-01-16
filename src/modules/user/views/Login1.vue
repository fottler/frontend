<template>
    <table id="login-wrapper">
        <tr>
            <td>
                <div class="top-panel padding-around">
                    <menu-switcher></menu-switcher>
                </div>
                <div style="height: 5px;"></div>
            </td>
        </tr>

        <tr>
            <td>

                <div class="logo">
                    <img src="/images/icons/logo.svg" alt="Вилка и бутылка"/>
                    <div class="site-name">Вилка и бутылка</div>
                </div>

                <h1>Присоединяйтесь</h1>
                <div class="title">По номеру телефона</div>

                <div class="mb-15">
                    <phone-input class="grey-input center"
                                 v-model="phone"
                                 @keyup.enter.native="onSubmit"></phone-input>
                    <error :text="errors.phone"
                           class="center"></error>
                </div>
                <div class="mb-50">
                    <a href="#"
                       class="button yellow-button wide"
                       @click.prevent="onSubmit">продолжить</a>
                </div>

            </td>
        </tr>
    </table>
</template>

<script>
    import Error from "@/components/forms/Error";
    import PhoneInput from "@/components/forms/PhoneInput";
    import { createHelpers } from 'vuex-map-fields';
    import { createNamespacedHelpers } from 'vuex'
    import {submitLogin1} from "@/modules/user/store/auth/auth.types";
    import MenuSwitcher from "@/components/menu/MenuSwitcher";

    const { mapState, mapActions } = createNamespacedHelpers('auth');
    const { mapFields } = createHelpers({
        getterType: 'auth/getField',
        mutationType: 'auth/updateField',
    });

    export default {
        name: 'Login1',
        components: {MenuSwitcher, PhoneInput, Error},
        computed: {
            ...mapState(['errors']),
            ...mapFields(['phone'])
        },
        methods: {
            async onSubmit(){
                await this[submitLogin1]();
            },
            ...mapActions([ submitLogin1
                //todo remove
                ,'login2'
            ])
        }
    }
</script>