

export const state = () => ({
    user: null,
    username: null
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
            this.$fireStore.collection("users").doc(authUser.uid).get()
            .then((doc) => {
                var data = doc.data();
                state.username = data.username;
            }
            );

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
