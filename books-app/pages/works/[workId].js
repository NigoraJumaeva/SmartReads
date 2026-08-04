import { useRouter } from 'next/router';
import useSWR from 'swr';

import Error from 'next/error';

import BookDetails from '@/components/BookDetails';
import PageHeader from '@/components/PageHeader';

export default function Work() {
  const router = useRouter();

  const { workId } = router.query;

  // fetch book by workId
  const { data, error, isLoading } = useSWR(
    workId
      ? `https://openlibrary.org/works/${workId}.json`
      : null
  );

  // still loading - render nothing
  if (isLoading) {
    return null;
  }

  // invalid or failed request - shows 404
  if (error || !data) {
    return <Error statusCode={404} />;
  }

  return (
    <>
      {/* page header */}
      <PageHeader text={data.title} />

      {/* book details */}
      <BookDetails
         book={data}
         workId={workId}
      />
    </>
  );
}