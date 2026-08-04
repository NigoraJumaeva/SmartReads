import Link from 'next/link';
import Card from 'react-bootstrap/Card';

import BookDetails from '@/components/BookDetails';
import PageHeader from '@/components/PageHeader';

export async function getStaticProps() {
  const response = await fetch(
    'https://openlibrary.org/works/OL76836W.json'
  );

  const data = await response.json();

  return {
    props: {
      book: data
    }
  };
}

export default function About(props) {
  return (
    <>
      <PageHeader
  text={
    <strong style={{ color: 'teal' }}>
      <em>
        About the Developer: Nigora Jumaeva
      </em>
    </strong>
  }
/>

      <Card>
        <Card.Body>
          <p>
            Dear Readers, my name is <em style = {{ color: 'brown' }}>Nigora Jumaeva</em> and I am currently learning
            React and Next.js. This project uses the Open Library API
            to display books dynamically using server-side data fetching.
          </p>

          <p>
            The featured book in this assignment is
            <strong style={{ color: 'purple' }}><em> Digital Fortress </em></strong>
            by <em style={{ color: 'brown' }}>Dan Brown</em>. I chose this book because it is a techno-thriller
            that explores the world of cryptography, cybersecurity, and 
            government surveillance. The story follows a senior NSA 
            cryptographer, <em style={{ color: 'brown' }}>Susan Fletcher</em>, who is called in to investigate 
            a powerful encryption algorithm that threatens to compromise national security. As she digs
            deeper, she uncovers secrets that put her life and her country at risk.
            The novel combines fast-paced action with themes about privacy, 
            technology, and the ethical limits of intelligence agencies in the digital age.
          </p>

          <p>
            You can learn more about Open Library
            <Link href="https://openlibrary.org" target="_blank">
              {' '}here
            </Link>.
          </p>
        </Card.Body>
      </Card>

      <br />

      <BookDetails
        book={props.book}
        workId="OL76836W"
        showFavouriteBtn={false}
      />
    </>
  );
}