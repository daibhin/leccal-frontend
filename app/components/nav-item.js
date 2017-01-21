import Ember from 'ember';

export default Ember.Component.extend({
  iconLink: Ember.computed(name, function(){
    return `assets/images/${this.get('icon')}.svg`;
  }),
});
