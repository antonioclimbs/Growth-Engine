# **Chatbot UI**

**(Currently using OpenAI ChatGPT 3.5)**

## **Create an .env.local file**

Create a .env.local file in the root of the repo with the following info:

```bash
OPENAI_API_KEY=XXXXXXX
POSTGRESQL_USERNAME=USER_NAME
INSTANCE_IP_ADDRESS=IP_ADDRESS
DATABASE_NAME=DB_NAME
POSTGRESQL_PASSWORD=PASSWORD
```

> You can set `OPENAI_API_HOST` where access to the official OpenAI host is restricted or unavailable, allowing users to configure an alternative host for their specific needs.

> Additionally, if you have multiple OpenAI Organizations, you can set `OPENAI_ORGANIZATION` to specify one.

**Run Dev App**

```bash
npm run dev
```

**Build App**

```bash
npm run build
```

**Run Prod App**

```bash
npm run start
```

## **Important Files/Components**

### **Models**

`ConversationModel.ts` is where app connects to PostgreSQL database hosted to Google Cloud and is located within `utils/server/models`

### **Client Side API Controllers**

*All API controllers are located within `pages/api/controllers`*

`conversationController.ts` either creates a new instance of a conversation or updates an existing conversation into the `conversations` table. This has a bug that occurs when the user creates an new chat, selects another chat, then reselects that new chat instance. This also needs to be connected to user email, but currently user email is not required. This could be when creating a new conversation or attached to a user cookie/session id.

`dataController.ts` handles the **Import** functionality by sending parsed data to the `data` table. This also needs to be connected to a user email.

`masloRedirect.ts` handles the **Create graph** functionality. This will send all data to `graphs` table and sends unique url code to frontend for redirect. Redirect will be to *maslo.ai/conversation/**url_endpoint***

`userController.ts` is to create a new user. This currently doesn't have any direct functionality to the frontend, but can be incorporated with new prompt to include username/user email. This will send all data to `users` table.

### **Import and Create Graph Functionality**

*Both components are located withing `components/Settings`*

`CreateGraph.tsx` creates the sidebar button and modal (popup) components and functionality. This is a form that submits all fields when the user selects save button and sends info to `graphs` table using `/api/controllers/masloRedirect` endpoint.

`Import.tsx` creates the sidebar button and handles functionality. This sends parsed data to `data` table using `/api/controllers/dataController` endpoint. Currently only accepts .csv and .json files.

## **Configuration**

\***Note**\*: Currently requires and Open API key in order to run. Might include functionality to open a prompt to input individual Open API key. If you don't have an OpenAI API key, you can get one [here](https://platform.openai.com/account/api-keys).

When deploying the application, the following environment variables can be set:

| Environment Variable              | Default value                  | Description                                                                                                                               |
| --------------------------------- | ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------- |
| OPENAI_API_KEY                    |                                | The default API key used for authentication with OpenAI                                                                                   |
| POSTGRESQL_USERNAME               |                                | Necessary to attach to PostgreSQL database                                                                                 |
| INSTANCE_IP_ADDRESS               |                                | Grants access to connect to db. Make sure db accepts the VM IP address                                                                                  |
| DATABASE_NAME                     |                                | Required to connect to database instance                                                                                      |
| POSTGRESQL_PASSWORD               |                                | Required to connect to database instance                                                                                      |
| OPENAI_API_HOST                   | `https://api.openai.com`       | The base url, for Azure use `https://<endpoint>.openai.azure.com`                                                                         |
| OPENAI_API_TYPE                   | `openai`                       | The API type, options are `openai` or `azure`                                                                                             |
| OPENAI_API_VERSION                | `2023-03-15-preview`           | Only applicable for Azure OpenAI                                                                                                          |
| AZURE_DEPLOYMENT_ID               |                                | Needed when Azure OpenAI, Ref [Azure OpenAI API](https://learn.microsoft.com/zh-cn/azure/cognitive-services/openai/reference#completions) |
| OPENAI_ORGANIZATION               |                                | Your OpenAI organization ID                                                                                                               |
| DEFAULT_MODEL                     | `gpt-3.5-turbo`                | The default model to use on new conversations, for Azure use `gpt-35-turbo`                                                               |
| NEXT_PUBLIC_DEFAULT_SYSTEM_PROMPT | [see here](utils/app/const.ts) | The default system prompt to use on new conversations                                                                                     |
| NEXT_PUBLIC_DEFAULT_TEMPERATURE   | 1                              | The default temperature to use on new conversations                                                                                       |
| GOOGLE_API_KEY                    |                                | See [Custom Search JSON API documentation][GCSE]                                                                                          |
| GOOGLE_CSE_ID                     |                                | See [Custom Search JSON API documentation][GCSE]                                                                                          |
