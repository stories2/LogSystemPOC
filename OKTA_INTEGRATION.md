# Okta integration

Integration target

- Google

## Demo

- https://okta.gapmoe.net

## Getting started

Reference [link](https://developer.okta.com/docs/guides/sign-into-web-app-redirect/node-express/main/)

1. Choose IdP (Identity Provider)
   ![provicer](./img/screencapture-dev-97554177-admin-okta-admin-access-identity-providers-add-2023-05-28-16_31_04.png)

2. In this case, we choosed google.
   ![google](./img/screencapture-dev-97554177-admin-okta-admin-apps-add-app-2023-05-28-16_30_33.png)

3. To integrate with google, you must input the `client id`, and `client secret`.
   ![setup](./img/screencapture-dev-97554177-admin-okta-admin-access-identity-providers-add-2023-05-28-16_32_11.png)

4. Open the google cloud console and move to `Oauth consent screen` tab. And fill the form

![form](./img/screencapture-console-cloud-google-apis-credentials-consent-edit-2023-05-28-19_12_02.png)

5. Move to `credentials` tab. And click OAuth Client ID.
   ![credentials](./img/screencapture-console-cloud-google-apis-credentials-2023-05-28-16_41_38.png)

6. Setup your app's domain and endpoint
   ![domain](./img/screencapture-console-cloud-google-apis-credentials-oauthclient-2023-05-28-16_43_32.png)

7. Fill out something else...

![form](./img/screencapture-console-cloud-google-apis-credentials-consent-edit-2023-05-28-19_12_02.png)

8. After that, you can get `client id` and `client secret`

![secret](./img/screencapture-console-cloud-google-apis-credentials-2023-05-28-16_44_47.png)

9. Back to the Okta console. If you insert them, the setup is done.

![done](./img/screencapture-dev-97554177-admin-okta-admin-access-identity-providers-edit-0oa9qey96w6KNilej5d7-2023-05-28-16_52_48.png)
