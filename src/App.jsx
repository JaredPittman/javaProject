import React, { useEffect, useRef, useState } from 'react';
import { ChakraProvider, Button, FormControl, FormLabel, Box, Flex } from '@chakra-ui/react'
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react'

import {
  Editable,
  EditableInput,
  EditableTextarea,
  EditablePreview,
  Select
} from '@chakra-ui/react'

import './App.css';
import theme from './theme';

function App() {
  return (
    <ChakraProvider>
      <Box>
      <Card>
      <ListBooks />
      </Card>
      <Card>
      <ListAuthors />
      </Card>
      </Box>
      <Card>
      <Flex flexDirection={'row'} justifyContent={'space-between'}>
      <Box>
      <AuthorByID />
      </Box>
      <Box>
      <BookByID />
      </Box>
      </Flex>
      </Card>
    </ChakraProvider>
  )
}

export default App

const ListBooks = () => {
  const [books, setBooks] = useState([]);
  const [newTitle, setnewTitle] = useState('');
  const [newIsbn, setnewIsbn] = useState('');
  const [newEdNumber, setnewEdNumber] = useState('');
  const [newCopyRight, setnewCopyRight] = useState('');
  const [newAuthor, setnewAuthor] = useState('');


  const handleClick = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Cookie", "connect.sid=s%3Aw1qerQho4F9cB23w-dil1kPjFJMMtaHB.6%2BXqphpaSqfeS8MUTSxZYAwXFkjfN3tcbpsMt2Q%2FV9w");

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow"
    };

    try {
      const response = await fetch("http://localhost:8080/api/v1/books", requestOptions);
      const result = await response.json();
      setBooks(result);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    const myHeaders = new Headers();
    myHeaders.append("Cookie", "connect.sid=s%3Aw1qerQho4F9cB23w-dil1kPjFJMMtaHB.6%2BXqphpaSqfeS8MUTSxZYAwXFkjfN3tcbpsMt2Q%2FV9w");

    const requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow"
    };

    try {
      const response = await fetch(`http://localhost:8080/api/v1/books/${id}`, requestOptions);
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }

  const handleAddBook = async (e) => {
    e.preventDefault();

    const myHeaders = new Headers();
    // myHeaders.append("Cookie", "connect.sid=s%3Aw1qerQho4F9cB23w-dil1kPjFJMMtaHB.6%2BXqphpaSqfeS8MUTSxZYAwXFkjfN3tcbpsMt2Q%2FV9w");
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
      mode: 'no-cors',
      method: "POST",
      headers: myHeaders,
      redirect: "follow"
    };

    try {
      const response = await fetch("http://localhost:8080/api/v1/books?isbn=" + newIsbn + "&title=" + newTitle +  "&editionNumber=" + newEdNumber + "&copyright="+ newCopyRight + "&author_id=" + newAuthor, requestOptions);
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = async (book) => {
    const myHeaders = new Headers();
    myHeaders.append("Cookie", "connect.sid=s%3Aw1qerQho4F9cB23w-dil1kPjFJMMtaHB.6%2BXqphpaSqfeS8MUTSxZYAwXFkjfN3tcbpsMt2Q%2FV9w");

    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      redirect: "follow"
    };

    try {
      const response = await fetch(`http://localhost:8080/api/v1/books/${book.isbn}?isbn=` + book.isbn + "&title=" + book.title + "&editionNumber=" + book.edNumber + "&copyright=" + book.copyright, requestOptions);
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <TableContainer>
      <Table variant='striped' colorScheme='teal'>
        <TableCaption onClick={handleClick}>Books</TableCaption>
        <Thead>
          <Tr>
            <Th>Title</Th>
            <Th>ISBN</Th>
            <Th>Edition Number</Th>
            <Th>CopyRight</Th>
            <Th>Author</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {books.map((book, index) => (
            console.log(book),
            <Tr key={index}>
              <Td>
                <Editable onChange={(value) => {book.title = value}} defaultValue={book.title} >
                <EditablePreview />
                <EditableInput />
                </Editable>
                </Td>
                <Td>
                <Editable onChange={(value) => {book.isbn = value}} defaultValue={book.isbn} >
                <EditablePreview />
                <EditableInput />
                </Editable>
                </Td>
                <Td>
                <Editable onChange={(value) => {book.edNumber = value}} defaultValue={book.edNumber} >
                <EditablePreview />
                <EditableInput />
                </Editable>
                </Td>
                <Td>
                <Editable onChange={(value) => {book.copyright = value}} defaultValue={book.copyright} >
                <EditablePreview />
                <EditableInput />
                </Editable>
                </Td>
              <Td>{book.authors[0].authorFirstName + ' ' + book.authors[0].authorLastName}</Td>
              <Td><Button onClick={() => handleDelete(book.isbn)}>Delete</Button>
              <Button onClick={() => handleUpdate(book)}>Update</Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
        <Tbody>
          <Tr color={'grey'}>
          <Td>
          <Editable onSubmit={(value) => {
            setnewTitle(value);
          }
          }defaultValue='Title'>
          <EditablePreview />
          <EditableInput />
          </Editable>
          </Td>
          <Td>
          <Editable onSubmit={(value) => {
            setnewIsbn(value);
          }
          } defaultValue='ISBN'>
          <EditablePreview />
          <EditableInput />
          </Editable>
          </Td>
          <Td>
          <Editable onSubmit={(value) => {
            setnewEdNumber(value);
          }
          } defaultValue='Edition Number'>
          <EditablePreview />
          <EditableInput />
          </Editable>
          </Td>
          <Td>
          <Editable onSubmit={(value) => {
            setnewCopyRight(value);
          }
          } defaultValue='CopyRight'>
          <EditablePreview />
          <EditableInput />
          </Editable>
          </Td>
          <Td>
          <Editable onSubmit={(value) => {
            setnewAuthor(value);
          }
          } defaultValue='Author'>
          <EditablePreview />
          <EditableInput />
          </Editable>
          </Td>
          <Td>
          <Button onClick={handleAddBook}>Add</Button>
          </Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
    
  );
};

const ListAuthors = () => {
  const [authors, setAuthors] = useState([]);
  const [newAuthorFirstName, setnewAuthorFirstName] = useState('');
  const [newAuthorLastName, setnewAuthorLastName] = useState('');


  const handleClick = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Cookie", "connect.sid=s%3Aw1qerQho4F9cB23w-dil1kPjFJMMtaHB.6%2BXqphpaSqfeS8MUTSxZYAwXFkjfN3tcbpsMt2Q%2FV9w");

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow"
    };

    try {
      const response = await fetch("http://localhost:8080/api/v1/authors", requestOptions);
      const result = await response.json();
      setAuthors(result);
    } catch (error) {
      console.error(error);
    }
    console.log(authors);
  };

  const handleUpdate = async (author) => {
    const myHeaders = new Headers();
    myHeaders.append("Cookie", "connect.sid=s%3Aw1qerQho4F9cB23w-dil1kPjFJMMtaHB.6%2BXqphpaSqfeS8MUTSxZYAwXFkjfN3tcbpsMt2Q%2FV9w");

    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      redirect: "follow"
    };

    try {

      const response = await fetch(`http://localhost:8080/api/v1/authors/${author.authorID}?author_id=` + author.authorID + '&firstName='+ author.authorFirstName + '&lastName='+author.authorLastName, requestOptions);
      const result = await response.json();
      console.log(result);
    }
    catch (error) {
      console.error(error);
    }
  }
  const handleAddAuthor = async (e, newAuthor) => {
    e.preventDefault();

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
      mode: 'no-cors',
      method: "POST",
      headers: myHeaders,
      redirect: "follow"
    };

    try {
      const response = await fetch("http://localhost:8080/api/v1/authors?firstName=" + newAuthorFirstName + "&lastName=" + newAuthorLastName, requestOptions);
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    const myHeaders = new Headers();
    myHeaders.append("Cookie", "connect.sid=s%3Aw1qerQho4F9cB23w-dil1kPjFJMMtaHB.6%2BXqphpaSqfeS8MUTSxZYAwXFkjfN3tcbpsMt2Q%2FV9w");

    const requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow"
    };

    try {
      const response = await fetch(`http://localhost:8080/api/v1/authors/${id}`, requestOptions);
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <TableContainer>
      <Table variant='striped' colorScheme='teal'>
        <TableCaption onClick={handleClick}>Authors</TableCaption>
        <Thead>
          <Tr>
            <Th>Author ID</Th>
            <Th>First Name</Th>
            <Th>Last Name</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {authors.map((author, index) => (
            <Tr key={author.authorID}>
              <Td>{author.authorID}</Td>
              <Td>
                <Editable onChange={(value) => {author.authorFirstName = value}} defaultValue={author.authorFirstName} >
                <EditablePreview />
                <EditableInput />
                </Editable>
                </Td>
              <Td>
                <Editable onChange={(value) => {author.authorLastName = value}} defaultValue={author.authorLastName} >
                <EditablePreview />
                <EditableInput />
                </Editable>
                </Td>
              <Td><Button onClick={() => handleDelete(author.authorID)}>Delete</Button>
              <Button onClick={() => handleUpdate(author)}>Update</Button>
              </Td>
            </Tr>
          ))}
          {/*
          TODO:
          For this add author row, I believe that seeing as it is hard coded I could assign id's to the input fields and then 
          use the id's to get the values of the input fields and then use those values to add the author to the database.
          This would be more efficent than using the state variables and reloading on change. 

          See that this is tested on capstone.
          */}
        </Tbody>
        <Tbody>
          <Tr color={'grey'}>
          <Td>
          Add Author
          </Td>
          <Td>
          <Editable onChange={(value) => {
            setnewAuthorFirstName(value);
          }}defaultValue='First Name'>
          <EditablePreview />
          <EditableInput />
          </Editable>
          </Td>
          <Td>
          <Editable onChange={(value) => {
            setnewAuthorLastName(value);
          }} defaultValue='Last Name'>
          <EditablePreview />
          <EditableInput />
          </Editable>
          </Td>
          <Td>
          <Button onClick={handleAddAuthor}>Add</Button>
          </Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  );}

const BookByID = () => {
  const [bookId, setBookId] = useState('');
  const [book, setBook] = useState({});
  const [books, setBooks] = useState([]);
  const [selectedBookID, setSelectedBookID] = useState('');

  const getBooks = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Cookie", "connect.sid=s%3Aw1qerQho4F9cB23w-dil1kPjFJMMtaHB.6%2BXqphpaSqfeS8MUTSxZYAwXFkjfN3tcbpsMt2Q%2FV9w");

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow"
    };

    try {
      const response = await fetch("http://localhost:8080/api/v1/books", requestOptions);
      const result = await response.json();
      setBooks(result);
    } catch (error) {
      console.error(error);
    }
    console.log(books);
  };

  const handleClick = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Cookie", "connect.sid=s%3Aw1qerQho4F9cB23w-dil1kPjFJMMtaHB.6%2BXqphpaSqfeS8MUTSxZYAwXFkjfN3tcbpsMt2Q%2FV9w");
    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow"
    };
    try {
      const response = await fetch(`http://localhost:8080/api/v1/books/${selectedBookID}`, requestOptions);
      const result = await response.json();
      setBook(result);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <Select placeholder="Select Book ID" onClick={getBooks} value={selectedBookID} onChange={(e) => setSelectedBookID(e.target.value)}>
        {books.map((book) => (
          <option onClick={() => {
            setSelectedBookID(book.isbn);
            console.log(selectedBookID)
          }} key={book.isbn} value={book.isbn}>{book.isbn}</option>
        ))
        }
      </Select>
      <Button onClick={handleClick}>Get Book</Button>
    </>
  );
};


const AuthorByID = () => {
  const [authors, setAuthors] = useState([]);
  const [selectedAuthorID, setSelectedAuthorID] = useState(null);

  const getAuthors = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Cookie", "connect.sid=s%3Aw1qerQho4F9cB23w-dil1kPjFJMMtaHB.6%2BXqphpaSqfeS8MUTSxZYAwXFkjfN3tcbpsMt2Q%2FV9w");

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow"
    };

    try {
      const response = await fetch("http://localhost:8080/api/v1/authors", requestOptions);
      const result = await response.json();
      setAuthors(result);
    } catch (error) {
      console.error(error);
    }
    console.log(authors);
  };

  const handleClick = async (id) => {
    const myHeaders = new Headers();
    myHeaders.append("Cookie", "connect.sid=s%3Aw1qerQho4F9cB23w-dil1kPjFJMMtaHB.6%2BXqphpaSqfeS8MUTSxZYAwXFkjfN3tcbpsMt2Q%2FV9w");
    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow"
    };
    try {
      const response = await fetch(`http://localhost:8080/api/v1/authors/` + id, requestOptions);
      const result = await response.json();
      setAuthor(result);
    } catch (error) {
      console.error(error);
    }
    console.log(id);
  }

  return (
    <>
      <Select placeholder="Select Author ID" onClick={getAuthors}>
        {authors.map((author) => (
          console.log(author),
          <option onClick={() => {
            setSelectedAuthorID(author.authorID);
          }} key={author.authorID}>{author.authorID}</option>
        ))
        }
      </Select>
      <Button onClick={() => {
        console.log(selectedAuthorID);
      }}>Get Author</Button>
    </>
  );
};

const Card = ({ children }) => {
  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p="6" m="4">
      {children}
    </Box>
  );
};