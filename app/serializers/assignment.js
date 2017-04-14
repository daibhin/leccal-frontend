import DS from 'ember-data';

export default DS.RESTSerializer.extend(DS.EmbeddedRecordsMixin, {
  attrs: {
    submissions: { embedded: 'always' },
    dueDate: 'due_date',
    startDate: 'start_date',
  }
});
