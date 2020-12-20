import React, { useState, useEffect } from 'react'
import { 
  Button,
  Form, 
  FormGroup, 
  Input,
  Row,
  Col,
  Card,
  CardBody,
  Spinner
} from 'reactstrap'
import CustomPagination from '../components/custom-pagination/custom-paginatio'
import BooksApi from '../services/books-api'

const HomePage = () => {

  const [searchaValue, setSearchValue] = useState('')
  const [perPage, setPerPage] = useState(16)
  const [items, setItems] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [totalPage, setTotalPage] = useState(1)

  useEffect(() => {
    setPerPage(16)
    setIsLoading(true)
    BooksApi.getBooks({
      q          : searchaValue,
      perPage    : perPage,
      startIndex : page === 1 ? 0 : perPage*(page-1) + 1
    })
      .then((response) => {
        const items = response.data.items
        const maxPage= Math.ceil(response.data.totalItems/perPage)
        
        setItems(items)
        setTotalPage(maxPage)
        setIsLoading(false)
      })
      .catch((error) => console.log(error))

  }, [page, perPage, searchaValue])

  const handleChangeSearchValue = (e) => {
    const value = e.target.value
    setSearchValue(value)
  }

  const handleClickSearch = () => {
    setPerPage(16)
    setIsLoading(true)
    BooksApi.getBooks({
      q          : searchaValue,
      perPage    : perPage,
      startIndex : page === 1 ? 0 : perPage*(page-1) + 1
    })
      .then((response) => {
        const items = response.data.items
        const maxPage= Math.ceil(response.data.totalItems/perPage)
        
        setItems(items)
        setTotalPage(maxPage)
        setIsLoading(false)
      })
      .catch((error) => console.log(error))
  }

  const first = () => {
    if(page<4) return 1
    else return page-2
  }

  const second = () => {
    if(page<4) return 2
    else return page-1
  }

  const third = () => {
    if(page<4) return 3
    else return page
  }

  const fourth = () => {
    if(page<4) return 4
    else return page+1
  }

  const fifth = () => {
    if(page<4) return 5
    else return page+2
  }

  return(
    <Row noGutters className='px-2'>
      <Col lg={{ size: 10, offset: 1 }}>

        <h1 className='text-center mt-3'>
          { 'Book Management System' }
        </h1>
      
        <Form 
          className='my-5'
          onSubmit={ (e) => e.preventDefault() }
        >
          <FormGroup>
            <div className='d-flex'>
              <Input 
                className='mr-3'
                type='search'
                placeholder='Title, Author, etc'
                value={ searchaValue }
                onChange={ handleChangeSearchValue }
              />
              <Button
                color='info'
                onClick={ handleClickSearch }
              >
                { 'Search' }
              </Button>
            </div>
          </FormGroup>
        </Form>

        {
          items.length === 0 
            ? (
              <div className='text-center mt-5'>
                <img 
                  src='https://cdn.iconscout.com/icon/free/png-256/digital-library-13-1130487.png'
                  alt='empty icon'
                />
                <h4 className='mt-5'>
                  { 'No books found, Try to search with another keywords!' }
                </h4>
              </div>
            )
            : isLoading
              ?  <Spinner color="info" />
              : (
                <>

                  <div className='d-flex justify-content-center'>
                    <CustomPagination 
                      first={ first }
                      second={ second }
                      third={ third }
                      fourth={ fourth }
                      fifth={ fifth }
                      page={ page }
                      setPage={ setPage }
                    />
                  </div>
                  <div className='text-center mb-4'>
                    { `page ${ page } of ${ totalPage }` }
                  </div>

                  <h5 className='text-center mb-4 font-weight-bold'>
                    { `Results for ${searchaValue}` }
                  </h5>

                  <Row noGutters>
                    {
                      items.map((item) => (
                        <Col
                          lg='3' 
                          key={ item.volumeInfo.title } 
                          className='my-3'
                        >

                          <Card 
                            style={{ 
                              borderRadius : '1rem', 
                              background   : 'lightblue', 
                              height       : '100%' 
                            }} 
                            className='mx-3'
                          >
                            <CardBody>

                              <Row className='my-5' noGutters>
                                <Col lg='4'>
                                  <img 
                                    className='w-100'
                                    src={ item.volumeInfo.imageLinks? item.volumeInfo.imageLinks.thumbnail : '' } 
                                    alt={ item.volumeInfo.title } 
                                  />
                                </Col>

                                <Col lg='8' className='px-3 pt-3'>
                                  <h5 className='font-weight-bold'>
                                    <a href={ item.volumeInfo.previewLink }>
                                      { item.volumeInfo.title }
                                    </a>
                                  </h5>
                                  <div className='font-weight-bold'>
                                    { `Author: ${ item.volumeInfo.authors }` }
                                  </div>
                                  <div>
                                    { `Published at: ${ item.volumeInfo.publishedDate }` }
                                  </div>
                                </Col>
                              </Row>

                            </CardBody>
                          </Card>

                        </Col>
                    
                      ))
                    }
                  </Row>

                  <div className='d-flex justify-content-center mt-4'>
                    <CustomPagination 
                      first={ first }
                      second={ second }
                      third={ third }
                      fourth={ fourth }
                      fifth={ fifth }
                      page={ page }
                      setPage={ setPage }
                    />
                  </div>

                </>
              )
        }
      </Col>
    </Row>
  )
}

export default HomePage
