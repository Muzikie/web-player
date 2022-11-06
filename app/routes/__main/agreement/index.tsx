/* External dependencies */
import React, { useState, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';

/* Internal dependencies */
import { PrimaryButton } from '~/components/common/Button';
import { Checkbox } from '~/components/common/Checkbox';
import ExtendedLogo from '~/components/Logo/Extended';
import { TextLink } from '~/components/common/Link';
import styles from '~/styles/routes/__main/agreements.css';

export function links() {
  return [{ rel: 'stylesheet', href: styles }];
}

const Agreement = () => {
  const [terms, setTerms] = useState({ value: [false, false, false], isValid: false });
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = terms.value.map((v, i) => i === Number(e.target.value) ? e.target.checked : v);
    setTerms({
      value: newValue,
      isValid: newValue.every(v => v),
    });
  };

  const submit = () => {
    navigate('/');
  };

  return (
    <section className="screen agreements">
      <section className='popup'>
        <header className="header">
          <ExtendedLogo />
        </header>
        <section className="wrapper">
          <h3>Agreement</h3>
          <h4>TLDR;</h4>
          <Checkbox
            value="0"
            checked={terms.value[0]}
            onChange={handleChange}
            title="Only upload your own original work."
          />
          <Checkbox
            value="1"
            checked={terms.value[1]}
            onChange={handleChange}
            title="Muzikie can’t review every song, the responsibility of copyright infringement is on you."
          />
          <Checkbox
            value="2"
            checked={terms.value[2]}
            onChange={handleChange}
            title="If you upload a song that you don’t fully own, and the community reports it, we’ll suspend it."
          />
        </section>
        <footer>
          <p>
            <span>By using Muzikie you declare that you have read and agreed to our </span>
            <TextLink
              title="full user agreement"
              to="/agreements"
            />
            <span>.</span>
          </p>
          <PrimaryButton
            onClick={submit}
            disabled={!terms.isValid}
            className="loginButton"
          >
            Continue
          </PrimaryButton>
        </footer>
      </section>
    </section>
  );
};

export default Agreement;
