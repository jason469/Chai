const Fixtures = require('node-mongodb-fixtures');

export const loadFixtures = () => {
    const options = null;
    const fixtures = new Fixtures({
        dir: './src/fixtures',
        filter: '.*',
    });

    fixtures
        .connect(`${process.env.DB_CONNECTION}`)
        .then(() => fixtures.unload())
        .then(() => fixtures.load())
        .catch((e: any) => console.error(e))
        .finally(() => fixtures.disconnect());
}
