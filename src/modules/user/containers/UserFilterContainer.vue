<template>
    <div>
        <user-filter-form :sidebar="sidebar"
                          @show-sidebar="showSidebar"
                          @hide-filter="$emit('hide-filter')"></user-filter-form>

        <user-filter-sidebar :sidebar="sidebar"></user-filter-sidebar>
    </div>
</template>

<script>
    import sidebarHandler from "@/mixins/sidebarHandler";
    import UserFilterForm from "@/modules/user/forms/UserFilterForm";
    import UserFilterSidebar from "@/modules/user/forms/UserFilterSidebar";

    export default {
        name: 'UserFilterContainer',
        components: {UserFilterForm, UserFilterSidebar},
        mixins: [sidebarHandler],
        data(){
            return {
                sidebar: {
                    city: {
                        type: 1,
                        headline: 'Выберите город'
                    },
                    food_preferences: {
                        type: 3,
                        headline: 'Предпочтения в еде'
                    },
                    drink_preferences: {
                        type: 2,
                        headline: 'Предпочтения в напитках'
                    }
                }
            }
        },
    }
</script>