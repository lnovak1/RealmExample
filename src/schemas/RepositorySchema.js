/* eslint-disable quotes */
/* eslint-disable prettier/prettier */
/* eslint-disable comma-dangle */
export default class RepositorySchema {
  static schema = {
    name: 'Repository',
    primaryKey: 'id',
    properties: {
      id: { type: 'int'},
      photo:{type:'string'}
    },
  };
}
