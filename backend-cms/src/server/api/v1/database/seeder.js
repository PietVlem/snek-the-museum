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
            (async() => this.photoCreate(faker.lorem.words(), "data:image/jpeg;base64,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"))(),
            (async() => this.photoCreate(faker.lorem.words(), "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMTEhUTExMVFRUWFxUYFxgVFRcVFRcXFRUWFhUVFxUYHSggGBolHRUVITEhJSkrLy4uFx8zODMtNygtLisBCgoKDg0OGhAQGi0dHyUtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIALcBEwMBIgACEQEDEQH/xAAbAAACAwEBAQAAAAAAAAAAAAAEBQIDBgABB//EADwQAAEDAgQEAwcDAgUEAwAAAAEAAhEDIQQFMUESUWFxIoGRBhMyobHB0RRC8BXhI1JicvEHM4KSorLS/8QAGQEAAwEBAQAAAAAAAAAAAAAAAQIDAAQF/8QAIREAAgICAwADAQEAAAAAAAAAAAECEQMhEjFBIjJRYXH/2gAMAwEAAhEDEQA/AMcKaKw7UOHojDlIw0FFU6qxxUGuCyA0eBqlxLwryExqOdVUA9QcExyjKXVnQAY5oGoHw7HPdwtElaXL/Z11i+yd5VkLKA4jcoyviwoTyV0XhivsFaGtbwoX3kKjFV5OipLrWXI5W7OtRSVHYzG8JVDcVMwrKmFNRtxfZdgspdedUKYbRV+qjVXe8EE81aMlJPiMhe1MpfBaNIsiosDkgbAVgj6WLHND4HIHN+IohmVEE3m6NMFoOoVGkXQuJ9nmPBc03Xj8NyKJwT3CN1SGRxJzxqRlK+HfRdBVozExqtti8vZVbcXWFzfK3UXRtzXdDJaOGeNoLwWLc52i1mCrGFi8qrAFanBVgd1ZEqLMyxVtVjcbiJctTj4IMLHY5pa42QkFFrKsK1lc7IFlRFU6YkG6yAzRZRmDhYwtB+qDhuspRqNiZR9PH2smMU540XWPxFitPmWLkGVm61ylYQemRN0S1oQxbC73iUwxZouQArHmuRMBhqIoNQ4cjqLbKLOgrrGyqBU8QqwsgFyiVzQnGR5Qazr6BEx7kXs+6seI2at5hME2i0AAKzD0hSYGtUHS5RnMrGIDjcU/ZshC06bnW4dU3FIDUr19W3hC52v0un+ADMp3cim4Fg2V1IE6/JTa0DUytRrKW4cbKw4FyJYDFgB3VNRz5s4EchqtxNZwwRCi6i7YK2kCbyR3srfesGplMoi8gVmHcQFN+BlV4nN2MPD1iO4JH0VH9YmSWkAEtk6SNfKyNJG2EHLWgXN0OMvc3iggkmwUH5oIJAvIB0kf3jZROYiLlxPQCfUINIZcg2hScInXfko5rlwrN4SLlB0sx5DTWSf/AM3R+Hx06x1RjJIWUGz5/mWWOougyRzUsJjC20lfQcRRZVBBbMpDicqw4lpBbB10C6Y5lWzmeFt6F4x4jqkmZPvKc5jkTjek4FvdZnFyDEzCqpqS0TcHHsrBM2R9J53BQdA3RtMzZPERldTEmYCsbVdsVIYa+qmaBbsiYBxFVx1KpY9E4mEIGIGLKhshir3NMKlYx6AuXoXIBAW6prR0QVOndHaBRZUHraqPCpxJTbBez9R9z4G8z+FrS7Co2QyPLTVeBtuvo2FwjKTAALpX7P4OnRHxAnmmhrtJ+IKcpplIwaPCRubLveiICFxJ954GCRNyNkZQpCk0bkDc/cqFlaPRhC43VooMb/PsgKuZmYnybcqg4w8RLrRsdf7LWjUxy+oxokkIOtmzWmBF9LGJ9IWXx2cvc6GNnnMn52+qto5gxscRHHGgAjykz81uQeI6/qdQkz8ov5TZR/qMCSQLTDjHqQbecJT/AFNsgix/1HwkfUHdB4vMg551Pfhd5SPF80LDxHWJxTnSRMEDf8iEuxDnNGpOhM8j05a+hVGCF4aCBy/b1HCNFZmGIbTplzuzb3J5dQmVt0ZpJWVVnktHFABMku1gfC4dbz6Dmqne1FNvhDeKAAJPK59SsnnOeF0tGg1jRZjDZgS64IOy644ox72czySl0fVsP7S0iNODU6AiTuYVv6ynAJIAO4u0+Wy+V5tWf7sFrohw4o5FE4TMCxoMy1whzTv+ChLDGXWgxyyW3s+pmoCAW1OHkSGwfL+yF/qdem4h3C7YFrW+lyFkcmzYhzqJLi0iWu5t/I+yOfiXj4SCBYt2PYgyOxHkuOeNxdHVGaatGyweZPkBwg9eED0lNsRh2VmQ8T2/ssHl2IIEta4u/wBLQ9oPXcdk5wmLqWksmbib/wDqdEm0M0mGU6X6dxa6eB1hvqs17RZb7p3E34XXW+wlRlYQ6/UjRC5vlwc3gcLbFXxTr/CGWF69PlrnqyliyCjc2wDabuEElAfppsuxHE1Q6wFcEFGmtNkjp4bg0JXVceW2hOmIX4yEE03XVcSHIcOJKFmGNSIQTzdWDRQgIhPIXIgMC5GjA1F10ZTYXENGp0QtGmdwtV7IhvGSRJAkFczdbLpW6GWAymnhaXHUAc889kgzrP3GRbh5g3CYZ7mZqMeJECei+X4vMHNcQL+a59zZ1L4Id1faN9gx5jeSjcgzOviH8FME3uTNud5WWwTg94ABcTsBK+x+zeVNw1EWhxuTA+yMkkBNsY0nCizh4rnWeaEqVS6QHB3mfsVTjsYAeE8RJ0MgekkJHiajgZJNtJ4bdfCRPqo2USGbsTcgOEj9oNz0JEkdkszHMQDwggGPh8RI6kaNvOqAxGIebOqGBvZro/0kSkmYY6LNaGtNtZmeu5sio2BsatxwptNR5k7DXVZ3H+05JNvmhM3xLuARePQTzSR7OIaEu3Jd20A+8rqx41VsjPI1pD/B52SQJMdVtMny+rWAJJ4bQHfadlgfZzLgXgkTH8AX1/KncDAeSnlpPQ+NutlTMvLBLnQ0ep7flY32rzbjdDDIbYDqtDnGNL+K5sCsp/Tm1AfFwm95VMEbdk88q0ZqvVMQd9VB4JexrRYanpyRlPKPEQ6qCAddZ7I9rGtHCPXdXJp0imm3Y6GyMyTImveBWe5rSYa5gBbc2B3CoDI1V9PFECGlEUZYvJjhKwDvE0ghjhoRvPVRxbSCCN9D9im+RB+IpvZUuIlk6hw5Kz9N/hkGIO0SfSVy5fsdOL6izLsc4fGCbQSBDh30P1TPC12tdeIP+v4uxNz6peKUSWkkA3a4zHQTcdlZRY0cuE6wQ4A94F1BoqjYYGvdscR7nbtBT6jiRUBbImPNZHKRHiBntZFU8weKtgAOgv31upxdbGlGxZn2WOaS5172lZxr4N19JzYe9omZmNdgvmWLZBIXo4p8lZ52WHF0H1Kw5pPja4JtsvC2V6yh0VWydFbFfTddTNGFUWwgAIcVRx3lTlVvYtYyQW2uFyEDFyPIPEYtT/2XqN4i2fEQs3QkrRez+CBeCZsueWykexf7Q4YtLhe8wF86x7C1x5r6n7ZYjh2WIyTKzicSAbAGTH3UcZ0z6NL/ANO/Z0ADEVYJN23sB+Vs8RjiTEGNogDtOy5rG02BgFgOVkuq1BMBtjyhp9bKc5WxoxpAeNc1xJLw07afO0HukeMJiAT3DeId7EIrMqJlxYCDzLmnblKRcLg6XPYQdm8QPctFh3lCKGbKatfWahJ5NIjzHChHP4jue86dz9fmm+LwjLG8WiL9gL3CEpYIzpAnvPUnf591VNE3YPWHhgC5/miBOEM6LQQ0zAB67evL+dqSQBMz0HPkmUjNJlmR4PxNaNTcnstpi38LYGqRezrZdxdwN9h/dMKz5l3cDy3UpO2OugHEOtHqVm8xw1ybwnVVxIPeyX4pWxviSmuQlcIUqVyROitrNBOirp4Rx+EG5V1KyLjRJz5CIwTRbmjsFkVQizSeaPGRupOaXg8LtxePJZyT1ZlCS3Q49mjfkuzICm9wiRJJ4bGNZ7aK/JqjIsdLQbRzlU+09OKgPEWyAQQN9NNCDouaS2dEXoX06om/ltY8jaOxUsWJ1+E2Ph4m25wJn6KGHYQS2J2iQ5pn9zJ0/wBunbRG0PCS0ugHSRbsCfl6WUmOgfLHcB8LgWnQExfkHSpPx9QPj3dVv/yEf7mnRe16fA8ERw9Z4gev4PqU3cP8PimSBIEnh+SRsdDrIMSXNh245fZKvaLIw+SAGxyFyl+RZjW95w1OEXtw6R3K1xfHmnxTcXRPJBSVnzVmCh0ck6y3ANcJhF55QaHS1pE+isyqq1jYO69KOzzpadC/MsvbBtcLLubeFvcyZLSQsHiWOa88QiVpIVMsLRCELrokVBCDquugx0wpq5CCovEpXQ6y2lJC3+RYPhbJCyXs7h+J4svobQGtAUpOkGKMr7SZUav90H7I5UaJeft/ZPMxqcTgAVOj4do57/Zc19nUCZnULWw5wJNrEg+R3KROwTf3FzDrcGT9PndMs4zWkDDrnYQfrePRL/1DNQ2RrqY8psppjFLsPGgaWjmRIjqG69yl+OAj4W+YDT6kSUdi8U1wgzbeQGjz5paCDZp4jtwtBaOpga+SZAYC4/6QI5AyfM6DyVR4htA33Mcv5KOeDueInmLd9dO6AxL7XuB8IAjWLxtMj0HK1UIzjWcQW6CL9AdJPVReRAAsdp5ftPc6+fRVOaYgHU684DRPzK8wzHcbpg9OUGw+aYBrckYGtJG4t2iB9D6hW4sy0R5oWg/hY1k3I85JJP3RtvdydN1L0p4JnOvA9UM9nGeEXMoujRNZ/Cze5O38lQ9sqgwWHaKYl7nRxG5+ElWit0yTeiw5XRouYMVWbS4pMEgGEThM0wLXyyrTtcDi1A+6+TYzHVKry+o9z3HdxkwNuyrY9X4r0lzPs1P26ol5NKkSIIMi0805w2bsfSpiqPEXgBw+GCLE8tQvimBzB1MWgIvC5xVaf+44iWktLjB4dJSSx30PGR9Z9o8EKPBXZPxcLwNCHAwT2IjzUc+8VGi+W8MEGeR028j0JSrG+0wrYdlENIc4sJJiIbe252Tuu1v6dtN0WjbpB+RUpKkkx12Zuk0B0cUkGxO/nsdjzhGNqftcCQeRkT0Gx+ukKnEUBxC0iB3I/wCAPkp4egZLf2kBwBFtdQdrhSY6DqFEO2g6a2Pntt8uSvwodwkE89YMHuNkLg8QQ4+IyPCRb0I0RYeXDibE6EHQdCOXdRkVQpwbXe98VjOxkFa12JjhiNLgkyss+r/iDibTtuHcJ9FpKeHFRgcASRpdFdg8Ks0aXN4rQk78U1rbpzji8MPgBj1WMxYc8xEL08UvieZlVSNPSxYe0Rog85w7XNuEpy+q+nbUJwyXqt2SMscE4GNkdQyTiEkLS4TLpNwnIy4AaLKIbMQPZ9vJctmcEuWpBti32MoQC5P8TVN4VeVUBTpDsqa9e8QvPm9nbBaAMS7h6kqOJxENtJPol+aY3hfAknpsh8RWAuAZi3FoOql4WKn0CXgk3O0H1JVjeDih+g6yD6AQO6C/qLWSS/iJ627AAadyiRjAWy1jS48hEdyDb1QaYbPMwqMYQabOIjS7jH+0Rfuktd7jIdULdCWNpj/7XPnYo/3rmtJdodQIbPSbyeqFpV28JcWxvJ+ERYQ3c9YPRPFCtgobzJjlPhA9bgKHHxVIJsBMHoeEE8rn1+ROKxDrXPNx+QA5mZ0691RRw4ZLjq4gwDsCOFvlf1Tisoql0t5ie0kn7yfJXYdvCbiYLZ5nS3znzXoADhH+YfXX7/yVLD2LRrM+d+FvyasAKqYmXsttLom3EbBMc6rxSazd2v4SukyATPP5OLZ9Gn1ReOBe1vPhMdSDt5IwXyQZdGexOctoVcOWm7Kge8aANPhAnexcfJH/APVqrPuGj93E7ygD7rJ+01AteJGrB8iZ+qtwXHW4TUe5/C0NbxGYHILocbaZL+CluBPNTbl56rQnARtddTpXhObgjN1sI9lyJHMLyg/YrZUcIHS3mIWUxOELC4EQWkgzqgzVRuMnw/Fwv2aJ6REj7LZ4ipxMBvHCHDu2CftZYbJsWXYekAdWODuYLDwifVa3KKhqUhAuI6gQIjqI+pUM3hWPpVXE6RyjzsY9e3qpPomA4HeY0gnUeZHZdSoOLy13hBsDp03AvYX+y8rNImlU+K4a4SCbW15gdlzjotAAc11hNv7Tt5rzNKpZJB2sYmPTVe5fSd7todctN+o0v8kF7RFgbdxHDcRy5GdQp9sfpAOGio6ePxj0K3WT1oYJ5dx6r5RhcQeP/Bcf9rov0AW+yLMZZAtzHI7yEzjTFu0G57xxLHd0kwdHidfVPcUHObESOyVYVha669DB9Tgz/YaUcAOSMoYMA6KeCMhF0m3VyAVhcIOSNNCylhWq8hYIvOFXJhC5YJnMRW4WgJfTdMmYVuZVwNUNgQHS4+S8t7Z6K0hPjy33hsCe8AdShsSziIlxg8hePsjsww0SYE9VmsyxUODCXGT8LAJce50CWKsdssrUGy0Ab3AvI2kq+rXDRcWAs1pIHTitfsgcQ5zBA+I7N0aNhPPmULgKXE4l58OnxfIckaFsspVw94c4udG7mjhG7ncOkwLDtZHF7TdzZh0tEQBG55xc90cwMAPgDWxcuJmOTW9TCDxFOejRBvp5npM9yinYKoppAO8Y8LRBAi73QQ0RyuAAOndeDDNBvJI8Pd1yfOY/ht5UxjZAbtfiMcoED6fwryg2WvIls3kmwka/IH/xCYxDDNOsWEk9zYN/9QPXorAzh8RMEtm+0B0fIkq6lSaAOgMDSJix5uiB0Cni6RJaCJcQBPofTTyWsBAUp4GxbhI6yYH3UcXV4A3o4R2AIP0BTF+GECXi2+9uQ1KT4/CmJFmjnM+m6MXuwtaFftZSFSlxRdj4PZzbH5BI8qqmm4A6WWoo0+K2pIgg6EckJUyVtyOKB/mietht1K6r9JpbGNfDctDB9boT9E4PBixWhwNAGlSJ/wAoB/8AHw/ZF1KbRTJjsnoZiyllxiRorh7PMxA4nywgRxt1NtHDfRaLJ8MXta47ga9kTmFMU2OIA0PyE+qPHQrZicgyr3dJtnQGVZLhE+MwQOUAEdCn2RUIbf56dolFZCx1ahTMHhe0NuDvymY3TTOMCylU4WDgbwN7A3k69BtuuXL4PHTYJiaLYtLraCInX17pVjsVxBtpI52I3012TLF0eFvEH999jBPnukz3O452MSNYJtM+n815xxhh8R4eMGOhuFkPaTMA4xcHZw089wExzPH+6aWyLmCspUdxPgkkHnstCPppPwtyygSb6zYjWehW0y4uLwXNkmNoPJZXKWhjyHbXG0jl3W3yerZtpbNiNeyMts0dI1GCpgC41S3GYeXyE2YQBZBuqDihd2GHGJwZp8mG5bhLJl+nAVWDeAFDF44NKsSGuGapVWQhMFi5RVapZAIOay5CvqXXIgMPnVUklL8oxpD4LgB1KlmlU8USklZ3+IAACV5cT02ajOSS2WnXdZGthiKktMv3JkwN1ssS0iiJA4o30Cypx7GEgi5N3R8gFkt6NegOpXLjwhk7EkmSOZQ5xbmmw7AW+fIdERWx9JhJOhvEnidyAA27pZisex1+PgHIa9uyZJ/graNDgX8YhxHeDGlhe87qqu4hpaxpGgl15uefmfNLMrzBgdxEyNhcDvz/ACnzcUx4u4X0jysEGmmFNMX4anwgEnUm5vYHXn/x1ROKqTAFhJPna58oCjUpQHE7wGzzG3l0QtRsMnUzGnQk9tginZhnhg1zpF4gcWgE8p1Ol+vVHhkjjgExA353A5W+SSUjDQTMQJ6mLfX6o7BVyQOsDsBfTfU2WZkE1KPhJJvva9+cRO9kIaI/cDpa7QfOUfhsRBdoYPhkiOLf8T09RcS4auPE4Xg6d7n+cljC2phy0yJHKxP0CY4R/E5ktuCDB/dB+Eqk1C4WBnc2A6Xn7IjBatnWYJ2v31VccmnQsl6bLO8upuDXU2hoeJ8NhJ3slGZsAp8I2CaUMSPd+7P7HeEjkbwl2bUp9CumOls0U5LQXl+IDWMbH7R9FVmDi6qGAyIEiNyq8vE02OB2HyUsxzBtFnhID3EydwAEzaoVxfp3s/hhh3v46hLWu8LSbNEaD5o3O65fUkOLQQ3pp5ffdZY58K1fD0tp8VpmL381piS8uA/b+VyOOnIeUtohiKXE2DOkg8lns0xHu4kxI+Lr3/KcZjii3fQWJ5jYrE5rmjari3R3I3E9Oi56tj3Qrzevxu67zp5dFDD0TIm8q12FBAcNREhFNAPCAYM6c518wnsUL/p/EAWzPznVaX2awjmgOvB+Jp580uyYEgcxIPkttlFKw7JY23QZaVlk2hCNb402q4dU08PdenFUjzZbZ6C7ZCV6ZLrpuynZUvaJTCkKLy1evx/VRJlQGAJWMe/qFytbl5XLGPnWZAySkDP+4HGRCd4+q4kpPVBuXFeWtHps2zKvvKNtY3WLzTAGTGv83Tr2ax7XeAA9SrM2HDfhk6f2RemZdGFxOGi5vzOiBGFJPERDRoFrMexr9bRAjeeSDx+DMhosABJNr6lOpiuIkNMDT0+5RWAxDuKYv12+3/KlUYIJmBoOsDYIb30AnRuwGrj+EexejQnMA6ZiwF9ddlY5otedyBoN7nms69+g0A17/wAhOKGIAa2TFvPRI410OpDKnS4mDSxJvYCxj5H6IrDPDQOd7nc/hBtqNMAcge3VF0qbZLpmDbTpfukGPOGCN4JJtMcunUq6OMCoZA06z6flUV8SIIEdSZ3UWtd4bmHHeLDn9UUYteDEb/Qfb6q/CYSNZhwIJPXYfzZVNfLpLrGSPLoRzCZ4d1r2IjpA0KNmoqy/HcDw15tIE/Q9U6xzJE9EsxeBY8WE/ZFUZ4OAnQQOy6seVS0+wQ+D/h2Rg8BpnuEB7RZc2o9jXuc0PBALf820ppWokAObYtj+6YVcMyswF1i299rKrQ8kqMTlHs6aFZhAuHazMrfcLGsJjXX6LN4XEuqv4Wi0nxcgLSjfaXMRSpECCIAUc1JUc8XbM37SZs0AgG+hBuOh+nqsYXtL+IEdhPqCRorMzqcTxckGVHB0YIkaEz2XOqSKdhoBdG0j5oyg0cY5g/wq/B4UC+w0V+BwYLwdz/LJbGo0OT4ODPNajAkTASjL6PAyfRMsmq8TkIdgm9Dx9OQoMpItjVaymF6a6POYA5sIR9Mynpw6Ffhbo2AGwmGlNKODAXuHpgIj3gCDYaIfpwvVb7wLkAnw7GsAJ5LP5jimmw0TfH1HOkkQFnMUQ50ALz0jvbLcNji0jgnVbmmRVp9YXzyIP0WiyLNCw8Lk0laFWhbjuKiSQL3jud0MMRIPFJMHttPclbHH5eyrDul1nsTgoLo6NH1JSKXg9emaxFQmZvHoOgUSD8R126JqMENeY36myo91xWHYflUUhKAnmNe56r1jnuIM206AIvHYf4QB0PkNVURMNAgAopmoPwtXiLr6t+gsm+V1BLQ4iI0+k9Vn8OIBO5sO26Mwoglx1tA77pJDIeVqPFBAtPO9tkSKRME2ENgfYeaXYTGEHpN09Y0P4fX8KTKIUOBJnSNB1AsAmDMXbTZ0/wDrPp+VdVwEHW+3c7/VR/TQANyTPaChyDRa3MuAghsgkzO0j8ymDMXTfAmD13nQ/dBHA26f8fhXYfAdLfjRDmw8UNaRgQCCAO6maxcOEtgR2XYHARCLqUtJ2Cqs0qEcV0LmU2sBDGhogrF+0GMJeBMtI0WhzvMRSdG0OWSxBDodsB8kOTe2CktCP3ZDjPOyZ4enBAO6gaYJB7q+lTmPmmYEMcuYSwiLh3/Kc5fl8QeqhluFDQT0UqmatBDQUnY10N6+LbHDKc5JTiCsmwhzhK1OWv4QE0PshJ/U0Ln2VdHFAFA1sXaxSs1zxhemujzmzd4cyFKpSQOVVfCExeUowJWPCEmxeZBp1TbFiQsVn7HAyEyFZom5kI1XqxdLEPgWK5bQLMdj8STbZI8U3hK5cvOR6JXQPE4E7IqiPGXLlyLAaDKMcZLTorsbSbDo3XLkjGRmcwc4utoIAXlJ7WDmbrlyddAZa6IB5x81A0Q1pLtSTAHpcrlyUJUOFgDjyJA+QU8LMlx6CFy5F9GGeHpw0m0zbyKMwmLMwdr94uvFymONP1HEADqLnzRWHE79Fy5K0MgqiYcA7cH7H8JthGgD5L1cgkZhXvgAgsxxYaDGsL1cqCemGzysKgAOug9Eiw7TMbEQVy5ZGYwOW2EJrQy4CCd4B8ly5KEJxeIhpjayzdSnfj3lcuToVmoytwcAtVgqMgLlybEvkLlfxGH9NUqWViZXLl6B546wwDQrP1ErxcsEtLJCVZhggVy5ZGYI3K2xouXLkQUf/9k="))(),
            (async() => this.photoCreate(faker.lorem.words(), "data:image/jpeg;base64,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"))(),
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
