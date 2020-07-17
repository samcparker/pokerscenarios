export const state = () => ({
    user: null
});

export const mutations = {
    // SET_AUTH_USER: (state, event) => {
    //     // state.user = event.authUser;
    // }
    SET_AUTH_USER (state, event) {
        console.log(event);
        var authUser = event.authUser;
        state.user = authUser;

        if (authUser != null) {
            this.$router.push({
                path: "/user/me"
            });
        }
        else {
            this.$router.push({
                path: "/login"
            });
        }
    }
}
