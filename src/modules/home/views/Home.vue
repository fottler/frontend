<template>
    <div>
        <div id="home-header">
            <table>
                <tr>
                    <td class="navbar-button-col">
                        <menu-switcher :is-home-page="true"></menu-switcher>
                    </td>

                    <td class="search-input-col">
                        <input type="text"
                               class="search-input"
                               placeholder="Поиск"
                               v-model.lazy="text"
                               @keyup.enter="searchApply"
                               ref="searchInput">
                    </td>

                    <td class="button-col">
                        <geolocation-button @success="setFilterCoordinates"></geolocation-button>
                    </td>

                    <td class="button-col">
                        <a href="#"
                           class="square-button filter-button"
                           @click.prevent="showSidebar"></a>
                    </td>
                </tr>
            </table>
        </div>

        <Sidebar class="right-sidebar w-100"
                 headline="Фильтр"
                 v-model="sidebar.shown">
            <home-filter-container @hide-filter="hideSidebar"></home-filter-container>
        </Sidebar>

        <div>
            <scrollable-links-carousel :items="shownCategories"
                                       :active-item-id="activeCategoryId"
                                       caption-property="name"
                                       item-class="tag blue-tag"
                                       active-item-class="yellow-tag"
                                       @click="chooseCategory"></scrollable-links-carousel>
            <div class="container">

                <div class="row">
                    <div class="col-12 event-view-types">
                        <a href="#"
                           :class="{active: !mapShown}"
                           @click.prevent="hideMap">списки</a>
                        <a href="#"
                           :class="{active: mapShown}"
                           @click.prevent="showMap">на карте</a>
                    </div>
                </div>

                <home-event-list></home-event-list>

            </div>
        </div>

        <router-link to="/create-event"
                     class="button yellow-button fixed-add-button">добавить событие</router-link>
    </div>
</template>

<script>
    import sidebarHandler from "@/mixins/sidebarHandler";
    import HomeEventList from "@/modules/home/containers/HomeEventList";
    import ScrollableLinksCarousel from "@/components/ScrollableLinksCarousel";
    import { createNamespacedHelpers } from 'vuex'
    import { createHelpers } from 'vuex-map-fields';
    import {chooseCategory, hideMap, loadAll, runGeolocation, search, setCoordinates, showMap} from "@/store/types";
    import Sidebar from "@/components/common/Sidebar";
    import HomeFilterContainer from "@/modules/home/containers/HomeFilterContainer";
    import GeolocationButton from "@/components/map/GeolocationButton";
    import MenuSwitcher from "@/components/menu/MenuSwitcher";

    const { mapState: mapCategoryState, mapActions: mapCategoryActions } = createNamespacedHelpers('eventCategory');
    const { mapState: mapUserState } = createNamespacedHelpers('user');
    const { mapState, mapActions } = createNamespacedHelpers('home');
    const { mapFields } = createHelpers({
        getterType: 'home/getEditableFilterField',
        mutationType: 'home/updateEditableFilterField',
    });

    export default {
        name: 'Home',
        components: {MenuSwitcher, GeolocationButton, HomeFilterContainer, Sidebar, ScrollableLinksCarousel, HomeEventList},
        mixins: [sidebarHandler],
        async created(){
            if(!this.user || this.user.geolocation){
                this.runGeolocation();
            }
            else{
                this.loadAll();
            }
            this.loadCategories();
        },
        computed: {
            activeCategoryId(){
                return this.filter.category.length ? this.filter.category : [null];
            },
            shownCategories(){
                return [{id: null, name: 'все'}, ...this.categories];
            },
            ...mapCategoryState(['categories']),
            ...mapUserState(['user']),
            ...mapState(['mapShown', 'filter']),
            ...mapFields(['text'])
        },
        methods: {
            searchApply(event){
                this.$refs.searchInput.blur();

                this[search](event.target.value);
            },
            ...mapCategoryActions({
                loadCategories: loadAll
            }),
            ...mapActions([ loadAll, chooseCategory, search, runGeolocation, showMap, hideMap ]),
            ...mapActions({
                setFilterCoordinates: setCoordinates
            })
        }
    }
</script>
