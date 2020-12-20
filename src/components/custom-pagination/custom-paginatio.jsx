import React from 'react'
import {
  Pagination,
  PaginationItem,
  PaginationLink 
} from 'reactstrap'
import PropTypes from 'prop-types'

const propTypes = {
  first   : PropTypes.func,
  second  : PropTypes.func,
  third   : PropTypes.func,
  fourth  : PropTypes.func,
  fifth   : PropTypes.func,
  page    : PropTypes.number,
  setPage : PropTypes.func
}

const defaultProps = {
  first   : () => {},
  second  : () => {},
  third   : () => {},
  fourth  : () => {},
  fifth   : () => {},
  page    : 1,
  setPage : () => {}
}

const CustomPagination = ({
  first,
  second,
  third,
  fourth,
  fifth,
  page,
  setPage
}) => (
  <Pagination aria-label="Page navigation example">
    <PaginationItem>
      <PaginationLink previous href="#" />
    </PaginationItem>
    <PaginationItem active={ page === first() }>
      <PaginationLink onClick={ () => setPage(first()) }>
        { first() }
      </PaginationLink>
    </PaginationItem>
    <PaginationItem active={ page === second() }>
      <PaginationLink onClick={ () => setPage(second()) }>
        { second() }
      </PaginationLink>
    </PaginationItem>
    <PaginationItem active={ page === third() }>
      <PaginationLink onClick={ () => setPage(third()) }>
        { third() }
      </PaginationLink>
    </PaginationItem>
    <PaginationItem active={ page === fourth() }>
      <PaginationLink onClick={ () => setPage(fourth()) }>
        { fourth() }
      </PaginationLink>
    </PaginationItem>
    <PaginationItem active={ page === fifth() }>
      <PaginationLink onClick={ () => setPage(fifth()) }>
        { fifth() }
      </PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink next href="#" />
    </PaginationItem>
  </Pagination>
)

CustomPagination.propTypes = propTypes
CustomPagination.defaultProps = defaultProps

export default CustomPagination
