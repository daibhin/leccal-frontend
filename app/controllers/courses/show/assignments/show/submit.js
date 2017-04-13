import Ember from 'ember';

export default Ember.Controller.extend({
  ajax: Ember.inject.service(),
  sessionAccount: Ember.inject.service('session-user'),
  currentUser: Ember.computed.reads('sessionAccount.user'),
  assignment: Ember.computed.reads('model'),

  hasNoSubmissions: Ember.computed.empty('assignment.submissions'),

  actions: {
    submitAssignment() {
      this.get('ajax').request('api/v1/assignments/submit', {
        method: 'POST',
        data: {
          assignment_id: this.get('assignment.id'),
          user_id: this.get('currentUser.id')
        }
      }).then((response) => {
        debugger;
      }).catch((response) => {
        debugger;
      });
    }
  }
});
