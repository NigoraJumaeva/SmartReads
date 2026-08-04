import useSWR from 'swr';
import { useState } from 'react';
import { useRouter } from 'next/router';

import { Table, Pagination } from 'react-bootstrap';
import PageHeader from '@/components/PageHeader';

export default function Books() {
  const [page, setPage] = useState(1);

  const router = useRouter();
  let queryString = { ...router.query };

  let qParts = [];

  Object.entries(queryString).forEach(([key, value]) => {
  qParts.push(`${key}:${value}`);
});

if (qParts.length > 0) {
  queryString = qParts.join(" AND ");
}
 const { data, error } = useSWR(
  queryString
    ? `https://openlibrary.org/search.json?q=${encodeURIComponent(
        queryString
      )}&page=${page}&limit=10&fields=key,title,first_publish_year`
    : null,
  {
    keepPreviousData: true,
  }
);

  // go to previous page
  const previous = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  // go to next page
  const next = () => {
    setPage(page + 1);
  };

  // loading state
  if (!data && !error) {
    return <p>Loading...</p>;
  }

  // error state
  if (error) {
    return <p>Error loading books.</p>;
  }

  return (
    <>
      {/* page header */}
  <PageHeader
      text="Search Results"
      subtext={Object.entries(router.query)
        .map(([key, value]) => `${key}: ${value}`)
        .join(" | ")}
  />
      {/* book table */}
      <Table striped hover>
        <thead>
          <tr>
            <th>Title</th>
            <th>First Published</th>
          </tr>
        </thead>

        <tbody>
          {data?.docs?.map((book) => (
            <tr
              key={book.key}
              onClick={() => router.push(book.key)}
            >
              <td>{book.title}</td>

              <td>
                {book.first_publish_year
                  ? book.first_publish_year
                  : 'N/A'}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* pagination */}
      <Pagination>
        <Pagination.Prev onClick={previous} />

        <Pagination.Item active>
          {page}
        </Pagination.Item>

        <Pagination.Next onClick={next} />
      </Pagination>
    </>
  );
}