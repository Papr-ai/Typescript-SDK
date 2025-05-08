# Papr TypeScript MCP Server

It is generated with [Stainless](https://www.stainless.com/).

## Installation

### Direct invocation

You can run the MCP Server directly via `npx`:

```sh
export PAPR_PYTHON_SDK_API_KEY="My API Key"
export PAPR_PYTHON_SDK_BEARER_TOKEN="My Bearer Token"
npx -y papr-mcp
```

### Via MCP Client

There is a partial list of existing clients at [modelcontextprotocol.io](https://modelcontextprotocol.io/clients). If you already
have a client, consult their documentation to install the MCP server.

For clients with a configuration JSON, it might look something like this:

```json
{
  "mcpServers": {
    "papr_api": {
      "command": "npx",
      "args": ["-y", "papr-mcp", "--client=claude"],
      "env": {
        "PAPR_PYTHON_SDK_API_KEY": "My API Key",
        "PAPR_PYTHON_SDK_BEARER_TOKEN": "My Bearer Token"
      }
    }
  }
}
```

## Filtering tools

You can run the package on the command line to discover and filter the set of tools that are exposed by the
MCP Server. This can be helpful for large APIs where including all endpoints at once is too much for your AI's
context window.

You can filter by multiple aspects:

- `--tool` includes a specific tool by name
- `--resource` includes all tools under a specific resource, and can have wildcards, e.g. `my.resource*`
- `--operation` includes just read (get/list) or just write operations

See more information with `--help`.

All of these command-line options can be repeated, combined together, and have corresponding exclusion versions (e.g. `--no-tool`).

Use `--list` to see the list of available tools, or see below.

### Specifying the MCP Client

Different clients have varying abilities to handle arbitrary tools and schemas.

You can specify the client you are using with the `--client` argument, and the MCP server will automatically
serve tools and schemas that are more compatible with that client.

- `--client=<type>`: Set all capabilities based on a known MCP client

  - Valid values: `openai-agents`, `claude`, `claude-code`, `cursor`
  - Example: `--client=cursor`

Additionally, if you have a client not on the above list, or the client has gotten better
over time, you can manually enable or disable certain capabilities:

- `--capability=<name>`: Specify individual client capabilities
  - Available capabilities:
    - `top-level-unions`: Enable support for top-level unions in tool schemas
    - `valid-json`: Enable JSON string parsing for arguments
    - `refs`: Enable support for $ref pointers in schemas
    - `unions`: Enable support for union types (anyOf) in schemas
    - `formats`: Enable support for format validations in schemas (e.g. date-time, email)
    - `tool-name-length=N`: Set maximum tool name length to N characters
  - Example: `--capability=top-level-unions --capability=tool-name-length=40`
  - Example: `--capability=top-level-unions,tool-name-length=40`

### Examples

1. Filter for read operations on cards:

```bash
--resource=cards --operation=read
```

2. Exclude specific tools while including others:

```bash
--resource=cards --no-tool=create_cards
```

3. Configure for Cursor client with custom max tool name length:

```bash
--client=cursor --capability=tool-name-length=40
```

4. Complex filtering with multiple criteria:

```bash
--resource=cards,accounts --operation=read --tag=kyc --no-tool=create_cards
```

## Importing the tools and server individually

```js
// Import the server, generated endpoints, or the init function
import { server, endpoints, init } from "papr-mcp/server";

// import a specific tool
import createUser from "papr-mcp/tools/user/create-user";

// initialize the server and all endpoints
init({ server, endpoints });

// manually start server
const transport = new StdioServerTransport();
await server.connect(transport);

// or initialize your own server with specific tools
const myServer = new McpServer(...);

// define your own endpoint
const myCustomEndpoint = {
  tool: {
    name: 'my_custom_tool',
    description: 'My custom tool',
    inputSchema: zodToJsonSchema(z.object({ a_property: z.string() })),
  },
  handler: async (client: client, args: any) => {
    return { myResponse: 'Hello world!' };
  })
};

// initialize the server with your custom endpoints
init({ server: myServer, endpoints: [createUser, myCustomEndpoint] });
```

## Available Tools

The following tools are available in this MCP server.

### Resource `user`:

- `create_user` (`write`): Create a new user or link existing user to developer
- `update_user` (`write`): Update user details by user_id (\_User.objectId) and developer association
- `list_user` (`read`): List users for a developer
- `delete_user` (`write`): Delete user association with developer and the user itself by user_id (\_User.objectId)
- `get_user` (`read`): Get user details by user_id (\_User.objectId) and developer association

### Resource `memory`:

- `update_memory` (`write`): Update an existing memory item by ID.
  **Authentication Required**:
  One of the following authentication methods must be used:
  - Bearer token in `Authorization` header
  - API Key in `X-API-Key` header
  - Session token in `X-Session-Token` header
    **Required Headers**:
  - Content-Type: application/json
  - X-Client-Type: (e.g., 'papr_plugin', 'browser_extension')
    The API validates content size against MAX_CONTENT_LENGTH environment variable (defaults to 15000 bytes).
- `delete_memory` (`write`): Delete a memory item by ID.
  **Authentication Required**:
  One of the following authentication methods must be used:
  - Bearer token in `Authorization` header
  - API Key in `X-API-Key` header
  - Session token in `X-Session-Token` header
    **Required Headers**:
  - X-Client-Type: (e.g., 'papr_plugin', 'browser_extension')
- `add_memory` (`write`): Add a new memory item to the system with size validation and background processing.
  **Authentication Required**:
  One of the following authentication methods must be used:
  - Bearer token in `Authorization` header
  - API Key in `X-API-Key` header
  - Session token in `X-Session-Token` header
    **Required Headers**:
  - Content-Type: application/json
  - X-Client-Type: (e.g., 'papr_plugin', 'browser_extension')
    The API validates content size against MAX_CONTENT_LENGTH environment variable (defaults to 15000 bytes).
- `add_batch_memory` (`write`): Add multiple memory items in a batch with size validation and background processing.
  **Authentication Required**:
  One of the following authentication methods must be used:
  - Bearer token in `Authorization` header
  - API Key in `X-API-Key` header
  - Session token in `X-Session-Token` header
    **Required Headers**:
  - Content-Type: application/json
  - X-Client-Type: (e.g., 'papr_plugin', 'browser_extension')
    The API validates individual memory content size against MAX_CONTENT_LENGTH environment variable (defaults to 15000 bytes).
- `get_memory` (`read`): Retrieve a memory item by ID.
  **Authentication Required**:
  One of the following authentication methods must be used:
  - Bearer token in `Authorization` header
  - API Key in `X-API-Key` header
  - Session token in `X-Session-Token` header
    **Required Headers**:
  - X-Client-Type: (e.g., 'papr_plugin', 'browser_extension')

### Resource `document`:

- `upload_document` (`write`): Upload a document (PDF/HTML/TXT) to be processed and added to memory.
  **Authentication Required**:
  One of the following authentication methods must be used:
  - Bearer token in `Authorization` header
  - API Key in `X-API-Key` header
  - Session token in `X-Session-Token` header
    **Required Headers**:
  - Content-Type: multipart/form-data
  - X-Client-Type: (e.g., 'papr_plugin', 'browser_extension')
    **Form Data**:
  - file: The document file to upload (PDF/HTML/TXT)
  - metadata: (optional) JSON string containing additional metadata

### Resource `search`:

- `search_search` (`write`): Search through memories with authentication required.
  **Authentication Required**:
  One of the following authentication methods must be used:
  - Bearer token in `Authorization` header
  - API Key in `X-API-Key` header
  - Session token in `X-Session-Token` header
    **Recommended Headers**:
  ```
  Accept-Encoding: gzip
  ```
  The API supports response compression for improved performance. Responses larger than 1KB will be automatically compressed when this header is present.
