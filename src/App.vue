<template>
    <div class="body-inner"
         :class="{'slide-transition-wrapper': pageTransitionIsInProgress}">

        <Sidebar class="navigation"
                 :opened="menuIsShown"
                 @close="hideMenu">
            <Menu :user="user"
                  :avatarUrl="avatarUrl"
                  :is-guest="isGuest"
                  :authorised="authorised"
                  @logout="onLogoutClick"></Menu>
        </Sidebar>

        <transition name="slide"
                    @before-enter="beforePageTransition"
                    @after-leave="afterPageTransition"
                    @leave-cancelled="afterPageTransition">
            <router-view/>
        </transition>

        <Loader :shown="loaderIsShown"></Loader>

        <critical-error-modal :shown="criticalErrorOccurred"></critical-error-modal>
    </div>
</template>


<script>
    import Sidebar from '@/components/common/Sidebar.vue'
    import Menu from "@/components/menu/Menu";
    import { createNamespacedHelpers } from 'vuex'
    import {logout} from "@/modules/user/store/auth/auth.types";
    import {resetUser} from "@/modules/user/store/user/user.types";
    import {addToLoader, hideMenu, removeFromLoader, showMenu} from "@/store/app/app.types";
    import Loader from "@/components/common/Loader";
    import ServerRequest from "@/core/ServerRequest";
    import ApiConfig from "@/config/ApiConfig";
    import CriticalErrorModal from "@/components/CriticalErrorModal";

    const { mapState: mapUserState, mapGetters: mapUserGetters, mapActions: mapUserActions } = createNamespacedHelpers('user');
    const { mapGetters: mapAuthGetters, mapActions: mapAuthActions } = createNamespacedHelpers('auth');
    const { mapState, mapGetters, mapActions } = createNamespacedHelpers('app');

    export default {
        name: 'App',
        components: {CriticalErrorModal, Loader, Menu, Sidebar},
        data(){
            return {
                pageTransitionIsInProgress: false
            }
        },
        computed: {
            ...mapState(['menuIsShown', 'criticalErrorOccurred']),
            ...mapGetters(['loaderIsShown']),
            ...mapUserState(['user']),
            ...mapUserGetters(['avatarUrl']),
            ...mapAuthGetters(['isGuest', 'authorised'])
        },
        watch: {
            $route(){
                this[hideMenu]();
            }
        },
        async created(){
            ServerRequest.baseUrl = ApiConfig.baseUrl;
            ServerRequest.before = this.beforeServerRequest;
            ServerRequest.after = this.afterServerRequest;
        },
        methods: {
            onLogoutClick(){
                this[logout]();
                this[resetUser]();
            },
            beforePageTransition(){
                this.pageTransitionIsInProgress = true;
            },
            afterPageTransition(){
                this.pageTransitionIsInProgress = false;
            },
            beforeServerRequest(){
                this[addToLoader]();
            },
            afterServerRequest(){
                this[removeFromLoader]();
            },
            ...mapActions([ showMenu, hideMenu, addToLoader, removeFromLoader ]),
            ...mapUserActions([ resetUser ]),
            ...mapAuthActions([ logout ])
        }
    }
</script>
