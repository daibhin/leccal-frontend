import Ember from 'ember';
import DeviseAuthenticator from 'ember-simple-auth/authenticators/devise';

export default Ember.Controller.extend({
  applicationController: Ember.inject.controller('application'),
  session: Ember.inject.service('session'),

  actions: {
    authenticate() {
      let { identification, password } = this.getProperties('identification', 'password');
      this.get('session').authenticate('authenticator:devise', identification, password)
      .then(() => {
        this.transitionToRoute('courses');
      })
      .catch((reason) => {
        this.set('errorMessage', reason.error || reason);
      });
    }
  }
});
