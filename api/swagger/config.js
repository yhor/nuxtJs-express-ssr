import swaggerJSDoc from"swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { now } from '../helper/timeHelper';
// import dayjs from "dayjs";
// import utc from 'dayjs/plugin/utc';
// import timezone from 'dayjs/plugin/timezone';
// dayjs.extend(utc);
// dayjs.extend(timezone);



// Swagger definition
// You can set every attribute except paths and swagger
// https://github.com/swagger-api/swagger-spec/blob/master/versions/2.0.md
const swaggerDefinition = {
  openapi: "3.0.3",
  info: {
    // API informations (required)
    title: "NUXTJS  G2 API", // Title (required)
    version: "1.0.0", // Version (required)
    description: `NUXTJS API 
      --배포시간 ${now()}`,
  },
  components: {
    securitySchemes: {
      Access_Token: {
        type: "apiKey",
        name: "Authorization",
        in: "header",
      },
    },
    schemas: {
      success: {
        type: "object",
        properties: {
          success: { type: "boolean" },
          message: { type: "string" },
          data: { type: "object" },
        },
      },
      totalCount: {
        properties: {
          totalCount: { type: "integer" },
        },
      },
    },
    responses: {
      All: {
        200: {
          $ref: "#/components/responses/OK",
        },
        400: {
          $ref: "#/components/responses/BadRequest",
        },
        401: {
          $ref: "#/components/responses/Unauthorized",
        },
        500: {
          $ref: "#/components/responses/InternalServerErrors",
        },
      },
      OK: {
        description: "OK",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                success: { type: "boolean" },
                message: { type: "string" },
                data: { type: "object" },
              },
            },
            example: {
              success: true,
              message: "",
            },
          },
        },
      },
      BadRequest: {
        description: "BadRequest",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                success: { type: "boolean", example: false },
                message: { type: "string", example: "메세지 내용" },
              },
            },
          },
        },
      },
      Unauthorized: {
        description: "Unauthorized",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                success: { type: "boolean", example: false },
                message: { type: "string", example: "메세지 내용" },
              },
            },
          },
        },
      },
      InternalServerErrors: {
        description: "InternalServerErrors",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                success: { type: "boolean", example: false },
                message: { type: "string", example: "메세지 내용" },
              },
            },
          },
        },
      },
    },
  },
  definitions: {
    module: {
      type: "object",
      required: [
        "module",
        "mid",
        "browser_title",
      ],
      properties: {
        module: { type: "string", example: "모듈(board,page)"},
        mid: { type: "string", example: "모듈url"},
        browser_title: { type: "string", example: "브라우저 제목"},
        layout: { type: "string", example: "PC 레이아웃"},
        mlayout: { type: "string", example: "모바일 레이아웃"},
        skin: { type: "string", example: "PC 스킨"},
        mskin: { type: "string", example: "모바일 스킨"},
        content: { type: "string", example: "PC 내용"},
        mcontent: { type: "string", example: "모바일 내용" },
      },
    },
    
    FileName: {
      type: "object",
      required:[ "fileNames"],
      properties: {
        fileNames: { type: "array", example: ["apap.jpg", "apap.jpg"] }
      }
    },
    
    document: {
      type: "object",
      required: [
        "module",
        "mid",
        "browser_title",
      ],
      properties: {
        module: { type: "string", example: "모듈(board,page)"},
        mid: { type: "string", example: "모듈url"},
        browser_title: { type: "string", example: "브라우저 제목"},
        layout: { type: "string", example: "PC 레이아웃"},
        mlayout: { type: "string", example: "모바일 레이아웃"},
        skin: { type: "string", example: "PC 스킨"},
        mskin: { type: "string", example: "모바일 스킨"},
        content: { type: "string", example: "PC 내용"},
        mcontent: { type: "string", example: "모바일 내용" },
      },
    },

    castInfoPut: {
      type: "object",
      required: ["cast_member_cid", "program_cid"],
      properties: {
        cast_member_cid: { type: "integer", example: 0 },
        ep: { type: "integer", example: 11 },
        program_cid: { type: "integer", example: 6 },
        bigo: { type: "text", example: 'textarea' },
        // etc_list: {
        //   type: "array",
        //   example: [{ cid: "1", key: "키", value: "값" }],
        // },
        ep_info_list: {
          type: "array",
          example: [{ cid: "cid", key: "program_epi_info_cid", value: "값" }],
        },
        allow_list: { type: "array", example: [{ key: "cid", value: "값" }] },
        del_etc_list: { type: "array", example: [1, 2, 3, 4] },
      },
    },
    program: {
      type: "object",
      required: ["name"],
      properties: {
        name: { type: "string", example: "프로그램명" },
        desc: { type: "string", example: "비고" },
      },
    },
  },
};

if (process.env.NODE_ENV === "production") {
  swaggerDefinition.servers = [
    {
      url: "https://nuxt.yeol.tech",
      description: "Production server",
    },
  ];
} else {
  swaggerDefinition.servers = [
    {
      url: "http://localhost:8080",
      description: "localhost server",
    },
  ];
}

// Options for the swagger docs
const options = {
  // Import swaggerDefinitions
  swaggerDefinition,
  // Path to the API docs
  apis: [
    `./api/routes/*.js`,
    `./api/routes/*/*.js`
  ],
};

// Initialize swagger-jsdoc -> returns validated swagger spec in json format
const swaggerSpec = swaggerJSDoc(options);

module.exports = {
  swaggerUi,
  swaggerSpec,
};
