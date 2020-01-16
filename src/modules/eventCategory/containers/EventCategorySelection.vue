<template>
    <div>
        <event-category-create-form class="list-row bb add-category-wrapper"></event-category-create-form>

        <input-list :options="categories"
                    :value="selected"
                    @input="$emit('change-category', $event)"
                    options-caption-prop-name="name"
                    name="category"
                    type="checkbox"
                    label-class="wide bb"></input-list>
    </div>
</template>

<script>
    import EventCategoryCreateForm from "@/modules/eventCategory/forms/EventCategoryCreateForm";
    import InputList from "@/components/forms/InputList";
    import { createNamespacedHelpers } from 'vuex'
    import {loadAll} from "@/store/types";

    const { mapState, mapActions } = createNamespacedHelpers('eventCategory');

    export default {
        name: 'EventCategorySelection',
        components: {InputList, EventCategoryCreateForm},
        props: {
            selected: Array
        },
        computed: {
            ...mapState(['categories'])
        },
        created(){
            this.loadAll();
        },
        methods: {
            ...mapActions([ loadAll ])
        }
    }
</script>
