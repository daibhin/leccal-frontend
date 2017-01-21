import DS from 'ember-data';
import MF from 'model-fragments/attributes';

export default DS.Model.extend({
  calendar_events: MF.fragmentArray('calendar-event'),
});
