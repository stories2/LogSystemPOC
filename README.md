# LogSystemPOC

POC the log system

# Objective

|                                      senario                                       |              required grouping field              |                                                                                                                   description                                                                                                                   |
| :--------------------------------------------------------------------------------: | :-----------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| Recognize which platform and feature is the most crash issue that the client uses. |      `user-agent`, `trace-id`, `feature-id`       | Grouping platform using `user-agent` keyword and check the `trace-id` keyword printed twice(req, res) or not. If it only shows once, that means it crashed. And then group the feature using `feature-id` to find out what is the most problem. |
|            Figure out which part having trouble with a specific client.            | `trace-id`, `session`, `service-id`, `feature-id` |                           First, filtering a specific client using `session`. Grouping the `trace-id` for travel the process. And find out which feature crashed in which service using `feature-id` and `service-id`                           |
|                   Figure out which service's instance is failed                    |       `trace-id`, `service-id`, `hostname`        |                           If `trace-id` is only printed once, then it means crashed. Group by `service-id` to find which service is mostly crashed. And then filtering using the `hostname` to specify the instance.                            |

## Demo feature

- MS SSO  (Microsoft Single Sign-On)
	•	Azure AD Single Sign-On documentation: https://docs.microsoft.com/en-us/azure/active-directory/manage-apps/what-is-single-sign-on
	•	Azure AD Single Sign-On with SAML: https://docs.microsoft.com/en-us/azure/active-directory/manage-apps/configure-single-sign-on-saml
- MS AD   (Microsoft Azure Active Directory)
	•	Azure Active Directory documentation: https://docs.microsoft.com/en-us/azure/active-directory/
	•	Azure AD developer documentation: https://docs.microsoft.com/en-us/azure/active-directory/develop/
- MS Oauth(Microsoft's implementation of the Oauth protocol)
	•	Microsoft identity platform documentation: https://docs.microsoft.com/en-us/azure/active-directory/develop/quickstart-v2-overview
	•	Microsoft identity platform and OAuth: https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-protocols-oidc

### 3rd-party services

| name    | MS SSO | MS AD | MS OAuth | Price | ETC |
|:-------:|:------:|:-----:|:--------:|:-----:|:---:|
| Okta    |        |       |          |       | Doc: https://developer.okta.com/docs/    |
| Auth0   |        |       |          |       | Doc: https://auth0.com/docs/    |
| OneLogin|        |       |          |       | Doc: https://developers.onelogin.com/    |
| Firebase|        |       |          |       | Doc(Auth): https://firebase.google.com/docs/auth, Doc(OAuth): https://firebase.google.com/docs/auth/web/oauth    |

#### ChatGPT Help

- Me

```
Hi, i have a question. In my company is planning to integrate “ms sso”, “ms AD” and “ms oauth” to our service.
So, i have to make some POC. 
Could u recommend me how to do that things or 3rd party services?
```

- ChatGPT

```
Certainly! Integrating "MS SSO" (Microsoft Single Sign-On), "MS AD" (Microsoft Active Directory), and "MS OAuth" (Microsoft's implementation of the OAuth protocol) can provide a seamless authentication and authorization experience for your service. Here are some recommendations on how to approach the integration and potential third-party services you can consider:

1. Microsoft SSO (Single Sign-On): Microsoft Azure Active Directory (Azure AD) is a popular choice for implementing SSO. It provides a robust identity and access management solution with support for various authentication protocols such as SAML and OpenID Connect. You can explore Azure AD documentation and guides to understand the integration process.

2. Microsoft AD Integration: If your organization already has an on-premises Active Directory infrastructure, you can leverage Azure AD Connect to synchronize identities between your on-premises AD and Azure AD. This integration allows you to extend your existing AD infrastructure to the cloud, enabling seamless authentication and user management across both environments.

3. Microsoft OAuth: OAuth is an open standard for authorization and is widely used for secure API authentication. Microsoft provides Azure Active Directory (Azure AD) as an OAuth provider. You can register your application with Azure AD to obtain the necessary client credentials and configure the OAuth flow for your service.

4. Third-Party Services: If you prefer not to handle the complexities of integration yourself, there are third-party identity providers and authentication services available. Some popular options include Okta, Auth0, and OneLogin. These services provide comprehensive identity management solutions, including SSO, OAuth support, and integration with Microsoft technologies.

When conducting your POC, consider the specific requirements of your service, the existing infrastructure, and the level of control and customization needed. Microsoft's official documentation and the documentation of third-party services can guide you through the integration process step-by-step. Additionally, reaching out to Microsoft support or third-party service providers for assistance can be helpful if you encounter any challenges.
```

- Me

```
Is the firebase can do it too?
```

- ChatGPT

```
Yes, Firebase can also be used for authentication and authorization purposes in your service. Firebase Authentication is a service provided by Google's Firebase platform that offers a secure and easy-to-use authentication system for web, mobile, and server-side applications. While Firebase Authentication does not directly integrate with "MS SSO" or "MS AD" as mentioned in your question, it does provide its own authentication mechanisms and can work independently or alongside other identity providers.

With Firebase Authentication, you can support various authentication methods such as email/password, social logins (Google, Facebook, etc.), phone number verification, and more. Firebase also supports OAuth authentication, allowing you to integrate with popular OAuth providers like Microsoft, Google, and others.

If your intention is to solely rely on Firebase Authentication and not specifically integrate with "MS SSO" or "MS AD," Firebase can be a suitable option. However, if you require direct integration with Microsoft technologies and want to leverage existing "MS SSO" or "MS AD" implementations, using Microsoft's solutions like Azure AD would be more appropriate.

Consider your specific requirements, the existing infrastructure, and the level of integration you need while deciding whether to use Firebase or Microsoft's solutions for authentication and authorization in your service.
```
