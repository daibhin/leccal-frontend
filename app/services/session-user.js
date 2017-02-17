import Ember from 'ember';
const { inject: { service }, isEmpty, RSVP } = Ember;

export default Ember.Service.extend({
  session: service('session'),
  store: service(),

  loadCurrentUser() {
    return new RSVP.Promise((resolve, reject) => {
      let userId = this.get('session.data.authenticated.user_id');
      if (!isEmpty(userId)) {
        this.get('store').findRecord('user', userId).then((user) => {
          this.set('user', user);
          resolve();
        })
        .catch((e) => {
          debugger;
        });
      } else {
        resolve();
      }
    })
    .catch((e) => {
      debugger;
    });
  }
});
