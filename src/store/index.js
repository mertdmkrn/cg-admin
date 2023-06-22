import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
import SecureLS from "secure-ls";
var ls = new SecureLS({ isCompression: false });

export default createStore({
    state : {
        user : null,
        token : null
    },
    mutations : {
        setUser(state, user)
        {
            state.user = user;
        },
        setToken(state, token)
        {
            state.token = token;
        },
        logoutUser(state)
        {
            state.token = null;
            state.user = null;
        },
    },
    getters : {
        _isAuthenticated: state => state.user !== null,
        _currentUser: state => state.user,
        _token: state => state.token,
    },
    plugins: [createPersistedState({
        storage: {
          getItem: (key) => ls.get(key),
          setItem: (key, value) => ls.set(key, value),
          removeItem: (key) => ls.remove(key),
        },
      })]
})