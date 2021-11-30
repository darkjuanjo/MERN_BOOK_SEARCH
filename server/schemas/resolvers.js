const { AuthenticationError } = require('apollo-server-express');
const { User, Book} = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query:{
        me: async (parent, args, context) => {
            if (context.user) {
              const userData = await User.findOne({ _id: context.user._id })
                .select('-__v -password')
                .populate('history')
      
              return userData;
            }
      
            throw new AuthenticationError('Not logged in');
          },
    },
    Mutation:{
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);
            return { token, user };
          },
          login: async (parent, { username, password }) => {
            const user = await User.findOne({ username });
      
            if (!user) {
              throw new AuthenticationError('Incorrect credentials');
            }
      
            const correctPw = await user.isCorrectPassword(password);
      
            if (!correctPw) {
              throw new AuthenticationError('Incorrect credentials');
            }
      
            const token = signToken(user);
            return { token, user };
          },
          saveBook: async (parent, args, context) => {
              if(context.user) {
                  try {
                    return await User.findOneAndUpdate(
                        { _id: context.user._id },
                        { $addToSet: { savedBooks: args } },
                        { new: true, runValidators: true }
                      );
                  } catch {
                    console.log('Error could not save book!');
                  }
              }
          },
          removeBook: async(parent, {bookId}, context) => {
              if(context.user) {
                  try {
                    return await User.findOneAndUpdate(
                        { _id: context.user._id },
                        { $pull: { savedBooks: { bookId: params.bookId } } },
                        { new: true }
                      );
                  } catch {
                    console.log('Error could not delete book');
                  }
              }
          }
    }
};

module.exports = resolvers;