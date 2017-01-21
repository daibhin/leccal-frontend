import Ember from 'ember';

export default Ember.Controller.extend({
  course: Ember.computed.reads('model'),
});
