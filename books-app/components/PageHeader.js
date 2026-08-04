import Card from "react-bootstrap/Card";

export default function PageHeader({ text, subtext }) {
  return (
    <>
      <Card className="bg-light text-center p-4 shadow-sm">
        <Card.Body>

          <h2>{text}</h2>

          {subtext && (
            <p className="text-muted mb-0">
              {subtext}
            </p>
          )}

        </Card.Body>
      </Card>

      <br />
    </>
  );
}