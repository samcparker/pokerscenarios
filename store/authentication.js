

export const state = () => ({
    user: null
});

export const mutations = {
    // SET_AUTH_USER: (state, event) => {
    //     // state.user = event.authUser;
    // }
    SET_AUTH_USER (state, event) {
        console.log(event);
        console.log("CHANGED!")
        var authUser = event.authUser;
        state.user = authUser;

        if (authUser != null) {
            // console.log("Go to user me")
            // this.$router.push({
            //     path: "/user/me"
            // });
        }
        else {
            this.$router.push({
                path: "/login"
            });
        }
    }
}
