import axios from 'axios'

const BooksApi = {
  getBooks: async ({ q, perPage, startIndex }) => {
    const url = 'https://www.googleapis.com/books/v1/volumes'

    const params = {
      q,
      maxResults: perPage,
      startIndex
    }

    console.log(params)
    const response = await axios.get(url, { params })

    return response
  }
}

export default BooksApi
