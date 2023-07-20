/* External dependencies */
import React, { useState, ChangeEvent } from 'react';
import { json, redirect } from '@remix-run/node';

/* Internal dependencies */
import { PartialView } from '~/components/PartialView';
import styles from '~/css/routes/__main/agreements.css';
import { commitSession, getSession } from '~/hooks/useSession';
import { LoaderBaseProps } from '../../types';
import AgreementForm from '~/components/Agreement/AgreementFrom';
import ActionAndInfo from '~/components/Agreement/ActionAndInfo';
import { ROUTES } from '~/routes/routes';

export function links() {
  return [{ rel: 'stylesheet', href: styles }];
}

export async function loader({ request }: LoaderBaseProps) {
  const session = await getSession(
    request.headers.get('Cookie')
  );

  const agreement = session.get('agreement');

  // Handle logout and login
  if (agreement) {
    return redirect(ROUTES.HOME.location);
  }

  return json({});
}

export async function action({ request }: any) {
  const session = await getSession(request.headers.get('Cookie'));

  session.set('agreement', true);

  return redirect(ROUTES.HOME.location, {
    headers: {
      'Set-Cookie': await commitSession(session),
    },
  });
}

const AgreementScreen = () => {
  const [terms, setTerms] = useState({ value: [false, false, false], isValid: false });
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = terms.value.map((v, i) => i === Number(e.target.value) ? e.target.checked : v);
    setTerms({
      value: newValue,
      isValid: newValue.every(v => v),
    });
  };

  return (
    <PartialView
      title="Agreement"
      className="agreement"
      form={<AgreementForm handleChange={handleChange} terms={terms} />}
      actionAndInfo={<ActionAndInfo disabled={!terms.isValid} />}
    />
  );
};

export default AgreementScreen;
