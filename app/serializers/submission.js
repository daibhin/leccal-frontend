import DS from 'ember-data';

export default DS.RESTSerializer.extend(DS.EmbeddedRecordsMixin, {
  attrs: {
    submitter: 'submitter_id',
    assignment: 'assignment_id',
    members: 'member_ids',
  },
});
