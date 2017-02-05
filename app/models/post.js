import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr('string'),
  topic: DS.belongsTo('topic'),
  comments: DS.hasMany('comment'),
});
