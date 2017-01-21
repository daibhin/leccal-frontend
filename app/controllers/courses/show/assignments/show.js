import Ember from 'ember';

export default Ember.Controller.extend({
  assignment: Ember.computed.reads('model'),
});
