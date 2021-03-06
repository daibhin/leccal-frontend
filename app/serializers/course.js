import DS from 'ember-data';

export default DS.RESTSerializer.extend(DS.EmbeddedRecordsMixin, {
  attrs: {
    assignments: { embedded: 'always' },
    forum: { embedded: 'always' }
  }
});
