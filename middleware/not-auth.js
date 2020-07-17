export default function ({ store, redirect }) {
// If the user is not authenticated
console.log("User: ", store.state.authentication.user);
    if (store.state.authentication.user == null) {
        return redirect('/login')
    }
}