import DS from 'ember-data';
import ActiveModelAdapter from 'active-model-adapter';

export default ActiveModelAdapter.extend({
   namespace: 'api/v1',
   host: 'http://localhost:3000',
   authorizer: 'authorizer:devise'
});
