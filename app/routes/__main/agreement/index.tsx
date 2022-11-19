/* External dependencies */
import React, { useState, ChangeEvent, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

/* Internal dependencies */
import { SettingsContext } from '~/context/settingsContext/settingsContextProvider';
import { PrimaryButton } from '~/components/common/Button';
import { Checkbox } from '~/components/common/Checkbox';
import { PartialView } from '~/components/PartialView';
import { TextLink } from '~/components/common/Link';
import styles from '~/styles/routes/__main/agreements.css';

export function links() {
  return [{ rel: 'stylesheet', href: styles }];
}

type AgreementFormProps = {
  terms: {
    value: boolean[],
    isValid: boolean,
  };
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
};
type AgreementInfoProps = {
  disabled: boolean;
};

const AgreementForm = ({
  terms, handleChange,
}: AgreementFormProps) => (
  <>
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
      title="Muzikie can&nbsp;t review every song, the responsibility of copyright infringement is on you."
    />
    <Checkbox
      value="2"
      checked={terms.value[2]}
      onChange={handleChange}
      title="If you upload a song that you don&nbsp;t fully own, and the community reports it, we&nbsp;ll suspend it."
    />
  </>
);

const ActionAndInfo = ({ disabled }: AgreementInfoProps) => {
  const navigate = useNavigate();
  const { settings, updateSettings } = useContext(SettingsContext);

  const submit = () => {
    updateSettings({
      ...settings,
      agreement: true,
    });
    navigate('/');
  };

  return (
    <footer>
      <h4>
        <span>By using Muzikie you declare that you have read and agreed to our </span>
        <TextLink
          title="full user agreement"
          to="/agreements"
        />
        <span>.</span>
      </h4>
      <PrimaryButton
        onClick={submit}
        disabled={disabled}
        className="loginButton"
        theme="white"
      >
        Continue
      </PrimaryButton>
    </footer>
  );
};

const Agreement = () => {
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

export default Agreement;
