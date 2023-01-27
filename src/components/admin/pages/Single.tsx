import { useParams } from '@solidjs/router';

export default function Single() {
  const params = useParams();
  return (
    <div>
      <h1>Single: {params.collectionId}</h1>
    </div>
  );
}
