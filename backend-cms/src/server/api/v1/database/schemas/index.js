/* eslint-disable import/prefer-default-export */
import Blog from './blog.schema';
import Category from './category.schema';
import Post from './post.schema';
import User from './user.schema';
import Museum from './museum.schema';
import Exhibition from './exhibition.schema';
import Disability from './disability.shema';
import Zipcode from './zipcode.schema';
import Photo from './photo.schema';

// test
import { Assignment, Question } from './assignment.schema';

/*
const question = new Question({
    exhibitionId: 1,
    question: 'How bad do i smell?',
    posibilities: ['bad', 'very bad', 'super very bad']
})
question.save();
*/

export {
    Blog,
    Category,
    Post,
    User,
    Museum,
    Exhibition,
    Disability,
    Zipcode,
    Photo,
    // test
    Assignment,
    Question
};
