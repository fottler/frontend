<template>
    <div>
        <list-row icon="order"
                  icon-width="17">
            <form-sidebar-switcher title="Сортировать по"
                                   :value="orderString"
                                   @click="showSidebar(sidebar.order.type)"></form-sidebar-switcher>
        </list-row>

        <list-row icon="category"
                  icon-width="18">
            <form-sidebar-switcher title="Категории"
                                   :value="categoriesString(category)"
                                   @click="showSidebar(sidebar.category.type)"></form-sidebar-switcher>
        </list-row>

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
                  icon="date"
                  icon-width="18"
                  icon-left="13">

            <label class="left-label">Когда?</label>

            <input type="date"
                   placeholder="Когда?"
                   v-model.lazy="date">
        </list-row>

        <list-row class="right"
                  icon="gender"
                  icon-width="22"
                  icon-top="13"
                  icon-left="12">

            <label class="left-label">Для кого?</label>

            <input-list :options="options.genders"
                        v-model="gender"
                        name="gender"
                        type="radio"
                        label-class="mr-5"></input-list>
        </list-row>

        <list-row icon="search-grey"
                  icon-left="16">
            <label>
                Поиск по ключевым словам
                <span class="tip">введите слова ниже</span>
            </label>
        </list-row>

        <list-row class="center search-wrapper">
            <input type="text"
                   class="search underlined"
                   placeholder="Например: ресторан, китайская еда, вино"
                   v-model.lazy="text"
                   @keyup.enter="onSubmit">
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

    const { mapGetters: mapCategoryGetters } = createNamespacedHelpers('eventCategory');
    const { mapGetters, mapActions } = createNamespacedHelpers('home');
    const { mapFields } = createHelpers({
        getterType: 'home/getEditableFilterField',
        mutationType: 'home/updateEditableFilterField',
    });

    export default {
        name: 'HomeFilterForm',
        components: {ListRow, InputList, FormSidebarSwitcher},
        props: {
            sidebar: Object
        },
        computed: {
            options: ()=>ListConfig,
            ...mapCategoryGetters(['categoriesString']),
            ...mapGetters(['foodString', 'drinksString', 'orderString']),
            ...mapFields(['order', 'category', 'food_preferences', 'drink_preferences', 'date', 'gender', 'text'])
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
