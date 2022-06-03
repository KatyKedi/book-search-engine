import { useMutation, useQuery} from '@apollo/client'
const QUERY_ME = gql`
{
  me {
    username
    email
    bookCount
    savedBooks
  }
}
`;

const ADD_USER = gql`
mutation addUser(
  $username: String!
  $email: String!
  $password: String!
) {
  addUser(
    username: $username
    email: $email
    password: $password
  ) {
    token
    user {
      _id
    }
  }
}
`;

const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

const SAVE_BOOK = gql`
  mutation saveBook(authors
    description
    title
    bookId
    image
    link) {
      saveBook(
        authors
        description
        title
        bookId
        image
        link)
        {
          token
        }
}
`

const REMOVE_BOOK = gql`
  mutation removeBook($bookId: ID) {
    removeBook(bookId: $bookId) {
      token
    }
  }
`

export const getMe = () => {
  [me] = useQuery(QUERY_ME)
  me({});
};

export const createUser = (userData) => {
  [addUser] = useMutation(ADD_USER);
  addUser({
    variables: userData
  })
};

export const loginUser = (userData) => {
  [login] = useMutation(LOGIN);
  login({
    variables: userData
  })
};

// save book data for a logged in user
export const saveBook = (bookData) => {
  [saveBook] = useMutation(SAVE_BOOK);
  saveBook({
    variables: bookData
  })
};

// remove saved book data for a logged in user
export const deleteBook = (bookId) => {
  [removeBook] = useMutation(REMOVE_BOOK);
  removeBook({
    variables: {bookId: bookId}
  })
};

// make a search to google books api
// https://www.googleapis.com/books/v1/volumes?q=harry+potter
export const searchGoogleBooks = (query) => {
  return fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
};
