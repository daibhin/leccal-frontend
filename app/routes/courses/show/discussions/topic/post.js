import Ember from 'ember';
import { task } from 'ember-concurrency';

export default Ember.Route.extend({
  model: function(params) {
    return this.store.findRecord('post', params.post_id);
  },
});
