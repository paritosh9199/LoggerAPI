define({ "api": [
  {
    "type": "delete",
    "url": "/api/:version/removeLogs",
    "title": "RemoveLogs Route",
    "version": "1.0.0",
    "group": "Analytics",
    "description": "<p>Use this route to clear the tracking logs of a resource. This requires the usage of <code>resource_id</code> and <code>secret</code>.</p> <p><br> Sample snapshot of input data to be sent: <br><code> {<br>   &quot;resource_id&quot;: &lt;ResourceID&gt;,<br>   &quot;secret&quot;:&lt;Secret&gt;<br> } </code><br></p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "version",
            "defaultValue": "v1",
            "description": "<p>version of the API</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>Success/failure of operaton.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "message",
            "description": "<p>(Optional) Any status messages regarding the operation to be performed.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>Any data appended to the request.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"success\": true,\n  \"message\": <Message>,\n  \"data\": <Data>\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidVersion",
            "description": "<p>The <code>:version</code> is incorrect</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidResourceId",
            "description": "<p>The <code>resource_id</code>  is invalid or <code>null</code></p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidSecret",
            "description": "<p>The <code>secret</code> is invalid or <code>null</code></p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "error",
            "description": "<p><code>&lt;Message&gt;</code> contains more information about the error occured.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 4XX Error \n{\n   \"success\": false,\n   \"error\": <Message>\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./app.js",
    "groupTitle": "Analytics",
    "name": "DeleteApiVersionRemovelogs"
  },
  {
    "type": "delete",
    "url": "/api/:version/removeResource",
    "title": "RemoveResource Route",
    "version": "1.0.0",
    "group": "Analytics",
    "description": "<p>Use this route to delete all resource related logs and data. This requires the usage of <code>resource_id</code> and <code>secret</code>.</p> <p><br> Sample snapshot of input data to be sent: <br><code> {<br>   &quot;resource_id&quot;: &lt;ResourceID&gt;,<br>   &quot;secret&quot;: &lt;Secret&gt;<br> } </code><br></p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "version",
            "defaultValue": "v1",
            "description": "<p>version of the API</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>Success/failure of operaton.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "message",
            "description": "<p>(Optional) Any status messages regarding the operation to be performed.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>Any data appended to the request.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"success\": true,\n  \"message\": <Message>,\n  \"data\": <Data>\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidVersion",
            "description": "<p>The <code>:version</code> is incorrect</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidResourceId",
            "description": "<p>The <code>resource_id</code>  is invalid or <code>null</code></p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidSecret",
            "description": "<p>The <code>secret</code> is invalid or <code>null</code></p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "error",
            "description": "<p><code>&lt;Message&gt;</code> contains more information about the error occured.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 4XX Error \n{\n   \"success\": false,\n   \"error\": <Message>\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./app.js",
    "groupTitle": "Analytics",
    "name": "DeleteApiVersionRemoveresource"
  },
  {
    "type": "get",
    "url": "/",
    "title": "Index Route",
    "version": "1.0.0",
    "group": "Analytics",
    "description": "<p>This route redirects the request to <code> /fhash </code></p>",
    "filename": "./app.js",
    "groupTitle": "Analytics",
    "name": "Get"
  },
  {
    "type": "get",
    "url": "/api/:version/getLogs",
    "title": "GetLogs Route",
    "version": "1.0.0",
    "group": "Analytics",
    "description": "<p>Use this route to get the tracking logs of a resource. This requires the usage of <code>resource_id</code> and <code>secret</code>.</p> <p><br> Sample snapshot of input data to be sent: <br><code> {<br>   &quot;resource_id&quot;: &lt;ResourceID&gt;,<br>   &quot;secret&quot;: &lt;Secret&gt;<br> }</code><br></p> <p><br> Sample snapshot of <code>LogArray</code> Element: <br><code> {<br>   &quot;timestamp&quot;: &lt;Timestamp&gt;,<br>   &quot;message_type&quot;: &lt;MessageType&gt;,<br>   &quot;_id&quot;: &lt;ObjectID&gt;,<br>   &quot;ip&quot;: &lt;IPv4&gt;,<br>   &quot;method&quot;: &lt;Method&gt;,<br>   &quot;route_path&quot;: &lt;RoutePath&gt;,<br>   &quot;hash&quot;: &lt;Hash&gt;<br> } </code><br></p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "version",
            "defaultValue": "v1",
            "description": "<p>Version of the API.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "resource_link",
            "description": "<p>Link of the online resource.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "secret",
            "description": "<p>Secret Passkey associated with the Resource.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>Success/failure of operaton.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "message",
            "description": "<p>(Optional) Any status messages regarding the operation to be performed.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>It contains the LogArray Object.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"success\": true,\n  \"data\": {\n     \"log\": [<LogsArray>]\n  },\n  \"message\": <Message>\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidVersion",
            "description": "<p>The <code> :version </code> is incorrect</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidResourceId",
            "description": "<p>The <code>resource_id</code>  is invalid or <code>null</code></p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidSecret",
            "description": "<p>The <code>secret</code> is invalid or <code>null</code></p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "error",
            "description": "<p><code>&lt;Message&gt;</code> contains more information about the error occured.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 4XX Error \n{\n   \"success\": false,\n   \"error\": <Message>\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./app.js",
    "groupTitle": "Analytics",
    "name": "GetApiVersionGetlogs"
  },
  {
    "type": "get",
    "url": "/fhash",
    "title": "BrowserFingerprint Route",
    "version": "1.0.0",
    "group": "Analytics",
    "description": "<p>This route returns the fingerprint data of the browser through which the request has been sent.</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "hash",
            "description": "<p>(Unique) Hash of browser fingerprint</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "component",
            "description": "<p>Useragent data, Accept-Headers data</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "geoip",
            "description": "<p>IP Locale data</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"hash\": \"b44f487ae520ea5baeec1b226e993437\",\n  \"components\": {\n     \"useragent\": {\n         \"browser\": {\n            \"family\": \"Firefox\",\n            \"version\": \"68\"\n         },\n         \"device\": {\n            \"family\": \"Other\",\n            \"version\": \"0\"\n         },\n         \"os\": {\n            \"family\": \"Windows\",\n            \"major\": \"10\",\n            \"minor\": \"0\"\n         }\n     },\n     \"acceptHeaders\": {\n         \"accept\": \"text/html,application/xhtml+xml,application/xml;q=0.9;q=0.8\",\n         \"language\": \"en-US,en;q=0.5\"\n     },\n     \"geoip\": {\n         \"country\": null\n     }\n   }\n }",
          "type": "json"
        }
      ]
    },
    "filename": "./app.js",
    "groupTitle": "Analytics",
    "name": "GetFhash"
  },
  {
    "type": "post",
    "url": "/api/:version/registerResource",
    "title": "RegsiterResource Route",
    "version": "1.0.0",
    "group": "Analytics",
    "description": "<p>Before generating tracking data. A resource needs to be registered. A resource is a location of an Website/ Application on a Network which can be tracked. To register a resource <code>resource_link</code> and <code>secret</code> needs to be provided. <br><br> Sample Snapshot of input data to be sent: <br><code> {<br>   &quot;resource_link&quot;: &lt;ResourceLink&gt;,<br>   &quot;secret&quot;: &lt;Secret&gt;<br> }</code><br></p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "version",
            "defaultValue": "v1",
            "description": "<p>Version of the API.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "resource_link",
            "description": "<p>Link of the online resource.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "secret",
            "description": "<p>Secret Passkey associated with the Resource.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>Success/failure of operaton.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "message",
            "description": "<p>(Optional) Any status messages regarding the operation to be performed.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>Any data appended to the request.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"success\": true,\n  \"message\": <Message>,\n  \"data\": {\n     \"resource_id\": <ResourceID>\n  }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidVersion",
            "description": "<p>The <code>:version</code> is incorrect</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidResourceLink",
            "description": "<p>The <code>resource_link</code>  is invalid, duplicate or <code>null</code></p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidSecret",
            "description": "<p>The <code>secret</code> is invalid or <code>null</code></p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "error",
            "description": "<p><code>&lt;Message&gt;</code> contains more information about the error occured.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 4XX Error \n{\n   \"success\": false,\n   \"error\": \"<Message>\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./app.js",
    "groupTitle": "Analytics",
    "name": "PostApiVersionRegisterresource"
  },
  {
    "type": "post",
    "url": "/api/:version/track",
    "title": "Track/Log Activity Route",
    "version": "1.0.0",
    "group": "Analytics",
    "description": "<p>This route does the actual tracking of the user. It collects user tracking data and stores it in the Database. It stores data as an Object.</p> <p><br> Sample snapshot of input data to be sent: <br><code> {<br>   &quot;message_type&quot;:&lt;\\MessageType&gt;,<br>   &quot;method&quot;:&lt;Method&gt;,<br>   &quot;route_path&quot;:&lt;RoutePath&gt;,<br>   &quot;resource_id&quot;: &lt;ResourceID&gt;<br> }</code><br> <br>Sample database snapshot:<br> <code> {<br>   &quot;_id&quot; : &lt;ObjectID&gt;,<br>   &quot;resource_id&quot; : &lt;ResourceID&gt;,<br>   &quot;resource_location&quot; : &lt;Location&gt;,<br>   &quot;secret&quot; : &lt;Hash&gt;,<br>   &quot;log&quot; : [ <br>     {<br>       &quot;timestamp&quot; : &lt;Timestamp&gt;,<br>       &quot;message_type&quot; : &lt;MessageType&gt;,<br>       &quot;_id&quot; : &lt;ObjectID&gt;,<br>       &quot;ip&quot; : &lt;IPv4&gt;,<br>       &quot;method&quot; : &lt;Method&gt;,<br>       &quot;route_path&quot; : &lt;RoutePath&gt;,<br>       &quot;hash&quot; : &lt;Hash&gt;<br>     }<br>   ],<br>   &quot;__v&quot; : 0<br> }</code><br></p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "version",
            "defaultValue": "v1",
            "description": "<p>version of the API</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "resource_id",
            "description": "<p>Resource Unique Id.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "message_type",
            "defaultValue": "info",
            "description": "<p>Type of tracking data to be stored in database.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "method",
            "defaultValue": "get",
            "description": "<p>Method used for formulating the request which is being tracked.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "route_path",
            "description": "<p>The path or the location which is being tracked.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>Success/failure of operaton.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "message",
            "description": "<p>(Optional) Any status messages regarding the operation to be performed.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>Any data appended to the request.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"success\": true,\n  \"message\": <Message>,\n  \"data\": <Data>\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidVersion",
            "description": "<p>The <code>:version</code> is incorrect.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidRoutePath",
            "description": "<p>The <code>route_path</code>  is invalid or <code>null</code></p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidResourceId",
            "description": "<p>The <code>resource_id</code>  is invalid or <code>null</code></p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 4XX Error \n{\n   \"success\": false,\n   \"error\": \"<Message>\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "./app.js",
    "groupTitle": "Analytics",
    "name": "PostApiVersionTrack"
  },
  {
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "varname1",
            "description": "<p>No type.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "varname2",
            "description": "<p>With type.</p>"
          }
        ]
      }
    },
    "type": "",
    "url": "",
    "version": "0.0.0",
    "filename": "./documentation/main.js",
    "group": "D__webDevelopment_APIs_LoggerAPI_documentation_main_js",
    "groupTitle": "D__webDevelopment_APIs_LoggerAPI_documentation_main_js",
    "name": ""
  }
] });
