export const state = () => ({
    user: 5
});

export const actions = {
    async logout({commit}) {
        firebase.auth().signOut().then(() => {
            console.log("Successfully signed out.")
        }).catch(function(error) {
            console.log("Unable to sign out: ", error);
        });
    }
    
}

export const mutations = {
    AUTH_STATE_CHANGED: (state, user) => {
        state.user = user;
    }
}

export const getters = {
    getUser(state) {
        return state.user;
    }

}