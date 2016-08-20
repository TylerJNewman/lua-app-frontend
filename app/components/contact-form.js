import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['content--container'],
  name: null,
  email: null,
  message: null,
  required: true,
  submitted: false,

  store: Ember.inject.service(),

  actions: {
    submit(event) {
      let store = this.get('store');
      var contact = store.createRecord('contact', {
        name: this.get('name'),
        email: this.get('email'),
        message: this.get('message'),
      });
      contact.save().then(() => {
        this.set('name', null);
        this.set('email', null);
        this.set('message', null);
        this.set('submitted', true);
      }).catch((error) => {
        alert(error);
      });
    },
  },
});
