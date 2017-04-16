import DS from 'ember-data';

export default DS.Model.extend({
  assignment: DS.belongsTo('assignment'),
  submitter:  DS.belongsTo('user'),
  members:  DS.hasMany('user', { async: true }),
});
