import React from 'react';

/* Internal dependencies */
import { AgreementFormProps } from '~/routes/types'
import { Checkbox } from '../common/Checkbox'


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


export default AgreementForm;