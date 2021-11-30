import gql from 'graphql-tag';

export const GET_ME = gql`
query get_me{
  me {
    _id
    username
    email
    bookCount
    savedBooks{
        bookId
        title
        authors
        description
        image
        link
    }
  }
}
`;





