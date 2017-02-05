import DS from 'ember-data';

export default DS.Model.extend({
  email: DS.attr('string'),
  comments: DS.hasMany('comment', {async: true})
});
