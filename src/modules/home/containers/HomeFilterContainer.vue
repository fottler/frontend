<template>
    <div>
        <home-filter-form :sidebar="sidebar"
                          @show-sidebar="showSidebar"
                          @hide-filter="$emit('hide-filter')"></home-filter-form>

        <home-filter-sidebar :sidebar="sidebar"></home-filter-sidebar>
    </div>
</template>

<script>
    import sidebarHandler from "@/mixins/sidebarHandler";
    import HomeFilterSidebar from "@/modules/home/forms/HomeFilterSidebar";
    import HomeFilterForm from "@/modules/home/forms/HomeFilterForm";

    export default {
        name: 'HomeFilterContainer',
        components: {HomeFilterForm, HomeFilterSidebar},
        mixins: [sidebarHandler],
        data(){
            return {
                sidebar: {
                    order: {
                        type: 1,
                        headline: 'Сортировать по'
                    },
                    category: {
                        type: 2,
                        headline: 'Категории'
                    },
                    drink_preferences: {
                        type: 3,
                        headline: 'Предпочтения в еде'
                    },
                    food_preferences: {
                        type: 4,
                        headline: 'Предпочтения в напитках'
                    }
                }
            }
        },
    }
</script>