import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  description: DS.attr('string'),
  forum: DS.belongsTo('forum'),
  posts: DS.hasMany('post'),
});
