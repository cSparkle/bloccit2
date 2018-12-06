const sequelize = require('../../src/db/models/index').sequelize;
const Topic = require('../../src/db/models').Topic;
const Post = require('../../src/db/models').Post;

describe('Topic', () => {

    beforeEach((done) => {
        this.topic;
        this.post;
        sequelize.sync({force: true}).then((res) => {
            Topic.create({
                title: 'The best Lord of the Rings character',
                description: "Discussion on Tolkien's characters"
            }).then((topic) => {
                this.topic = topic;
                Post.create({
                    title: 'Why Gandalf Rocks',
                    body: 'Because he is a wizard, duh',
                    topicId: this.topic.id
                }).then((post) => {
                    this.post = post;
                    done();
                });
            }).catch((err) => {
                console.log(err);
                done();
            });
        });
    });

    describe('#create()', () => {
        it('should create a topic object with a title and description', (done) => {
            Topic.create({
                title: 'How to build a Node app',
                description: 'A tutorial thread on building a Node app from scratch'
            }).then((topic) => {
                expect(topic.title).toBe('How to build a Node app');
                expect(topic.description).toBe('A tutorial thread on building a Node app from scratch');
                done();
            }).catch((err) => {
                console.log(err);
                done();
            });
        });

        it('should not create a topic with a missing title or description', (done) => {
            Topic.create({
                title: 'How to build a Node app'
            }).then((topic) => {
                done();
            }).catch((err) => {
                expect(err.message).toContain('Topic.description cannot be null');
                done();
            });
        });
    });

    describe('#getPosts()', () => {
        it('should return all posts associated with a topic', (done) => {
            this.topic.getPosts().then((posts) => {
                expect(posts[0].title).toBe('Why Gandalf Rocks');
                done();
            });
        });
    });
});