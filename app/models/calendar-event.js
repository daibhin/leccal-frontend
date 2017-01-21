import DS from 'ember-data';
import MF from 'model-fragments';

export default MF.Fragment.extend({
  assignment: DS.attr(),
  studentCount: DS.attr(),
});
