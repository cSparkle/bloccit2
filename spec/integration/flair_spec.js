const request = require('request');
const server = require('../../src/server');
const base = 'http://localhost:3000/topics';
const sequelize = require('../../src/db/models/index').sequelize;
const Topic = require('../../src/db/models').Topic;
const Flair = require('../../src/db/models').Flair;

describe('routes : flair', () => {
    beforeEach((done) => {
        this.topic;
        this.flair;

        sequelize.sync({force: true}).then((res) => {
            Topic.create({
                title: 'Summer Games',
                description: 'Post your Summer Games stories.'
            }).then((topic) => {
                this.topic = topic;

                Flair.create({
                    name: 'Funny',
                    color: 'green'
                }).then((flair) => {
                    this.flair = flair;
                    done();
                }).catch((err) => {
                    console.log(err);
                    done();
                });
            });
        });
    });

    describe('GET /topics/:topicId/flair/new', () => {
        it('should render a new flair form', (done) => {
            request.get(`${base}/${this.topic.id}/flair/new`, (err, res, body) => {
                expect(err).toBeNull();
                expect(body).toContain('New Flair');
                done();
            });
        });
    });
});