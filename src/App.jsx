import React, { useEffect, useState } from 'react';
import { ChakraProvider, Button, FormControl, FormLabel, Box } from '@chakra-ui/react'
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

import {Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure } from '@chakra-ui/react'

import {
  Editable,
  EditableInput,
  EditableTextarea,
  EditablePreview,
} from '@chakra-ui/react'

import './App.css';

function App() {
  return (
    <ChakraProvider>
      <Card>
      <ListBooks />
      </Card>
      <Card>
      <ListAuthors />
      </Card>
      <Card>
      <AddAuthorForm />
      </Card>
      <Card>
      <AddBookForm />
      </Card>
    </ChakraProvider>
  )
}

export default App

const ListBooks = () => {
  const [books, setBooks] = useState([]);
  const [open, setOpen] = useState(false);

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

  const handleUpdate = async (id) => {
    const myHeaders = new Headers();
    myHeaders.append("Cookie", "connect.sid=s%3Aw1qerQho4F9cB23w-dil1kPjFJMMtaHB.6%2BXqphpaSqfeS8MUTSxZYAwXFkjfN3tcbpsMt2Q%2FV9w");

    const requestOptions = {
      method: "PUT",
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
              <Td>{book.title}</Td>
              <Td>{book.isbn}</Td>
              <Td>{book.edNumber}</Td>
              <Td>{book.copyright}</Td>
              <Td>{book.authors[0].authorFirstName + ' ' + book.authors[0].authorLastName}</Td>
              <Td><Button onClick={() => handleDelete(book.isbn)}>Delete</Button></Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
    
  );
};

const ListAuthors = () => {
  const [authors, setAuthors] = useState([]);
  // const [authorFirstName, setAuthorFirstName] = useState('');
  // const [authorLastName, setAuthorLastName] = useState('');

  // const updatedAuthor = {
  //   authorFirstName: authorFirstName,
  //   authorLastName: authorLastName
  // }

  // const handleFirstNameChange = (author) => {
  //   setAuthorFirstName(document.getElementById(author.authorID + 'first'));
  // };

  // const handleLastNameChange = (author) => {
  //   setAuthorLastName(document.getElementById(author.id + 'last'));
  // };

  // const handleRowChange = (selectedAuthor) => {
  //   console.log(selectedAuthor.authorID);
  //   console.log(selectedAuthor.authorFirstName);
  //   console.log(selectedAuthor.authorLastName);

  //   console.log(updatedAuthor);
  // };

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
                <Editable id={author.authorID + 'first'} defaultValue={author.authorFirstName} >
                <EditablePreview />
                <EditableInput />
                </Editable>
                </Td>
              <Td>
                <Editable id={author.authorID + 'last'} defaultValue={author.authorLastName} >
                <EditablePreview />
                <EditableInput />
                </Editable>
                </Td>
              <Td><Button onClick={() => handleDelete(author.authorID)}>Delete</Button></Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );}



/* <TableContainer>
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
      <Tr key={author.authorID}  onChange={() => handleRowChange(author)}>
        <Td>{author.authorID}</Td>
        <Td>
          <Editable id={author.authorID + 'first'} defaultValue={author.authorFirstName} onChange={handleFirstNameChange(author)}>
          <EditablePreview />
          <EditableInput />
          </Editable>
          </Td>
        <Td>
          <Editable id={author.authorID + 'last'} defaultValue={author.authorLastName} onChange = {handleLastNameChange(author)}>
          <EditablePreview />
          <EditableInput />
          </Editable>
          </Td>
        <Td><Button onClick={() => handleDelete(author.authorID)}>Delete</Button></Td>
      </Tr>
    ))}
  </Tbody>
</Table>
</TableContainer> */
//   );
// };




const AddBookForm = () => {
  const [title, setTitle] = useState('');
  const [isbn, setIsbn] = useState('');
  const [edNumber, setEdNumber] = useState('');
  const [copyright, setCopyright] = useState('');
  const [author, setAuthor] = useState('');

  const handleSubmit = async (e) => {
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
      const response = await fetch("http://localhost:8080/api/v1/books?isbn=" + isbn + "&title=" + title +  "&editionNumber=" + edNumber + "&copyright="+ copyright + "&author_id=" + author, requestOptions);
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FormControl >
      <FormLabel>Add Book</FormLabel>
      <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)}/>
      <input type="text" placeholder="ISBN" value={isbn} onChange={e => setIsbn(e.target.value)}/>
      <input type="text" placeholder="Edition Number" value={edNumber} onChange={e => setEdNumber(e.target.value)}/>
      <input type="text" placeholder="Copyright" value={copyright} onChange={e => setCopyright(e.target.value)}/>
      <input type="text" placeholder="Author" value={author} onChange={e => setAuthor(e.target.value)}/>
      <Button onClick={handleSubmit} type="submit">Submit</Button>
    </FormControl>
  );
};

const AddAuthorForm = () => {
  const [authorFirstName, setAuthorFirstName] = useState('');
  const [authorLastName, setAuthorLastName] = useState('');

  const handleSubmit = async (e) => {
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
      const response = await fetch("http://localhost:8080/api/v1/authors?firstName=" + authorFirstName + "&lastName=" + authorLastName, requestOptions);
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FormControl >
      <FormLabel>Add Author</FormLabel>
      <input type="text" placeholder="First Name" value={authorFirstName} onChange={e => setAuthorFirstName(e.target.value)}/>
      <input type="text" placeholder="Last Name" value={authorLastName} onChange={e => setAuthorLastName(e.target.value)}/>

      <Button onClick={handleSubmit} type="submit">Submit</Button>
    </FormControl>
  );
}

const Card = ({ children }) => {
    return (
      <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p="6" m="4">
        {children}
      </Box>
    );
  };
        
const BaseModal = ({children, headerText}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
      <>
        <Button onClick={onOpen}>{headerText}</Button>
  
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay  />
          <ModalContent>
            <ModalHeader>{headerText}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {children}
            </ModalBody>
          </ModalContent>
        </Modal>
      </>
    )
  }
