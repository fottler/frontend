<template>
    <div>
        <list-row class="bb">
            <input type="text"
                   class="w-100 pl"
                   placeholder="Введите имя и/или фамилию"
                   v-model.lazy="text"
                   @keyup.enter="onSubmit">
        </list-row>

        <!-- //todo
        <list-row icon="address"
                  icon-width="18"
                  icon-top="12">
            <form-sidebar-switcher title="Выберите город"
                                   :value="city"
                                   @click="showSidebar(sidebar.city.type)"></form-sidebar-switcher>
        </list-row>
        -->

        <list-row icon="food"
                  icon-width="20"
                  icon-top="12"
                  icon-left="13">
            <form-sidebar-switcher title="Предпочтения в еде"
                                   :value="foodString"
                                   @click="showSidebar(sidebar.food_preferences.type)"></form-sidebar-switcher>
        </list-row>

        <list-row icon="drinks"
                  icon-width="19"
                  icon-left="13">
            <form-sidebar-switcher title="Предпочтения в напитках"
                                   :value="drinksString"
                                   @click="showSidebar(sidebar.drink_preferences.type)"></form-sidebar-switcher>
        </list-row>

        <list-row class="right"
                  icon="gender"
                  icon-width="22"
                  icon-top="13"
                  icon-left="12">
            <label class="left-label">Выберите пол</label>

            <input-list :options="options.genders"
                        v-model="gender"
                        name="gender"
                        type="radio"
                        label-class="mr-5"></input-list>
        </list-row>

        <list-row class="button-wrapper">
            <table class="w-100">
                <tr>
                    <td>
                        <a href="#"
                           class="button w-auto"
                           @click.prevent="onClear">очистить</a>
                    </td>
                    <td>
                        <a href="#"
                           class="button yellow-button w-auto"
                           @click.prevent="onSubmit">применить</a>
                    </td>
                </tr>
            </table>
        </list-row>
    </div>
</template>

<script>
    import { createHelpers } from 'vuex-map-fields';
    import { createNamespacedHelpers } from 'vuex'
    import FormSidebarSwitcher from "@/components/forms/FormSidebarSwitcher";
    import {applyFilter, resetFilter} from "@/store/types";
    import InputList from "@/components/forms/InputList";
    import ListConfig from "@/config/ListConfig";
    import ListRow from "@/components/common/ListRow";

    const { mapGetters, mapActions } = createNamespacedHelpers('userSearch');
    const { mapFields } = createHelpers({
        getterType: 'userSearch/getEditableFilterField',
        mutationType: 'userSearch/updateEditableFilterField',
    });

    export default {
        name: 'UserFilterForm',
        components: {ListRow, InputList, FormSidebarSwitcher},
        props: {
            sidebar: Object
        },
        computed: {
            options: ()=>ListConfig,
            ...mapGetters(['foodString', 'drinksString']),
            ...mapFields(['city', 'food_preferences', 'drink_preferences', 'gender', 'text'])
        },
        methods: {
            showSidebar(type) {
                this.$emit('show-sidebar', type);
            },
            onClear(){
                this[resetFilter]();
            },
            async onSubmit(){
                this.$emit('hide-filter');
                await this[applyFilter]();
            },
            ...mapActions([ applyFilter, resetFilter ])
        }
    }
</script>
