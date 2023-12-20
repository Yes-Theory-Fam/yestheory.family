import {useFormBuilder} from '@atmina/formbuilder';
import {Submit} from 'payload/components/forms';
import React, {type FC, useCallback, useState} from 'react';
import {Form} from '../../form';
import {TextareaField} from '../../forms/fields/textarea-field';

type MissingAccessFormData = {
  message: string;
};

export const MissingAccess: FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const builder = useFormBuilder<MissingAccessFormData>();

  const requestAccess = useCallback(async (form: MissingAccessFormData) => {
    setLoading(true);

    const response = await fetch('/api/users/request-access', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    });

    setLoading(false);
    setSubmitted(true);

    if (!response.ok) setError(true);
  }, []);

  return (
    <>
      <p>
        You have not yet been given access to the backoffice. If you believe you
        should be given access, please fill out this form. A member of the team
        will get back to you!
      </p>

      {submitted ? (
        error ? (
          <p>
            An error occured submitting the form. Please reach out to the
            Supports on the Yes Fam server!
          </p>
        ) : (
          <p>You have requested access. We will get back to you soon!</p>
        )
      ) : (
        <Form builder={builder} onSubmit={requestAccess} className='w-full'>
          <TextareaField
            on={builder.fields.message}
            placeholder='Why should you get access?'
          />

          <Submit disabled={loading}>Request access</Submit>
        </Form>
      )}
    </>
  );
};
