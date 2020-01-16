<template>
    <div>
        <input type="text"
               class="w-100 pl"
               placeholder="Введите название категории"
               v-model.lazy="name">

        <a href="#"
           class="add-button"
           @click.prevent="submit"></a>

        <error class="pl"
               :text="errors.name"></error>
    </div>
</template>

<script>
    import Error from "@/components/forms/Error";
    import { createNamespacedHelpers } from 'vuex'
    import { createHelpers } from 'vuex-map-fields';
    import {submit} from "@/store/types";

    const { mapState, mapActions } = createNamespacedHelpers('eventCategory');
    const { mapFields } = createHelpers({
        getterType: 'eventCategory/getNewCategoryField',
        mutationType: 'eventCategory/updateNewCategoryField',
    });

    export default {
        name: 'EventCategoryCreateForm',
        components: {Error},
        computed: {
            ...mapState(['errors']),
            ...mapFields(['name'])
        },
        methods: {
            ...mapActions([ submit ])
        }
    }
</script>
