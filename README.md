# maxandfood

## Database Updates

We use [sequelize](https://sequelize.org/master/index.html) to build database models.

### Caveats

- When generating a new model, need to add the `field` attribute in the migration file and specify underscore case if you in fact want underscore columns in the DB (preferred, see `User` model)
- Add `underscored: true` to model definition as well (see `User` model)

For new models, migrations, etc. refer to the below info or [docs](https://sequelize.org/master/manual/migrations.html).

### Execute Migrations

```
npm run migrate
```

### Generate Model

```
npx sequelize-cli model:generate --name TitleCase --attributes camelCase:string,dateField:date
```

### Generate Migration

```
npx sequelize-cli migration:generate --name migration-skeleton
```

## Nuxt Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).
