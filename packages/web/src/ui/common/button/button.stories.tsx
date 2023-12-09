import {type Meta} from '@storybook/react';
import {Button, type ButtonProps} from './button';

export default {
  title: 'Common/Button',
  component: Button,
  tags: ['autodocs'],
} satisfies Meta<ButtonProps>;

export const SolidButton = {args: {children: 'Button', variant: 'solid'}};
export const OutlinedButton = {
  args: {children: 'Button', variant: 'outlined'},
};
