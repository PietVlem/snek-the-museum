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
import Base from './assignments/base.schema';
import Question from './assignments/question.schema';

/*
const questionUnit = new Question({
    exhibitionId: 1,
    question: 'How bad do i smell?',
    posibilities: ['bad', 'very bad', 'super very bad'],
    answer: 0
})
questionUnit.save();
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
    Base,
    Question
};
