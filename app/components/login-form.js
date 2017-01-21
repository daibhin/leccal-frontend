import Ember from 'ember';
const { service } = Ember.inject;

export default Ember.Component.extend({
  session: Ember.inject.service('session'),

  actions: {
    authenticate(){
      this.get('session').authenticate('authenticator:devise', this.get('email'), this.get('password'));
    }
  }
});
