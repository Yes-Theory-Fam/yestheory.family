import {type UseFormBuilderReturn} from '@atmina/formbuilder';
import React, {type ComponentPropsWithoutRef} from 'react';
import {
  type FieldValues,
  FormProvider,
  type SubmitHandler,
  type UseFormProps,
} from 'react-hook-form';

export type FormProps<T extends FieldValues> = UseFormProps<T> & {
  builder: UseFormBuilderReturn<T>;
  onSubmit: SubmitHandler<T>;
} & Omit<ComponentPropsWithoutRef<'form'>, 'onSubmit'>;

export function Form<T extends FieldValues>({
  builder,
  onSubmit,
  ...formProps
}: FormProps<T>) {
  return (
    <FormProvider {...builder}>
      <form onSubmit={builder.handleSubmit(onSubmit)} {...formProps} />
    </FormProvider>
  );
}
