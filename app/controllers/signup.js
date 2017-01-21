import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service('session'),

  actions: {
    registerUser() {
      let user = this.get('model');

      user.save().catch((error) => {
        this.set('errorMessage', error)
      }).then((user) => {
        // this.get('session').authenticate('authenticator:devise', email, password)
        // .catch((reason) => {
        //   this.set('errorMessage', reason.error ||reason);
        // });
      })
    }
  }
});
