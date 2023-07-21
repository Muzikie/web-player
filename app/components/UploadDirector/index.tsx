import React from 'react';
import { PrimaryButton } from '../common/Button';
import { Link } from '@remix-run/react';
import { ROUTES } from '~/routes/routes';

const UploadDirector = () => (
  <section className="component uploadDirector">
    <h3 className="title">Upload your music</h3>
    <main className="main">
      <div className="wrapper">
        <Link to={ROUTES.UPLOAD_COLLECTION.location}>
          <PrimaryButton className="button">Create a collection</PrimaryButton>
        </Link>
        <Link to={ROUTES.UPLOAD_AUDIO.location}>
          <PrimaryButton className="button">Create an audio</PrimaryButton>
        </Link>
      </div>
    </main>
  </section>
);

export default UploadDirector;