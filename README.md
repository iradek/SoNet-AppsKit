# sonet-appskit

## Description

This is a set of common services and components helping to create SoNET enabled apps. 

## Compilation

```bash
$ ng build sonet-appskit --prod
```

## Installation

```bash
$ npm install @iradek/sonet-appskit
```

## Using the library from typescript

*app.module.ts*
```typescript
// Import your library
import { SoNetAppsKitModule } from '@iradek/sonet-appskit';

@NgModule({
  (...)
  imports: [
    (...)
    // Specify your library as an import
     SoNetAppsKitModule, 
  ], 
 (...)
})
export class AppModule { }
```

## Configuration

*assets/sonet.config.json*
```
{
    "api_baseUrl": "https://[SoNET base Url]",
    "oauth_client_id": "[SoNET Client ID]",
    "oauth_client_secret": "[SoNET Client Cecret]",
    "oAuthGrant": "ResourceOwner",  //or ClientCredentials for non-Site level access
    "siteName": "[SoNET Site Name]",
    "userName": "[Name of the User with access to above Site]",
    "userPassword": "[Password of the User with access to above Site]",
    "passwordAlreadyEncrypted": false,
    "logging": false
}
```

## SoNET Engine

For more information about SoNET engine please visit: http://www.iradek.com

## License

MIT © [i-Radek Software](mailto:iradek@iradek.com)
