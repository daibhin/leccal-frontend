import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  completed: DS.attr('boolean'),
  project: DS.belongsTo('project'),
});
