/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./utils/schema.js",
    dialect: "postgresql",
    dbCredentials: {
        url: 'postgresql://skillify-db_owner:tm5yEBgi6oJW@ep-weathered-poetry-a16nvxcl.ap-southeast-1.aws.neon.tech/skillify-db?sslmode=require',
    },
};
