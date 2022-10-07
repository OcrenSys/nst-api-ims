import * as PackageJSON from '../../package.json';

export default () => ({
  /*
  |--------------------------------------------------------------------------
  | Application Meta Data
  |--------------------------------------------------------------------------
  |
  | This values are defined in the package.json.
  |
  */

  name: PackageJSON.name,
  title: PackageJSON.title,
  description: PackageJSON.description,
  version: PackageJSON.version,

  /*
  |--------------------------------------------------------------------------
  | Application Port
  |--------------------------------------------------------------------------
  |
  | This value define on witch port the application is available. Default is
  | the standard port 8080
  |
  */

  port: parseInt(process.env.PORT, 10) || 3000,

  /*
  |--------------------------------------------------------------------------
  | Client URL
  |--------------------------------------------------------------------------
  |
  | This value defines the url to our web client.
  |
  */
  // clientUrl: process.env.CLIENT_URL || 'http://localhost:8080/tournament',
});
