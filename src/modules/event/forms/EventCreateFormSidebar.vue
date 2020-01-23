<template>
    <Sidebar class="right-sidebar w-100"
             :class="sidebar.type===sidebar.address.type ? 'create-event-map' : ''"
             :headline="sidebarHeadline(sidebar.type)"
             v-model="sidebar.shown">

        <div v-show="sidebarIs(sidebar.category.type)">
            <event-category-selection :selected="category"
                                      @change-category="changeCategory"></event-category-selection>
        </div>

        <div v-show="sidebarIs(sidebar.drink_preferences.type)">
            <input-list :options="options.drinks"
                        v-model.lazy="drink_preferences"
                        name="drink_preferences"
                        type="radio"
                        label-class="wide bb"></input-list>
        </div>

        <div v-show="sidebarIs(sidebar.food_preferences.type)">
            <input-list :options="options.food"
                        v-model.lazy="food_preferences"
                        name="food_preferences"
                        type="radio"
                        label-class="wide bb"></input-list>
        </div>

        <div v-show="sidebarIs(sidebar.members.type)">
            <list-row class="bb"
                      icon="male-grey">

                <input type="number"
                       class="w-100 pl"
                       placeholder="Введите количество мужчин"
                       v-model.lazy="max_males_number">
            </list-row>

            <list-row class="bb"
                      icon="female-grey"
                      icon-width="17">

                <input type="number"
                       class="w-100 pl"
                       placeholder="Введите количество женщин"
                       v-model.lazy="max_females_number">
            </list-row>
        </div>

        <div v-show="sidebarIs(sidebar.address.type)">
            <event-create-form-address :address="address"
                                       :lat="lat"
                                       :lng="lng"
                                       @update="updateAddress"></event-create-form-address>
        </div>
    </Sidebar>
</template>

<script>
    import InputList from "@/components/forms/InputList";
    import Sidebar from "@/components/common/Sidebar";
    import EventCategorySelection from "@/modules/eventCategory/containers/EventCategorySelection";
    import ListConfig from "@/config/ListConfig";
    import { createHelpers } from 'vuex-map-fields';
    import EventCreateFormAddress from "@/modules/event/forms/EventCreateFormAddress";
    import ObjectUtil from "@/core/utilities/ObjectUtil";
    import ListRow from "@/components/common/ListRow";

    const { mapFields } = createHelpers({
        getterType: 'event/getNewEventField',
        mutationType: 'event/updateNewEventField',
    });

    export default {
        name: 'EventCreateFormSidebar',
        components: {ListRow, EventCreateFormAddress, EventCategorySelection, Sidebar, InputList},
        props: {
            sidebar: Object
        },
        computed: {
            options: ()=>ListConfig,
            ...mapFields(['category', 'food_preferences', 'drink_preferences', 'max_males_number', 'max_females_number', 'address', 'lat', 'lng'])
        },
        methods: {
            changeCategory(category){
                this.category = category;
            },
            updateAddress(address, lat, lng){
                this.address = address;
                this.lat = lat;
                this.lng = lng;
            },


            sidebarIs(type){
                return this.sidebar.type === type;
            },
            findSidebarByType(type){
                return Object.values(this.sidebar).find(function(item){
                    return ObjectUtil.isObject(item) && item.type === type;
                });
            },
            sidebarHeadline(type){
                const sidebarObj = this.findSidebarByType(type);

                return sidebarObj ? sidebarObj.headline : '';
            }
        }
    }
</script>
