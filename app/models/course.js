import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  code: DS.attr('string'),
  assignments: DS.hasMany('assignment'),
});
