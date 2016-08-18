import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    openNav() {
      document.getElementById("myNav").style.width = "100%";
    },

    closeNav() {
      document.getElementById("myNav").style.width = "0%";
    },
  }
});
