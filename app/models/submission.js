import DS from 'ember-data';

export default DS.Model.extend({
  project: DS.belongsTo('assignment'),
  submitter:  DS.belongsTo('user'),
});
