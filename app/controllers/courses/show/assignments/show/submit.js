import Ember from 'ember';
import momentComputed from 'ember-moment/computeds/moment';
import fromNow from 'ember-moment/computeds/from-now';

export default Ember.Controller.extend({

  session: Ember.inject.service(),

  ajax: Ember.inject.service(),
  sessionAccount: Ember.inject.service('session-user'),
  currentUser: Ember.computed.reads('sessionAccount.user'),
  assignment: Ember.computed.reads('model'),

  hasNoSubmissions: Ember.computed.empty('assignment.submissions'),

  actions: {
    submitAssignment() {
      let parsedIds = this.get('memberIds').split(',').map((id) => id.trim());
      this.get('ajax').request('api/v1/assignments/submit', {
        method: 'POST',
        data: {
          assignment_id: this.get('assignment.id'),
          user_id: this.get('currentUser.id'),
          member_ids: parsedIds
        }
      }).then((response) => {
        debugger;
      }).catch((response) => {
        debugger;
      });

    }
  }
});
