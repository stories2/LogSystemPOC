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
- MS AD   (Microsoft Active Directory)
- MS Oauth(Microsoft's implementation of the Oauth protocol)

### 3rd-party services

| name    | MS SSO | MS AD | MS OAuth | Price | ETC |
|:-------:|:------:|:-----:|:--------:|:-----:|:---:|
| Okta    |        |       |          |       |     |
| Auth0   |        |       |          |       |     |
| OneLogin|        |       |          |       |     |
| Firebase|        |       |          |       |     |
