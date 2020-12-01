export default {
  state: {
    user: {},
    token: false,
  },
  mutations: {
    init(state) {
      let user = window.sessionStorage.getItem("user");
      if (user) {
        state.user = JSON.parse(user);
        state.token = state.user.token;
      }
    },
    login(state, user) {
      state.user = user;
      state.token = user.token;
      window.sessionStorage.setItem("token", state.token);
      window.sessionStorage.setItem("user", JSON.stringify(state.user));
    },
    logout(state) {
      state.user = {};
      state.token = false;
      window.sessionStorage.clear();
    },
  },
};
