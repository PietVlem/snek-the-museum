/*
Import the external libraries:
- faker
*/
import faker from 'faker';

/*
Import the internal libraries:
- logger
- Blog
- Category
- Post
- User
- Museum
- Exhibition
- Disability
- Zipcode
- Photo
*/
import { logger } from '../../../utilities';
import { Blog, Category, Post, User, Museum, Exhibition, Disability, Zipcode, Photo } from './schemas';

class Seeder {
    constructor() {
        this.blogs = [];
        this.categories = [];
        this.posts = [];
        this.users = [];
        this.museums = [];
        this.exhibitions = [];
        this.disabilities = [];
        this.zipcodes = [];
        this.photos = [];
    }

    /*
    Models
    */

    blogCreate = async (title, description) => {
        const blogDetail = {
            title,
            description,
            categoryId: this.getRandomCategory(),
        };
        const blog = new Blog(blogDetail);

        try {
            const newblog = await blog.save();
            this.blogs.push(newblog);

            logger.log({ level: 'info', message: `Blog created with id: ${newblog.id}!` });
        } catch (err) {
            logger.log({ level: 'info', message: `An error occurred when creating a blog: ${err}!` });
        }
    }

    categoryCreate = async (name, description) => {
        const categoryDetail = {
            name,
            description,
        };
        const category = new Category(categoryDetail);

        try {
            const newCategory = await category.save();

            this.categories.push(newCategory);

            logger.log({ level: 'info', message: `Category created with id: ${newCategory.id}!` });
        } catch (err) {
            logger.log({ level: 'info', message: `An error occurred when creating a category: ${err}!` });
        }
    }

    postCreate = async (title, synopsis, body) => {
        const postDetail = {
            title,
            synopsis,
            body,
            categoryId: this.getRandomCategory(),
            blogId: '5cd580b0e3d6d3fe3744ed74'
        };
        const post = new Post(postDetail);

        try {
            const newPost = await post.save();
            this.posts.push(newPost);

            logger.log({ level: 'info', message: `Post created with id: ${newPost.id}!` });
        } catch (err) {
            logger.log({ level: 'info', message: `An error occurred when creating a post: ${err}!` });
        }
    }

    userCreate = async (name, dayOfBirth, avatar, userRole, exhibitionsVisited, email, password) => {
        const userDetail = {
            name,
            dayOfBirth,
            avatar,
            userRole,
            exhibitionsVisited,
            email,
            localProvider: {
                password,
            },
        };
        const user = new User(userDetail);

        try {
            const newUser = await user.save();
            this.posts.push(newUser);

            logger.log({ level: 'info', message: `User created with id: ${newUser.id}!` });
        } catch (err) {
            logger.log({ level: 'info', message: `An error occurred when creating a user: ${err}!` });
        }
    }

    museumCreate = async (title, body) => {
        const museumDetail = {
            title,
            body,
            categoryId: this.getRandomCategory(),
        };
        const museum = new Museum(museumDetail);

        try {
            const newMuseum = await museum.save();
            this.museums.push(newMuseum);

            logger.log({ level: 'info', message: `Museum created with id: ${newMuseum.id}!` });
        } catch (err) {
            logger.log({ level: 'info', message: `An error occurred when creating a museum: ${err}!` });
        }
    }

    exhibitionCreate = async (name, info) => {
        const exhibitionDetail = {
            name,
            info,
            museumId: this.getRandomMuseum(),
        };
        const exhibition = new Exhibition(exhibitionDetail);

        try {
            const newExhibition = await exhibition.save();
            this.exhibitions.push(newExhibition);

            logger.log({ level: 'info', message: `Exhibition created with id: ${newExhibition.id}!` });
        } catch (err) {
            logger.log({ level: 'info', message: `An error occurred when creating a exhibition: ${err}!` });
        }
    }

    disabilityCreate = async (name) => {
        const disabilityDetail = {
            name
        };
        const disability = new Disability(disabilityDetail);

        try {
            const newDisability = await disability.save();
            this.disabilities.push(newDisability);

            logger.log({ level: 'info', message: `Disability created with id: ${newDisability.id}!` });
        } catch (err) {
            logger.log({ level: 'info', message: `An error occurred when creating a disability: ${err}!` });
        }
    }

    zipcodeCreate = async (code, city, country) =>{
        const zipcodeDetail = {
            code,
            city,
            country
        };
        const zipcode = new Zipcode(zipcodeDetail);

        try {
            const newZipcode = await zipcode.save();
            this.zipcodes.push(newZipcode);

            logger.log({ level: 'info', message: `Zipcode created with id: ${newZipcode.id}!` });
        } catch (err) {
            logger.log({ level: 'info', message: `An error occurred when creating a zipcode: ${err}!` });
        }
    }

    photoCreate = async (name, url) =>{
        const photoDetail = {
            name,
            url
        };
        const photo = new Photo(photoDetail);

        try {
            const newPhoto = await photo.save();
            this.photos.push(newPhoto);

            logger.log({ level: 'info', message: `Photo created with id: ${newPhoto.id}!` });
        } catch (err) {
            logger.log({ level: 'info', message: `An error occurred when creating a photo: ${err}!` });
        }
    }

    /* 
    Create instances of the model
    */

    createBlogs = async () => {
        await Promise.all([
            (async () => this.blogCreate(faker.lorem.sentence(), faker.lorem.paragraph()))(),
        ]);
    }

    createCategories = async () => {
        await Promise.all([
            (async () => this.categoryCreate(faker.lorem.word(), faker.lorem.sentence()))(),
            (async () => this.categoryCreate(faker.lorem.word(), faker.lorem.sentence()))(),
            (async () => this.categoryCreate(faker.lorem.word(), faker.lorem.sentence()))(),
            (async () => this.categoryCreate(faker.lorem.word(), faker.lorem.sentence()))(),
        ]);
    }

    createPosts = async () => {
        await Promise.all([
            (async () => this.postCreate(faker.lorem.sentence(), faker.lorem.paragraph(), `<p>${faker.lorem.paragraphs(10, '</p></p>')}</p>`))(),
            (async () => this.postCreate(faker.lorem.sentence(), faker.lorem.paragraph(), `<p>${faker.lorem.paragraphs(10, '</p></p>')}</p>`))(),
            (async () => this.postCreate(faker.lorem.sentence(), faker.lorem.paragraph(), `<p>${faker.lorem.paragraphs(10, '</p></p>')}</p>`))(),
            (async () => this.postCreate(faker.lorem.sentence(), faker.lorem.paragraph(), `<p>${faker.lorem.paragraphs(10, '</p></p>')}</p>`))(),
            (async () => this.postCreate(faker.lorem.sentence(), faker.lorem.paragraph(), `<p>${faker.lorem.paragraphs(10, '</p></p>')}</p>`))(),
            (async () => this.postCreate(faker.lorem.sentence(), faker.lorem.paragraph(), `<p>${faker.lorem.paragraphs(10, '</p></p>')}</p>`))(),
            (async () => this.postCreate(faker.lorem.sentence(), faker.lorem.paragraph(), `<p>${faker.lorem.paragraphs(10, '</p></p>')}</p>`))(),
        ]);
    }

    createUsers = async () => {
        await Promise.all([
            (async () => this.userCreate(faker.name.firstName(), faker.date.past(), faker.photo.photoUrl(), 'admin', [] , faker.internet.email(), 'wicked4u'))(),
            (async () => this.userCreate(faker.name.firstName(), faker.date.past(), faker.photo.photoUrl(), 'museum', [] , faker.internet.email(), 'wicked4u'))(),
            (async () => this.userCreate(faker.name.firstName(), faker.date.past(), faker.photo.photoUrl(), 'user', [] , faker.internet.email(), 'wicked4u'))(),
            (async () => this.userCreate(faker.name.firstName(), faker.date.past(), faker.photo.photoUrl(), 'user', [] , faker.internet.email(), 'wicked4u'))(),
        ]);
    }

    createMuseums = async() =>{
        await Promise.all([
            (async() => this.museumCreate(faker.lorem.words(),faker.lorem.paragraph()))(),
            (async() => this.museumCreate(faker.lorem.words(),faker.lorem.paragraph()))(),
            (async() => this.museumCreate(faker.lorem.words(),faker.lorem.paragraph()))(),
            (async() => this.museumCreate(faker.lorem.words(),faker.lorem.paragraph()))(),
            (async() => this.museumCreate(faker.lorem.words(),faker.lorem.paragraph()))(),
        ])
    }

    createExhibitions = async() =>{
        await Promise.all([
            (async() => this.exhibitionCreate(faker.lorem.words(),faker.lorem.paragraph()))(),
            (async() => this.exhibitionCreate(faker.lorem.words(),faker.lorem.paragraph()))(),
            (async() => this.exhibitionCreate(faker.lorem.words(),faker.lorem.paragraph()))(),
            (async() => this.exhibitionCreate(faker.lorem.words(),faker.lorem.paragraph()))(),
            (async() => this.exhibitionCreate(faker.lorem.words(),faker.lorem.paragraph()))(),
        ])
    }

    createDisabilities = async() => {
        await Promise.all([
            (async() => this.disabilityCreate(faker.lorem.word()))(),
            (async() => this.disabilityCreate(faker.lorem.word()))(),
            (async() => this.disabilityCreate(faker.lorem.word()))(),
            (async() => this.disabilityCreate(faker.lorem.word()))()
        ])
    }

    createZipcodes = async() => {
        await Promise.all([
            (async() => this.zipcodeCreate(faker.address.zipCode(), faker.address.city(), faker.address.country()))(),
            (async() => this.zipcodeCreate(faker.address.zipCode(), faker.address.city(), faker.address.country()))(),
            (async() => this.zipcodeCreate(faker.address.zipCode(), faker.address.city(), faker.address.country()))(),
            (async() => this.zipcodeCreate(faker.address.zipCode(), faker.address.city(), faker.address.country()))(),
            (async() => this.zipcodeCreate(faker.address.zipCode(), faker.address.city(), faker.address.country()))(),
        ])
    }

    createPhotos = async() => {
        await Promise.all([
            (async() => this.photoCreate(faker.lorem.words(), "https://images.unsplash.com/photo-1556951348-de7d29704984?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80"))(),
            (async() => this.photoCreate(faker.lorem.words(), "https://images.unsplash.com/photo-1556951348-de7d29704984?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80"))(),
            (async() => this.photoCreate(faker.lorem.words(), "https://images.unsplash.com/photo-1556951348-de7d29704984?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80"))(),
            (async() => this.photoCreate(faker.lorem.words(), "https://images.unsplash.com/photo-1556951348-de7d29704984?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80"))(),
        ])
    }

    /* 
    Random generatores
    */
    getRandomCategory = () => {
        let category = null;
        if (this.categories && this.categories.length > 0) {
            category = this.categories[Math.round(Math.random() * (this.categories.length - 1))];
        }
        return category;
    }

    getRandomMuseum = () => {
        let museum = null;
        if (this.museums && this.museums.length > 0) {
            museum = this.museums[Math.round(Math.random() * (this.museums.length - 1))];
        }
        return museum;
    }

    getRandomZipcode = () => {
        let zipcode = null;
        if (this.zipcodes && this.zipcodes.length > 0) {
            zipcode = this.zipcodes[Math.round(Math.random() * (this.museums.length - 1))];
        }
        return zipcode;
    }

    /* 
    Data seeder with faker
    */
    seed = async () => {
        this.categories = await Category.estimatedDocumentCount().exec().then(async (count) => {
            if (count === 0) {
                await this.createCategories();
            }
            return Category.find().exec();
        });

        this.posts = await Post.estimatedDocumentCount().exec().then(async (count) => {
            if (count === 0) {
                await this.createPosts();
            }
            return Post.find().exec();
        });

        this.blogs = await Blog.estimatedDocumentCount().exec().then(async (count) => {
            if (count === 0) {
                await this.createBlogs();
            }
            return Blog.find().exec();
        });

        this.users = await User.estimatedDocumentCount().exec().then(async (count) => {
            if (count === 0) {
                await this.createUsers();
            }
            return User.find().exec();
        });

        this.museums = await Museum.estimatedDocumentCount().exec().then(async (count) => {
            if (count === 0) {
                await this.createMuseums();
            }
            return Museum.find().exec();
        });

        this.exhibitions = await Exhibition.estimatedDocumentCount().exec().then(async (count) => {
            if (count === 0) {
                await this.createExhibitions();
            }
            return Exhibition.find().exec();
        });

        this.disabilities = await Disability.estimatedDocumentCount().exec().then(async (count) => {
            if (count === 0) {
                await this.createDisabilities();
            }
            return Disability.find().exec();
        });

        this.createZipcodes = await Zipcode.estimatedDocumentCount().exec().then(async (count) => {
            if (count === 0) {
                await this.createZipcodes();
            }
            return Zipcode.find().exec();
        });

        this.createPhotos = await Photo.estimatedDocumentCount().exec().then(async (count) => {
            if (count === 0) {
                await this.createPhotos();
            }
            return Photo.find().exec();
        });
    }
}
export default Seeder;
